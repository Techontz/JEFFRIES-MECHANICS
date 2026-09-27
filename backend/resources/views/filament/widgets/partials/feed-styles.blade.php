@once
    <style>
        .jm-feed-row { display: flex; align-items: center; gap: .85rem; padding: .7rem .5rem; margin: 0 -.5rem; border-radius: .5rem; border-bottom: 1px solid rgb(0 0 0 / .05); transition: background-color .15s; }
        .jm-feed-row:last-of-type { border-bottom: 0; }
        .jm-feed-row:hover { background: rgb(142 27 51 / .05); }
        .dark .jm-feed-row { border-color: rgb(255 255 255 / .06); }
        .dark .jm-feed-row:hover { background: rgb(255 255 255 / .04); }
        .jm-feed-icon { flex: none; display: grid; place-items: center; width: 2.25rem; height: 2.25rem; border-radius: .5rem; background: rgb(142 27 51 / .08); color: #8E1B33; }
        .dark .jm-feed-icon { background: rgb(214 70 98 / .15); color: #F08BA0; }
        .jm-feed-icon svg { width: 1.15rem; height: 1.15rem; }
        .jm-feed-dot { flex: none; width: .5rem; height: .5rem; border-radius: 9999px; background: #C8102E; box-shadow: 0 0 0 4px rgb(200 16 46 / .15); }
        .jm-feed-body { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: .1rem; }
        .jm-feed-title { font-size: .875rem; font-weight: 600; color: var(--gray-950); }
        .dark .jm-feed-title { color: #fff; }
        .jm-feed-meta { font-size: .75rem; font-weight: 400; color: var(--gray-500); }
        .jm-truncate { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .jm-feed-end { flex: none; display: flex; flex-direction: column; align-items: flex-end; gap: .3rem; }
        .jm-feed-empty { font-size: .875rem; color: var(--gray-500); padding: .5rem 0; }
    </style>
@endonce
