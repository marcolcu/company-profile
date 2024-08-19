import './bootstrap';
import '../css/app.css';

import {createRoot} from 'react-dom/client';
import {createInertiaApp} from '@inertiajs/react';
import {resolvePageComponent} from 'laravel-vite-plugin/inertia-helpers';
import {Navbar} from "@/Components/component/navbar.jsx";

const appName = import.meta.env.VITE_APP_NAME || 'CreateIT';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({el, App, props}) {
        document.body.classList.add('bg-zinc-50');
        const root = createRoot(el);

        root.render(
            <>
                {window.location.pathname.startsWith('/admin/') ? null : <Navbar />}
                <App {...props} />
            </>
        );
    },
    progress: {
        color: '#0fc4c0',
    },
});
