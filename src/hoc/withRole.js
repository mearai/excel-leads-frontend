"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";

const withRole = (Component, requiredRole) => {
  return function ProtectedComponent(props) {
    const { hasRole } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
      if (!hasRole(requiredRole)) {
        router.replace("/"); // Redirect unauthorized users
      }
    }, [requiredRole, router]);

    if (!hasRole(requiredRole)) return null; // Prevent rendering until redirected

    return <Component {...props} />;
  };
};

export default withRole;
