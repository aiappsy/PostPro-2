<script setup lang="ts">
import { Input } from '@/components/ui/input';
import { useVModel } from '@vueuse/core';

const props = defineProps<{
    modelValue: string;
    name?: string;
}>();

const emits = defineEmits<{
    (e: 'update:modelValue', payload: string): void;
}>();

const modelValue = useVModel(props, 'modelValue', emits);
</script>

<template>
    <div class="flex items-center gap-2">
        <div 
            class="size-9 shrink-0 rounded-md border"
            :style="{ backgroundColor: modelValue }"
        ></div>
        <Input
            v-model="modelValue"
            :name="name"
            class="font-mono uppercase"
            placeholder="#000000"
            maxlength="7"
        />
    </div>
</template>
