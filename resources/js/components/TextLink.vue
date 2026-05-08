<script setup lang="ts">
import { Link } from '@inertiajs/vue3';

defineProps<{
    href: string;
}>();
</script>

<template>
    <Link
        :href="href"
        class="text-primary hover:text-primary/80 underline-offset-4 hover:underline"
    >
        <slot />
    </Link>
</template>
