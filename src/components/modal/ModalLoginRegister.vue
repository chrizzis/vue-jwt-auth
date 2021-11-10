<template>
  <v-card>
    <v-tabs centered icons-and-text>
      <v-tabs-slider></v-tabs-slider>

      <v-tab href="#login">
        login
        <v-icon>mdi-login</v-icon>
      </v-tab>
      <v-tab-item value="login" data-testid="content-login-form">
        <LoginForm />
      </v-tab-item>

      <v-tab href="#register">
        register
        <v-icon>mdi-account-plus</v-icon>
      </v-tab>
      <v-tab-item value="register" data-testid="content-register-form">
        <RegisterForm />
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
import LoginForm from "@/components/LoginForm.vue";
import RegisterForm from "@/components/RegisterForm.vue";
export default {
  components: {
    LoginForm,
    RegisterForm,
  },
  data: () => ({}),
};
</script>