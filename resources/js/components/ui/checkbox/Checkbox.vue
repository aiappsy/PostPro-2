<script setup lang="ts">
import { type HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';
import { CheckboxRoot, type CheckboxRootProps, CheckboxIndicator } from 'reka-ui';
import { LucideCheck } from 'lucide-vue-next';

const props = defineProps<CheckboxRootProps & { class?: HTMLAttributes['class'] }>();
</script>

<template>
  <CheckboxRoot
    v-bind="props"
    :class="cn('peer size-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground', props.class)"
  >
    <CheckboxIndicator class="flex items-center justify-center text-current">
      <LucideCheck class="size-3.5" />
    </CheckboxIndicator>
  </CheckboxRoot>
</template>
