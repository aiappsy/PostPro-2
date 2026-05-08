<script setup lang="ts">
import { TooltipRoot, type TooltipRootProps, type TooltipRootEmits, useForwardExpose } from 'reka-ui';

const props = defineProps<TooltipRootProps>();
const emits = defineEmits<TooltipRootEmits>();

const forwarded = useForwardExpose();
</script>

<template>
  <TooltipRoot v-bind="props" @update:open="emits('update:open', $event)">
    <slot />
  </TooltipRoot>
</template>
