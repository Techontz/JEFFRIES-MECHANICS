<?php

namespace App\Providers\Filament;

use App\Filament\Pages\Dashboard;
use App\Filament\Widgets\LatestSubmissions;
use App\Filament\Widgets\SubmissionsChart;
use App\Filament\Widgets\SubmissionStats;
use App\Filament\Widgets\UnreadNotifications;
use Filament\Http\Middleware\Authenticate;
use Filament\Http\Middleware\AuthenticateSession;
use Filament\Http\Middleware\DisableBladeIconComponents;
use Filament\Http\Middleware\DispatchServingFilamentEvent;
use Filament\Navigation\NavigationGroup;
use Filament\Navigation\NavigationItem;
use Filament\Panel;
use Filament\PanelProvider;
use Filament\Support\Colors\Color;
use Filament\Support\Icons\Heroicon;
use Filament\View\PanelsRenderHook;
use Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse;
use Illuminate\Cookie\Middleware\EncryptCookies;
use Illuminate\Foundation\Http\Middleware\PreventRequestForgery;
use Illuminate\Routing\Middleware\SubstituteBindings;
use Illuminate\Session\Middleware\StartSession;
use Illuminate\View\Middleware\ShareErrorsFromSession;

class AdminPanelProvider extends PanelProvider
{
    public function panel(Panel $panel): Panel
    {
        return $panel
            ->default()
            ->id('admin')
            ->path('admin')
            ->login()
            ->brandName('Jeffries Mechanicals')
            ->brandLogo(asset('images/logo-dark.png'))
            ->darkModeBrandLogo(asset('images/logo-light.png'))
            ->brandLogoHeight('2.4rem')
            ->favicon(asset('favicon.png'))
            ->colors([
                'primary' => self::winePalette(),
                'danger' => Color::Red,
                'gray' => Color::Zinc,
                'info' => Color::Slate,
            ])
            ->font('Inter')
            ->sidebarCollapsibleOnDesktop()
            ->databaseNotifications()
            ->databaseNotificationsPolling('10s')
            ->renderHook(PanelsRenderHook::HEAD_END, fn (): string => view('filament.admin-styles')->render())
            ->globalSearchKeyBindings(['command+k', 'ctrl+k'])
            ->navigationGroups([
                NavigationGroup::make('Requests')->icon(Heroicon::OutlinedInboxStack),
                NavigationGroup::make('Website')->icon(Heroicon::OutlinedGlobeAlt),
            ])
            ->navigationItems([
                NavigationItem::make('View website')
                    ->url(config('jeffries.frontend_url'), shouldOpenInNewTab: true)
                    ->icon(Heroicon::OutlinedArrowTopRightOnSquare)
                    ->group('Website')
                    ->sort(99),
            ])
            ->discoverResources(in: app_path('Filament/Resources'), for: 'App\Filament\Resources')
            ->discoverPages(in: app_path('Filament/Pages'), for: 'App\Filament\Pages')
            ->pages([
                Dashboard::class,
            ])
            ->widgets([
                SubmissionStats::class,
                UnreadNotifications::class,
                LatestSubmissions::class,
                SubmissionsChart::class,
            ])
            ->middleware([
                EncryptCookies::class,
                AddQueuedCookiesToResponse::class,
                StartSession::class,
                AuthenticateSession::class,
                ShareErrorsFromSession::class,
                PreventRequestForgery::class,
                SubstituteBindings::class,
                DisableBladeIconComponents::class,
                DispatchServingFilamentEvent::class,
            ])
            ->authMiddleware([
                Authenticate::class,
            ]);
    }

    /**
     * The website's exact wine scale (Filament's generator only keeps the hue).
     *
     * @return array<int, string>
     */
    private static function winePalette(): array
    {
        return array_map(Color::convertToOklch(...), [
            50 => '#fbf1f3',
            100 => '#f5dde2',
            200 => '#e9b3be',
            300 => '#d77b8f',
            400 => '#c23e58',
            500 => '#a81625',
            600 => '#8e1b33',
            700 => '#74132a',
            800 => '#5a0f21',
            900 => '#420b19',
            950 => '#26050e',
        ]);
    }
}
