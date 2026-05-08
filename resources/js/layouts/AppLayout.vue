<script setup lang="ts">
import { Link, usePage } from '@inertiajs/vue3';
import { computed } from 'vue';
import { Toaster } from 'vue-sonner';

const page = usePage();
const user = computed(() => page.props.auth?.user);
</script>

<template>
    <div class="flex min-h-screen flex-col bg-background">
        <header class="sticky top-0 z-40 border-b bg-background">
            <div class="flex h-16 items-center justify-between px-6">
                <div class="flex items-center gap-6">
                    <Link href="/dashboard" class="flex items-center gap-2 font-bold">
                        <span class="size-6 rounded-md bg-primary"></span>
                        PostPro
                    </Link>
                </div>
                <div class="flex items-center gap-4">
                    <div v-if="user" class="text-sm font-medium">
                        {{ user.name }}
                    </div>
                </div>
            </div>
        </header>

        <main class="flex-1">
            <slot />
        </main>
        <Toaster position="top-right" />
    </div>
</template>
