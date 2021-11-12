<template>
  <v-app>
    <v-dialog v-model="visible" data-testid="app-dialog">
      <component :is="component" data-testid="app-dialog-content" />
      <!-- <div data-testid="app-dialog-content">
        this should be only in dom when modal has popped
      </div> -->
      <!-- <v-btn text @click="hideModal"> Close </v-btn> -->
      <!-- <v-btn text @click="hideModal"> Save </v-btn> -->
      <!-- <v-btn text @click.self="hideModal"> Save </v-btn> -->
    </v-dialog>

    <!-- <v-app-bar hide-on-scroll app v-if="isAuthenticated"> -->
    <v-app-bar hide-on-scroll app>
      <v-app-bar-nav-icon
        @click.stop="toggleNavBar = !toggleNavBar"
        data-testid="hamburger-menu-toggle"
      ></v-app-bar-nav-icon>
      <v-toolbar-title
        class="text-capitalize"
        data-testid="app-bar-context-title"
      >
        {{ title }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        v-if="!isAuthenticated"
        link
        to="/login"
        icon
        data-testid="login-button"
      >
        <v-icon>mdi-login</v-icon>
      </v-btn>
      <v-btn
        v-if="!isAuthenticated"
        link
        to="/register"
        icon
        data-testid="register-button"
      >
        <v-icon>mdi-account-plus</v-icon>
      </v-btn>
      <!-- TODO: TRADE THIS OUT WITH AVATAR THAT EXPOSES DROPDOWN (PROFILE/LOGOUT) ONCE LOGGED IN -->
      <v-btn
        v-if="isAuthenticated"
        @click.stop="handleLogout"
        icon
        data-testid="logout-button"
      >
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      v-model="toggleNavBar"
      fixed
      temporary
      data-testid="nav-drawer"
    >
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

        <v-list-item link to="/user" data-testid="user-page">
          <v-list-item-icon>
            <v-icon>mdi-account-box</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="text-capitalize">
              user
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/moderator" data-testid="moderator-page">
          <v-list-item-icon>
            <v-icon>mdi-shield-account-variant</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="text-capitalize">
              moderator
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/admin" data-testid="admin-page">
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
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
// import { mapState, mapMutations } from "vuex";
import Vue from "vue";

export default {
  components: {},
  name: "App",

  data: () => ({
    // isAuthenticated: false,
    toggleNavBar: false,
    component: "",
  }),
  computed: {
    ...mapState({
      // visible: `modalVisible`,
      modalComponent: `modalComponent`,
    }),
    ...mapGetters("authentication", ["isAuthenticated"]),
    // ...mapGetters(["authentication/isAuthenticated"]),
    // ...mapGetters({ isAuthenticated: "authentication/isAuthenticated" }),
    visible: {
      ...mapState({ get: "modalVisible" }),
      ...mapMutations({ set: "HIDE_MODAL" }),
    },
    title() {
      return this.$route.name || "Authorize";
    },
  },
  methods: {
    ...mapMutations({
      hideModal: `HIDE_MODAL`,
    }),
    ...mapActions("authentication", ["logout"]),
    ...mapActions("alert", ["clear"]),
    handleLogout() {
      this.logout();
      this.$router.push("/").catch(() => {
        /* catch router:Error:NavigationDuplicated when user logs out from '/' */
      });
    },
  },
  watch: {
    $route() {
      // clear alert on location change
      // this.$store.dispatch("alert/clear");
      this.clear();
      // TODO: NOT WORKING - try to hide nav bar on from.login|register to a route that would pop modal
      // this.toggleNavBar = false;
    },
    visible(val) {
      console.log(`modal visibility changed: ${val}`);
      if (val) {
        this.toggleNavBar = false;
      }
    },
    modalComponent(componentName) {
      if (!componentName) return;
      Vue.component(componentName, () =>
        import(`@/components/modal/${componentName}`)
      );
      this.component = componentName;
    },
  },
};
</script>