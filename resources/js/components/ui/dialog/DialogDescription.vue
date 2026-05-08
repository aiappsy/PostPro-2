<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue';
import { DialogDescription, type DialogDescriptionProps, useForwardExpose } from 'reka-ui';
import { cn } from '@/lib/utils';

const props = defineProps<DialogDescriptionProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;
  return delegated;
});

const forwarded = useForwardExpose();
</script>

<template>
  <DialogDescription
    v-bind="delegatedProps"
    :class="cn('text-sm text-muted-foreground', props.class)"
  >
    <slot />
  </DialogDescription>
</template>
