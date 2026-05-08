<script setup lang="ts">
import { DialogRoot, type DialogRootEmits, type DialogRootProps, useForwardExpose } from 'reka-ui';

const props = defineProps<DialogRootProps>();
const emits = defineEmits<DialogRootEmits>();

const forwarded = useForwardExpose();
</script>

<template>
  <DialogRoot v-bind="props" @update:open="emits('update:open', $event)">
    <slot />
  </DialogRoot>
</template>
