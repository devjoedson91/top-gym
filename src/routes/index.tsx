import AuthRoutes from "./auth.routes";
import AppRoutes from "./app.routes";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function Routes() {

    const { isAuthenticated } = useContext(AuthContext);

    return (
        isAuthenticated ? <AppRoutes /> : <AuthRoutes />
    );
}