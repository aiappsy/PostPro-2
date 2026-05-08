<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import { Toaster } from 'vue-sonner';

defineProps<{
    title?: string;
    description?: string;
}>();
</script>

<template>
    <div class="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-6 md:p-10">
        <div class="w-full max-w-sm">
            <div class="flex flex-col gap-6">
                <div class="flex flex-col items-center text-center">
                    <Link href="/" class="flex items-center gap-2 font-semibold">
                        <span class="size-8 rounded-lg bg-primary"></span>
                        <span class="sr-only">PostPro</span>
                    </Link>
                    <h1 v-if="title" class="mt-4 text-2xl font-bold">{{ title }}</h1>
                    <p v-if="description" class="text-balance text-muted-foreground">
                        {{ description }}
                    </p>
                </div>
                <slot />
            </div>
        </div>
        <Toaster position="top-right" />
    </div>
</template>
