<template>
    <div class="container">
        <h1>Login</h1>
        <c-form-control>
            <c-form-label for="username">Username</c-form-label>
            <c-input name="username" aria-placeholder="Username" variant="outline" v-model="username" />

            <c-form-label for="password">Password</c-form-label>
            <c-input name="password" aria-placeholder="Password" variant="outline" v-model="password" />

            <c-button v-on:click="submitLoginForm">Submit</c-button>
        </c-form-control>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { CButton, CInput } from '@chakra-ui/vue';
import UserModule from '~/store/userStore';
import { getModule } from 'vuex-module-decorators';

export default Vue.extend({
    components: {
        CButton,
        CInput,
    },
    data() {
        return {
            username: '',
            password: '',
        };
    },
    methods: {
        submitLoginForm() {
            if (!this.username || !this.password) {
                return;
            }

            const usersModule: UserModule = getModule(UserModule, this.$store);

            usersModule.login({ username: this.username, password: this.password });
        },
    },
});
</script>

<style></style>
