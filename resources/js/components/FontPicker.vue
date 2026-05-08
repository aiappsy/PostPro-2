<script setup lang="ts">
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useVModel } from '@vueuse/core';

const props = defineProps<{
    modelValue: string;
    fonts: string[];
    name?: string;
}>();

const emits = defineEmits<{
    (e: 'update:modelValue', payload: string): void;
}>();

const modelValue = useVModel(props, 'modelValue', emits);
</script>

<template>
    <Select v-model="modelValue" :name="name">
        <SelectTrigger class="w-full">
            <SelectValue placeholder="Select a font" />
        </SelectTrigger>
        <SelectContent>
            <SelectItem v-for="font in fonts" :key="font" :value="font">
                <span :style="{ fontFamily: font }">{{ font }}</span>
            </SelectItem>
        </SelectContent>
    </Select>
</template>
