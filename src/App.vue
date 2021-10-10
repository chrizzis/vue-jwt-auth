<template>
  <v-app>
    <v-app-bar hide-on-scroll app v-if="isAuthenticated">
      <v-app-bar-nav-icon
        @click.stop="toggleNavBar = !toggleNavBar"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="text-capitalize">{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn link to="/login" icon>
        <v-icon>mdi-login</v-icon>
      </v-btn>
      <v-btn link to="/register" icon>
        <v-icon>mdi-account-plus</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="toggleNavBar" fixed temporary>
      <v-list dense nav>
        <v-list-item link to="/">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="text-capitalize">
              home
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/about">
          <v-list-item-icon>
            <v-icon>mdi-help-circle-outline</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="text-capitalize">
              about
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/user">
          <v-list-item-icon>
            <v-icon>mdi-account-box</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="text-capitalize">
              user
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/admin">
          <v-list-item-icon>
            <v-icon>mdi-shield-check</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="text-capitalize">
              admin
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  components: {},
  name: "App",

  data: () => ({
    isAuthenticated: true,
    toggleNavBar: false,
  }),
  computed: {
    title() {
      return this.$route.name || "Authorize";
    },
  },
};
</script>