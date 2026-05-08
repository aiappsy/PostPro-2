<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import { cn } from '@/lib/utils';

interface Tab {
    name: string;
    label: string;
    href: string;
}

defineProps<{
    tabs: Tab[];
    active: string;
}>();
</script>

<template>
    <nav class="flex space-x-2 border-b">
        <Link
            v-for="tab in tabs"
            :key="tab.name"
            :href="tab.href"
            :class="cn(
                'inline-flex h-10 items-center justify-center border-b-2 px-4 py-2 text-sm font-medium transition-colors hover:text-foreground/80',
                active === tab.name ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground'
            )"
        >
            {{ tab.label }}
        </Link>
    </nav>
</template>
