<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import { onMounted } from 'vue';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

import SocialLogin from '@/components/auth/SocialLogin.vue';
import InputMessage from '@/components/InputMessage.vue';
import TextLink from '@/components/TextLink.vue';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthBase from '@/layouts/AuthLayout.vue';
import { register } from '@/routes';
import { store as loginStore } from '@/routes/login';
import { request as forgotPassword } from '@/routes/password';

const props = defineProps<{
    status?: string;
    email?: string | null;
    redirect?: string | null;
}>();

onMounted(() => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            document.cookie = `user_id=${user.uid}; path=/`;
            window.location.href = '/dashboard';
        }
    });
});
</script>

<template>
    <AuthBase
        :title="$t('login.title')"
        :description="$t('login.description')"
    >
        <Head :title="$t('login.page_title')" />

        <div
            v-if="status"
            class="mb-4 text-center text-sm font-medium text-green-600"
        >
            {{ status }}
        </div>

        <div class="flex flex-col gap-6">
            <SocialLogin mode="login" />

            <Form
                :action="loginStore()"
                :data="{
                    email: email ?? '',
                    password: '',
                    remember: false,
                    redirect: redirect ?? '',
                }"
                :reset-on-success="['password']"
                v-slot="{ errors, processing }"
                class="flex flex-col gap-6"
            >
                <div class="grid gap-6">
                    <div class="grid gap-2">
                        <Label for="email">{{ $t('login.email') }}</Label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            autofocus
                            :tabindex="1"
                            autocomplete="email"
                            placeholder="email@example.com"
                        />
                        <InputMessage :message="errors.email" />
                    </div>

                    <div class="grid gap-2">
                        <div class="flex items-center justify-between">
                            <Label for="password">{{
                                $t('login.password')
                            }}</Label>
                            <TextLink
                                :href="forgotPassword()"
                                class="text-sm"
                                :tabindex="5"
                            >
                                {{ $t('login.forgot_password') }}
                            </TextLink>
                        </div>
                        <Input
                            id="password"
                            type="password"
                            name="password"
                            :tabindex="2"
                            autocomplete="current-password"
                            :placeholder="$t('login.password')"
                        />
                        <InputMessage :message="errors.password" />
                    </div>

                    <div class="flex items-center justify-between">
                        <Label
                            for="remember"
                            class="flex items-center space-x-3"
                        >
                            <Checkbox id="remember" name="remember" :tabindex="3" />
                            <span>{{ $t('login.remember_me') }}</span>
                        </Label>
                    </div>

                    <Button
                        type="submit"
                        class="mt-4 w-full font-bold"
                        :tabindex="4"
                        :disabled="processing"
                        data-test="login-button"
                    >
                        <Spinner v-if="processing" />
                        {{ $t('login.submit') }}
                    </Button>
                </div>

                <div class="text-center text-sm text-muted-foreground">
                    {{ $t('login.no_account') }}
                    <TextLink :href="register()" :tabindex="6">{{
                        $t('login.sign_up')
                    }}</TextLink>
                </div>
            </Form>
        </div>
    </AuthBase>
</template>
