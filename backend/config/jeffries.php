<?php

/*
|--------------------------------------------------------------------------
| Jeffries Mechanicals — business configuration
|--------------------------------------------------------------------------
|
| Single source of truth for company details and the option lists used by
| the public website forms. The frontend reads these through
| GET /api/form-options, and the API validates submissions against them.
|
*/

return [

    'company' => [
        'legal_name' => 'Jeffries Mechanicals LLC',
        'street' => '4327 State Ave',
        'city' => 'Kansas City',
        'region' => 'KS',
        'postal_code' => '66102',
        // Left empty until the business confirms public contact details.
        'phone' => env('COMPANY_PHONE'),
        'email' => env('COMPANY_EMAIL'),
        'hours' => env('COMPANY_HOURS'),
    ],

    'frontend_url' => env('FRONTEND_URL', 'http://localhost:3000'),

    // Shared secret for instant page refresh on the Next.js site (POST /api/revalidate).
    'revalidate_secret' => env('REVALIDATE_SECRET'),

    'notifications' => [
        // Also email admins when a submission arrives (uses the configured mailer).
        'mail' => (bool) env('ADMIN_NOTIFICATION_MAIL', false),
    ],

    'spam' => [
        // Minimum seconds between loading a form and submitting it.
        'min_seconds' => (int) env('FORM_MIN_SECONDS', 3),
        // Form tokens expire after this many hours.
        'token_ttl_hours' => 6,
        // Identical submissions within this window are treated as duplicates.
        'duplicate_window_hours' => 24,
    ],

    'uploads' => [
        'attachment_types' => ['pdf', 'jpg', 'jpeg', 'png', 'webp', 'doc', 'docx', 'xls', 'xlsx'],
        'attachment_max_kb' => 15 * 1024,
        'resume_types' => ['pdf', 'doc', 'docx'],
        'resume_max_kb' => 8 * 1024,
    ],

    'options' => [

        'services' => [
            'Mechanical Services',
            'Electrical Contracting',
            'Facility Maintenance',
            'Specialized Trade Services',
            'Construction Support',
        ],

        'markets' => [
            'Government & Municipal',
            'Commercial',
            'Institutional',
            'Healthcare',
            'Prime Contractor / Subcontract',
            'Facilities & Property Operations',
            'Infrastructure & Construction',
        ],

        'project_types' => [
            'New construction',
            'Renovation / tenant improvement',
            'System replacement / upgrade',
            'Repair',
            'Preventive maintenance program',
            'Bid / RFP support',
        ],

        'timelines' => [
            'Immediately',
            'Within 30 days',
            '1–3 months',
            '3–6 months',
            '6+ months / planning',
        ],

        'budget_ranges' => [
            'Under $25,000',
            '$25,000 – $100,000',
            '$100,000 – $500,000',
            '$500,000+',
            'Not yet determined',
        ],

        'preferred_contact' => ['Phone', 'Email'],

        'system_types' => [
            'HVAC / heating & cooling',
            'Piping / plumbing',
            'Electrical',
            'Controls / building automation',
            'Boilers / chillers',
            'Other building system',
        ],

        'contact_subjects' => [
            'General inquiry',
            'Contracting opportunity',
            'Prime contractor / teaming',
            'Vendor or supplier',
            'Other',
        ],

        'trades' => [
            'Mechanical / HVAC',
            'Electrical',
            'Pipefitting / plumbing',
            'Welding & fabrication',
            'Facility maintenance',
            'Project management & administration',
        ],

        'experience' => [
            'Apprentice / entry level',
            '1–3 years',
            '3–5 years',
            '5–10 years',
            '10+ years',
        ],
    ],
];
