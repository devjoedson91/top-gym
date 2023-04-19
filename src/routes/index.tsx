import AuthRoutes from "./auth.routes";
import AppRoutes from "./app.routes";

export default function Routes() {

    let isAuthenticated = false;

    return (
        isAuthenticated ? <AppRoutes /> : <AuthRoutes />
    );
}