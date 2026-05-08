<script setup lang="ts">
import { usePage } from '@inertiajs/vue3';
import { computed, ref } from 'vue';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';

import { Button } from '@/components/ui/button';
import InputMessage from '@/components/InputMessage.vue';
import { redirect as githubRedirect } from '@/routes/auth/github';

defineProps<{
    mode: 'login' | 'signup';
}>();

const page = usePage();
const googleEnabled = computed(() => Boolean(page.props.googleAuthEnabled));
const githubEnabled = computed(() => Boolean(page.props.githubAuthEnabled));
const hasSocial = computed(() => googleEnabled.value || githubEnabled.value);

const errorMessage = ref('');

const handleGoogleLogIn = async () => {
    errorMessage.value = '';
    try {
        const result = await signInWithPopup(auth, googleProvider);
        console.log("Logged in with Google", result.user);
        document.cookie = `user_id=${result.user.uid}; path=/`; 
        window.location.href = '/dashboard'; 
    } catch (error: any) {
        console.error("Error signing in with Google", error);
        if (error.code === 'auth/popup-blocked') {
            errorMessage.value = 'Popup blocked. Please allow popups for this site.';
        } else if (error.code === 'auth/operation-not-allowed') {
            errorMessage.value = 'Google sign-in is not enabled in Firebase Console.';
        } else {
            errorMessage.value = error.message || 'Authentication failed.';
        }
    }
};
</script>

<template>
    <template v-if="hasSocial">
        <div class="flex flex-col gap-2">
            <InputMessage :message="errorMessage" class="mb-2" />
            <Button
                v-if="googleEnabled"
                variant="outline"
                class="w-full gap-2"
                type="button"
                @click="handleGoogleLogIn"
            >
                <svg class="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/><path fill="none" d="M0 0h48v48H0z"/></svg>
                {{
                    mode === 'login'
                        ? $t('google_login')
                        : $t('google_signup')
                }}
            </Button>

            <Button
                v-if="githubEnabled"
                variant="outline"
                class="w-full gap-2"
                as="a"
                :href="githubRedirect.url()"
            >
                <svg class="size-4 dark:invert" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z"/></svg>
                {{
                    mode === 'login'
                        ? $t('github_login')
                        : $t('github_signup')
                }}
            </Button>
        </div>

        <div
            class="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border"
        >
            <span
                class="relative z-10 bg-background px-2 text-muted-foreground"
                >{{ $t('or_continue_with') }}</span
            >
        </div>
    </template>
</template>
