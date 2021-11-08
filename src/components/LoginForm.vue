<template>
  <v-container>
    <v-alert v-if="alert.message" type="error">{{ alert.message }}</v-alert>
    <!-- <v-form> -->
    <form>
      <v-text-field
        outlined
        v-model="username"
        :error-messages="usernameErrors"
        :counter="10"
        label="Name"
        name="login-username"
        required
        @input="$v.username.$touch()"
        @blur="$v.username.$touch()"
        data-testid="login-username"
      />
      <v-text-field
        outlined
        v-model="password"
        :error-messages="passwordErrors"
        label="Password"
        required
        @input="$v.username.$touch()"
        @blur="$v.username.$touch()"
        data-testid="login-password"
      />
      <v-checkbox
        v-model="checkbox"
        label="Keep me logged in forever"
      ></v-checkbox>
      <v-btn
        class="mr-4"
        @click="submit"
        :disabled="!canSubmit || loggingIn"
        :loading="loggingIn"
        data-testid="login-submit"
      >
        submit
      </v-btn>
      <v-btn @click="clear"> clear </v-btn>
    </form>
  </v-container>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { Role } from "@/helpers";

export default {
  mixins: [validationMixin],

  validations: {
    username: {
      required,
      // maxLength: maxLength(10),
    },
    password: {
      required,
      // minLength: minLength(8)  // I assume you'd want something like this too
      // containsUppercase: function (value) {
      //   return /[A-Z]/.test(value);
      // },
      // containsLowercase: function (value) {
      //   return /[a-z]/.test(value);
      // },
      // containsNumber: function (value) {
      //   return /[0-9]/.test(value);
      // },
      // containsSpecial: function (value) {
      //   return /[#?!@$%^&*-]/.test(value);
      // },
    },
  },

  data: () => ({
    username: "",
    password: "",
    select: null,
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    checkbox: false,
  }),

  created() {
    // reset login status
    this.$store.dispatch("authentication/logout");
  },

  computed: {
    alert() {
      return this.$store.state.alert;
    },
    loggingIn() {
      return this.$store.state.authentication.status.loggingIn;
    },
    loginErrors() {
      return this.$store.state.alert.message;
    },
    usernameErrors() {
      const errors = [];
      if (!this.$v.username.$dirty) return errors;
      !this.$v.username.required && errors.push("Name is required.");
      // !this.$v.username.maxLength &&
      //   errors.push("Name must be at most 10 characters long");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("Password is required");
      // !this.$v.password.containsUppercase &&
      //   errors.push("Password must contain an uppercase");
      // !this.$v.password.containsLowercase &&
      //   errors.push("Password must contain an lowercase");
      // !this.$v.password.containsNumber &&
      //   errors.push("Password must contain an number");
      // !this.$v.password.containsSpecial &&
      //   errors.push("Password must contain an special");
      return errors;
    },
    isClean() {
      return !this.$v.username.$dirty && !this.$v.password.$dirty;
    },
    formHasErrors() {
      return !!this.usernameErrors.length || !!this.passwordErrors.length;
    },
    canSubmit() {
      return this.isClean ? false : !this.formHasErrors;
    },
  },

  methods: {
    submit() {
      this.$v.$touch();
      const { username, password } = this;
      console.log(`name: ${username}, password: ${password}`);
      const { dispatch } = this.$store;
      if (username && password) {
        dispatch("authentication/login", { username, password })
          // TODO: move redirect to router? or this will be duped in register component as well
          .then((user) => {
            if (user) {
              if (this.$route.query.redirect) {
                this.$router.push(this.$route.query.redirect);
              } else if (user.role === Role.User) {
                this.$router.push("/user");
              } else if (user.role === Role.Admin) {
                this.$router.push("/admin");
              }
            }
          })
          .catch((e) => {
            console.log(`login ERROR: ${e}`);
          });
      }
    },
    clear() {
      this.$v.$reset();
      this.username = "";
      this.password = "";
      this.select = null;
      this.checkbox = false;
    },
  },
};
</script>