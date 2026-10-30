#!/usr/bin/env bash
# Builds the two zip files uploaded to GoDaddy cPanel hosting (see deploy/GODADDY.md):
#   deploy/dist/jeffries-website.zip  -> contents go in public_html (the website)
#   deploy/dist/jeffries-backend.zip  -> unzipped to ~/jeffries-backend (API + admin panel)
#
# Usage: deploy/build-godaddy.sh [site-url] [api-url]
#   defaults: https://jeffriesmechanicals.com  https://api.jeffriesmechanicals.com
set -euo pipefail

SITE_URL="${1:-https://jeffriesmechanicals.com}"
API_URL="${2:-https://api.jeffriesmechanicals.com}"

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DIST="$ROOT/deploy/dist"
STAGE="$DIST/stage"

rm -rf "$DIST"
mkdir -p "$STAGE"

echo "==> Website: static build for $SITE_URL (API $API_URL)"
(
  cd "$ROOT/web"
  npm ci --silent
  rm -rf out
  NEXT_PUBLIC_SITE_URL="$SITE_URL" NEXT_PUBLIC_API_URL="$API_URL" npm run build
  cd out
  zip -qr "$DIST/jeffries-website.zip" . # includes .htaccess
)

echo "==> Backend: source files (never .env, vendor or local data) + production dependencies"
(cd "$ROOT" && git ls-files --cached --others --exclude-standard -z backend | xargs -0 -I{} sh -c 'test -e "{}" && echo "{}"' | tar -cf - -T -) | tar -x -C "$STAGE"
(
  cd "$STAGE/backend"
  composer install --no-dev --optimize-autoloader --no-interaction --quiet
  # Filament's admin CSS/JS live in public/ and are not committed.
  cp .env.example .env
  php artisan key:generate --quiet
  php artisan filament:assets --quiet
  rm -f .env
  rm -rf tests .claude .mcp.json boost.json AGENTS.md CLAUDE.md phpunit.xml node_modules
  cp "$ROOT/deploy/backend.env.production" .env.production.example
  zip -qr "$DIST/jeffries-backend.zip" . -x "storage/logs/*.log"
)

rm -rf "$STAGE"
echo "==> Done"
ls -lh "$DIST"
