<script setup lang="ts">
import { SelectRoot, type SelectRootEmits, type SelectRootProps, useForwardExpose } from 'reka-ui';

const props = defineProps<SelectRootProps>();
const emits = defineEmits<SelectRootEmits>();

const forwarded = useForwardExpose();
</script>

<template>
  <SelectRoot v-bind="props" @update:model-value="emits('update:modelValue', $event)">
    <slot />
  </SelectRoot>
</template>
