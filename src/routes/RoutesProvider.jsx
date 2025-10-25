import { Route, Routes } from "react-router-dom";
import AppLayout from "../components/layouts/AppLayout";
import Login from "../pages/Auth/Login";
import ProtectedRouter from "./ProtectedRouter";
import ForbiddenPage from "../pages/ForbiddenPage";
import NotFoundPage from "../pages/NotFoundPage";
import Home from "../pages/evenements/Home";
import PublicLayout from "../components/layouts/PublicLayout";
import events_routes from "./evenements/events_routes";
import Signup from "../pages/Auth/SignUp";
import Dashboard from "../pages/evenements/organisateur_page/Dashboard";
import organisateur_events_routes from "./organisateur_routes/events/organisateur_events_routes";

export default function RoutesProvider() {
    return (
        <Routes>
            {/* Frontoffice (public) */}
            <Route path="/" element={<PublicLayout />}>
                {events_routes}
                <Route index element={<Home />} />
            </Route>

            {/* Backoffice organisateurs (protégé) */}
            <Route path="/" element={< AppLayout />}>
                {organisateur_events_routes}
                <Route path="/dashboard" element={<ProtectedRouter><Dashboard /></ProtectedRouter>} />
                <Route path="/forbidden" element={<ProtectedRouter><ForbiddenPage /></ProtectedRouter>} />
            </Route>

            {/* Home */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* <Route path="/" index element={<Home />} /> */}

            <Route path="*" element={<NotFoundPage />} /> 
        </Routes>
    );
}