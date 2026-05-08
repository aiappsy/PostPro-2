<script setup lang="ts">
defineProps<{
    title: string;
    description: string;
}>();
</script>

<template>
    <div class="flex flex-col space-y-1">
        <h3 class="text-lg font-semibold">{{ title }}</h3>
        <p class="text-sm text-muted-foreground">{{ description }}</p>
    </div>
</template>
