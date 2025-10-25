import { Route } from "react-router-dom";
import EventsList from "../../pages/evenements/eventPages/EventsList";
import EventDetails from "../../pages/evenements/eventPages/EventDetails";

export const events_routes_items = {
  events: {
    path: "events",
    name: "Evénements",
    component: EventsList,
  },
  event_detail: {
    path: "event-details/:id",
    name: "Détails d'un événement",
    component: EventDetails,
  }

};

let events_routes = [];

for (let key in events_routes_items) {

  const route = events_routes_items[key];

  events_routes.push(
    // <Route path={route.path} element={<ProtectedRoute><route.component /></ProtectedRoute>} key={route.path} />
    <Route path={route.path} element={<route.component />} key={route.path} />
  );
}

export default events_routes;
