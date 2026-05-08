<script setup lang="ts">
import { LucideLoader2 } from 'lucide-vue-next';
import { cn } from '@/lib/utils';

defineProps<{
  class?: string;
}>();
</script>

<template>
  <LucideLoader2 :class="cn('animate-spin size-4', $props.class)" />
</template>
