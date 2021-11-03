<template>
  <div>
    <h1>Hi {{ user.firstname }}!</h1>
    <p>You're logged in with Vue + Vuex & JWT!!</p>
    <h3>Users from secure api end point:</h3>
    <em v-if="users.loading">Loading users...</em>
    <span v-if="users.error" class="text-danger">ERROR: {{ users.error }}</span>
    <ul v-if="users.items">
      <li v-for="user in users.items" :key="user.id">
        <!-- {{ user.firstName + " " + user.lastName }} -->
        {{ user.firstname + " " + user.lastname }}
      </li>
    </ul>
    <p>
      <router-link to="/login">Logout</router-link>
    </p>
  </div>
</template>
<script>
export default {
  computed: {
    user() {
      return this.$store.state.authentication.user;
    },
    // TODO: this works as expected, but during the fetch of an unauthorized route, the current user is logged out.
    users() {
      return this.$store.state.users.all;
    },
  },
  // TODO: this works as expected, but during the fetch of an unauthorized route, the current user is logged out.
  created() {
    this.$store.dispatch("users/getAll");
  },
};
</script>