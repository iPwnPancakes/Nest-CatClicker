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

<script>
import { CButton, CInput } from '@chakra-ui/vue';

export default {
    components: {
        CButton,
        CInput,
    },
    data() {
        return {
            username: null,
            password: null,
        };
    },
    methods: {
        submitLoginForm() {
            console.log('TODO');
        },
    },
};
</script>

<style></style>
