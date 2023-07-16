import { useContext } from "react";
import { usePathname, useRouter } from "next/navigation";
import styles from "../../app/loading.module.css";
import { UserContext } from "./UserContext";

const ProtectedRoute = (WrappedComponent) => {
    const Wrapper = (props) => {
        const router = useRouter();
        const pathname = usePathname();
        const { user, loading } = useContext(UserContext);
        if (loading) {
            return <div className={styles.loader}></div>;
        } else if (user && (pathname === "/" || pathname === "/signin" || pathname === "/signup")) {
            router.push("/home");
            return <div className={styles.loader}></div>;
        } else if (!user && (pathname === "/home" || pathname === "/droplet" || pathname === "/profile" || pathname === "/template" || pathname === "/settings")) {
            router.push("/");
            return <div className={styles.loader}></div>;
        } else {
            return <WrappedComponent {...props} />;
        }
    };

    return Wrapper;
};

export default ProtectedRoute;
