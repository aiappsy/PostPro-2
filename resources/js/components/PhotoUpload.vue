<script setup lang="ts">
import { Button } from '@/components/ui/button';

defineProps<{
    photoUrl?: string;
    hasPhoto: boolean;
    name: string;
    uploadUrl: string;
    deleteUrl: string;
}>();
</script>

<template>
    <div class="flex items-center gap-4">
        <div class="size-16 overflow-hidden rounded-full bg-muted">
            <img v-if="photoUrl" :src="photoUrl" :alt="name" class="size-full object-cover">
            <div v-else class="flex size-full items-center justify-center text-xl font-bold uppercase text-muted-foreground">
                {{ name.charAt(0) }}
            </div>
        </div>
        <div class="flex flex-col gap-2">
            <div class="flex gap-2">
                <Button variant="outline" size="sm">
                    {{ $t('settings.profile.upload_photo') }}
                </Button>
                <Button v-if="hasPhoto" variant="ghost" size="sm" class="text-destructive">
                    {{ $t('settings.profile.delete_photo') }}
                </Button>
            </div>
            <p class="text-xs text-muted-foreground">
                {{ $t('settings.profile.photo_hint') }}
            </p>
        </div>
    </div>
</template>
