<template>
  <v-app>
    <v-dialog v-model="visible">
      <component :is="component" />
      <!-- <v-btn text @click="hideModal"> Close </v-btn> -->
      <!-- <v-btn text @click="hideModal"> Save </v-btn> -->
      <!-- <v-btn text @click.self="hideModal"> Save </v-btn> -->
    </v-dialog>

    <!-- <v-app-bar hide-on-scroll app v-if="isAuthenticated"> -->
    <v-app-bar hide-on-scroll app>
      <v-app-bar-nav-icon
        @click.stop="toggleNavBar = !toggleNavBar"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="text-capitalize">{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="!isAuthenticated" link to="/login" icon>
        <v-icon>mdi-login</v-icon>
      </v-btn>
      <v-btn v-if="!isAuthenticated" link to="/register" icon>
        <v-icon>mdi-account-plus</v-icon>
      </v-btn>
      <!-- TODO: TRADE THIS OUT WITH AVATAR THAT EXPOSES DROPDOWN (PROFILE/LOGOUT) ONCE LOGGED IN -->
      <v-btn v-if="isAuthenticated" @click.stop="logout" icon>
        <v-icon>mdi-logout</v-icon>
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

        <v-list-item link to="/moderator">
          <v-list-item-icon>
            <v-icon>mdi-shield-account-variant</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="text-capitalize">
              moderator
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
import { mapState, mapMutations, mapGetters } from "vuex";
// import { mapState, mapMutations } from "vuex";
import Vue from "vue";

export default {
  components: {},
  name: "App",

  data: () => ({
    // isAuthenticated: false,
    toggleNavBar: false,
    component: null,
  }),
  computed: {
    ...mapState({
      // visible: `modalVisible`,
      modalComponent: `modalComponent`,
    }),
    ...mapGetters("authentication", ["isAuthenticated"]),
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
    logout() {
      // TODO: redirect on logout
      this.$store.dispatch("authentication/logout");
      this.$router.push("/");
    },
  },
  watch: {
    $route() {
      // clear alert on location change
      this.$store.dispatch("alert/clear");
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