import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import laravel from 'laravel-vite-plugin';
import i18n from 'laravel-vue-i18n/vite';
import { defineConfig } from 'vite';

export default defineConfig({
    resolve: {
        alias: [
            {
                find: /^\@\/routes(\/.*)?$/,
                replacement: '/resources/js/dummy-routes.ts'
            },
            {
                find: /^\@\/actions(\/.*)?$/,
                replacement: '/resources/js/dummy-actions.ts'
            },
            {
                find: '@',
                replacement: '/resources/js'
            }
        ]
    },
    plugins: [
        laravel({
            input: ['resources/js/app.ts', 'resources/css/app.css'],
            refresh: true,
        }),
        tailwindcss(),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
        i18n(),
    ],
});
