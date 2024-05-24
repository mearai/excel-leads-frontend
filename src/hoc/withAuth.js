"use client";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { selectCurrentUser } from "@/store/auth/AuthSlice"; // Adjust the path according to your auth slice

export default function withAuth(WrappedComponent) {
  return function WithAuth(props) {
    const user = useSelector(selectCurrentUser);
    const router = useRouter();

    useEffect(() => {
      if (!user) {
        // Redirect to login page if not authenticated
        router.push("/avc"); // Adjust the path to your login page
      }
    }, [user, router]);

    if (!user) {
      // You can return a loading spinner or null while the user is being redirected
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };
}
