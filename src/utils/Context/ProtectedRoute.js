import { usePathname, useRouter } from "next/navigation";
import { Spinner } from "@material-tailwind/react";
import { useSelector } from "react-redux";

const ProtectedRoute = (WrappedComponent) => {
    const Wrapper = (props) => {
        const router = useRouter();
        const pathname = usePathname();
        const { user, loading } = useSelector((state) => state.user);
        if (loading) {
            return (
                <div className="flex justify-center items-center h-screen">
                    <Spinner color="red" className="h-10 w-10" />
                </div>
            );
        } else if (user && user.role === "admin" && (pathname === "/" || pathname === "/forgot-password" || pathname === "/shop")) {
            router.push("/dashboard");
            return (
                <div className="flex justify-center items-center h-screen">
                    <Spinner color="red" className="h-10 w-10" />
                </div>
            );
        } else if (!user && (pathname === "/dashboard" || pathname === "/e-commerce" || pathname === "/users" || pathname === "/profile" || pathname === "/settings" || pathname === "/profile/update-password")) {
            router.push("/");
            return (
                <div className="flex justify-center items-center h-screen">
                    <Spinner color="red" className="h-10 w-10" />
                </div>
            );
        } else if (user && user.isVerified && pathname === "/verify-account") {
            router.push("/");
            return (
                <div className="flex justify-center items-center h-screen">
                    <Spinner color="red" className="h-10 w-10" />
                </div>
            );
        } else if (user && !user.isVerified && (pathname === "/profile/update-password" || pathname === "/profile")) {
            router.push("/");
            return (
                <div className="flex justify-center items-center h-screen">
                    <Spinner color="red" className="h-10 w-10" />
                </div>
            );
        }
        else if (user && user.role === "user" && (pathname === "/dashboard" || pathname === "/e-commerce" || pathname === "/users" || pathname === "/settings")) {
            router.push("/");
            return (
                <div className="flex justify-center items-center h-screen">
                    <Spinner color="red" className="h-10 w-10" />
                </div>
            );
        } else {
            return <WrappedComponent {...props} />;
        }
    };

    return Wrapper;
};


export default ProtectedRoute;
