<template>
  <div class="wrapper">
    <side-bar>
      <template slot="links">
        <sidebar-link to="/dashboardSondes" :name="$t('sidebar.dashboardSondes')" icon="tim-icons icon-chart-pie-36"/>
        <sidebar-link to="/sonde" :name="$t('sonde')" icon="tim-icons icon-align-center"/>
        <sidebar-link to="/maps" :name="$t('sidebar.maps')" icon="tim-icons icon-pin"/>
      </template>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click.native="toggleSidebar">

      </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss">
</style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "./MobileMenu";
export default {
  components: {
    TopNavbar,
    ContentFooter,
    DashboardContent,
    MobileMenu
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    }
  }
};
</script>
