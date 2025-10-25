import { Route } from "react-router-dom";
import ProtectedRouter from "../../ProtectedRouter";
import CreateEvent from "../../../pages/evenements/organisateur_page/events/CreateEvents";

export const organisateur_events_routes_items = {

  Events: {
    path: "events/create",
    name: "Creation de l'événement",
    component: CreateEvent,
  },

};

let organisateur_events_routes = [];

for (let key in organisateur_events_routes_items) {

  const route = organisateur_events_routes_items[key];

  organisateur_events_routes.push(
    <Route path={route.path} element={<ProtectedRouter><route.component /></ProtectedRouter>} key={route.path} />
  );
}

export default organisateur_events_routes;
