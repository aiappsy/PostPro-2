<script setup lang="ts">
import { useForm } from '@inertiajs/vue3';
import { computed } from 'vue';

const props = defineProps<{
    method?: 'post' | 'put' | 'patch' | 'delete';
    action: string;
    data?: any;
    onSuccess?: (response: any) => void;
    onError?: (errors: any) => void;
    onFinish?: () => void;
    resetOnSuccess?: string[];
    transform?: (data: any) => any;
}>();

const form = useForm(props.data || {});

const submit = () => {
    if (props.transform) {
        form.transform(props.transform);
    }
    
    const options = {
        onSuccess: (page: any) => {
            if (props.onSuccess) props.onSuccess(page);
            if (props.resetOnSuccess) {
                form.reset(...(props.resetOnSuccess as any));
            }
        },
        onError: (errors: any) => {
            if (props.onError) props.onError(errors);
        },
        onFinish: () => {
            if (props.onFinish) props.onFinish();
        },
    };

    const method = (props.method || 'post').toLowerCase();
    
    if (typeof (form as any)[method] === 'function') {
        (form as any)[method](props.action, options);
    } else {
        console.error(`Inertia method ${method} not found on form object`);
    }
};

// Expose form for parent components if needed
defineExpose({ form });
</script>

<template>
    <form @submit.prevent="submit" v-bind="$attrs">
        <slot
            :form="form"
            :errors="form.errors"
            :processing="form.processing"
            :was-successful="form.wasSuccessful"
            :recently-successful="form.recentlySuccessful"
            :data="form.data"
            :reset="form.reset"
            :clear-errors="form.clearErrors"
        />
    </form>
</template>
