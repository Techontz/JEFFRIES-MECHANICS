# Deploying to GoDaddy (cPanel Web Hosting Deluxe)

Two parts, one hosting plan:

| Part | Address | What it is | Goes in |
|---|---|---|---|
| Website | `https://jeffriesmechanicals.com` | Static HTML/CSS/JS (`jeffries-website.zip`) | `public_html/` |
| Backend | `https://api.jeffriesmechanicals.com` | Laravel API + admin panel (`jeffries-backend.zip`) | `~/jeffries-backend/` (served from its `public/` folder) |

Visitors' browsers load the website, which sends form submissions and loads job openings and projects from the backend.
Submissions are managed at `https://api.jeffriesmechanicals.com/admin`.

## 1. Build the zips (on your Mac)

```bash
deploy/build-godaddy.sh
```

This creates `deploy/dist/jeffries-website.zip` and `deploy/dist/jeffries-backend.zip`.
Rebuild and re-upload the website zip after any website change; rebuild the backend zip after any backend change.

## 2. Point the domain at the hosting

1. GoDaddy → My Products → **Web Hosting Deluxe** (currently on `kxg.d9a.mytemp.website`) → **Manage**.
2. Change the primary domain to `jeffriesmechanicals.com` (or add it as a domain on the plan with `public_html` as its folder).
   Because the domain is in the same GoDaddy account, its DNS updates automatically. Allow up to an hour.
3. cPanel → **Domains** → **Create a New Domain**: `api.jeffriesmechanicals.com`,
   untick "Share document root", and set the document root to `jeffries-backend/public`.
4. cPanel → **SSL/TLS Status** → **Run AutoSSL** so both addresses get HTTPS certificates
   (works once DNS points at the hosting).

## 3. PHP version and database

1. cPanel → **Select PHP Version** (or MultiPHP Manager): choose **PHP 8.3 or newer** for both domains, and make sure these
   extensions are ticked: `intl`, `pdo_mysql`, `mbstring`, `fileinfo`, `zip`, `bcmath`, `gd`.
2. cPanel → **MySQL Database Wizard**: create a database and a user with **All Privileges**.
   Note the full names (cPanel adds a prefix, e.g. `abc123_jeffries`) and the password.

## 4. Upload the backend

1. cPanel → **File Manager** → your home folder (one level above `public_html`) → create folder `jeffries-backend`.
2. Upload `jeffries-backend.zip` into it → right-click → **Extract**.
3. In `jeffries-backend`, copy `.env.production.example` to `.env` (enable **Settings → Show Hidden Files** to see it) and edit:
   `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD` from step 3, and a strong `ADMIN_PASSWORD`.
4. cPanel → **Terminal** (or SSH), then run:

```bash
cd ~/jeffries-backend
php artisan key:generate --force
php artisan migrate --force
php artisan db:seed --force      # creates the admin login from ADMIN_EMAIL / ADMIN_PASSWORD
php artisan storage:link         # makes uploaded project photos public
php artisan config:cache && php artisan route:cache && php artisan view:cache
```

If `php` there is an older version, use the 8.3 binary instead, e.g. `/opt/cpanel/ea-php83/root/usr/bin/php artisan ...`.

5. Check: `https://api.jeffriesmechanicals.com/api/form-options` shows JSON, and `/admin` shows the login page.

## 5. Upload the website

1. File Manager → `public_html` → delete any placeholder files GoDaddy put there (look first; keep `cgi-bin` and `.well-known`).
2. Upload `jeffries-website.zip` → **Extract** → delete the zip.
   The hidden `.htaccess` file must be there (HTTPS redirect, security headers, 404 page).
3. Check `https://jeffriesmechanicals.com`, then send a test from **Contact** and **Get a Quote** and confirm they appear in the admin panel.

## Updating later

- **Website change:** run `deploy/build-godaddy.sh`, upload `jeffries-website.zip` to `public_html`, extract, overwrite.
- **Backend change:** upload the new backend zip to `jeffries-backend`, extract over the old files (your `.env` and
  `storage/` uploads are not in the zip, so they are kept), then in Terminal:
  `php artisan migrate --force && php artisan config:cache && php artisan route:cache && php artisan view:cache`.
- **Projects, job openings, submissions:** manage them in the admin panel; the website shows changes immediately.

## Notes

- **Email alerts:** submissions always appear in the admin panel. To also get emails, fill in the `MAIL_*` lines in `.env`
  with the company mailbox's SMTP settings, set `ADMIN_NOTIFICATION_MAIL=true`, then run `php artisan config:cache`.
- **Testing on the temporary domain** before the real one is attached: the website must be rebuilt for that address
  (`deploy/build-godaddy.sh https://<temp-site> https://<temp-api>`), and the temp address must be added to
  `CORS_ALLOWED_ORIGINS` and `FRONTEND_URL` in the backend `.env`. If the temp domain has no SSL certificate,
  remove the HTTPS redirect block from `public_html/.htaccess` while testing.
- **Vercel** can keep hosting a copy of the website (`https://jeffries-mechanics.vercel.app`). Set its
  `NEXT_PUBLIC_API_URL` environment variable to `https://api.jeffriesmechanicals.com` and redeploy; its address is already
  in `CORS_ALLOWED_ORIGINS`.
- After changing `.env`, always run `php artisan config:cache` again.
