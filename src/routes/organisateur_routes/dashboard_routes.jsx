import { Route } from "react-router-dom";
import ProtectedRouter from "../ProtectedRouter";
import Dashboard from "../../pages/evenements/organisateur_page/Dashboard";

export const dashboard_routes_items = {

  dashboard: {
    path: "dashboard",
    name: "Dashboard",
    component: Dashboard,
  },

};

let dashboard_routes = [];

for (let key in dashboard_routes_items) {

  const route = dashboard_routes_items[key];

  dashboard_routes.push(
    <Route path={route.path} element={<ProtectedRouter><route.component /></ProtectedRouter>} key={route.path} />
  );
}

export default dashboard_routes;
