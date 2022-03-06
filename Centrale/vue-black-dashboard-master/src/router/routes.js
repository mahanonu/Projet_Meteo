import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";

// Admin pages
const DashboardSondes = () => import(/* webpackChunkName: "dashboard" */"@/pages/DashboardSondes.vue");
const Maps = () => import(/* webpackChunkName: "common" */ "@/pages/Maps.vue");
const Sonde = () => import(/* webpackChunkName: "common" */ "@/pages/Sonde.vue");

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboardSondes",
    children: [
      {
        path: "dashboardSondes",
        name: "dashboardSondes",
        component: DashboardSondes
      },
      {
        path: "maps",
        name: "maps",
        component: Maps
      },
      {
        path: "sonde",
        name: "sonde",
        component: Sonde
      }
    ]
  },
  { path: "*", component: NotFound },
];

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes;
