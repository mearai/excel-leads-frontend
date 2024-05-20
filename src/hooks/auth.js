import useSWR from "swr";
import axios from "@/lib/axios";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
  const router = useRouter();
  const params = useParams();

  const {
    data: user,
    error,
    mutate,
  } = useSWR("/api/user", () =>
    axios
      .get("/api/user")
      .then((res) => {
        if (res.data.success) {
          return res.data.data;
        }
        console.log("success.response");
        console.log(res.data.data);
      })
      .catch((error) => {
        if (
          error.response.status === 401 &&
          error.response.data.message === "Verification code required"
        ) {
          console.log("error.response");
          console.log(
            error.response.data.message === "Verification code required"
          );
          router.push("/verify-code");
          // logout()
        }
        if (error.response.status !== 409) {
          throw error;
        }

        // router.push("/verify-email");
      })
  );

  const csrf = () => axios.get("/sanctum/csrf-cookie");

  const register = async ({ setErrors, ...props }) => {
    await csrf();

    setErrors([]);

    axios
      .post("/register", props)
      .then(() => mutate())
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        setErrors(error.response.data.errors);
      });
  };

  // const login = async ({ setErrors, setStatus, ...props }) => {
  //     await csrf()

  //     setErrors([])
  //     setStatus(null)

  //     axios
  //         .post('/login', props)
  //         .then(() => mutate())
  //         .catch(error => {
  //             if (error.response.status !== 422) throw error

  //             setErrors(error.response.data.errors)
  //         })
  // }
  const login = async ({ setErrors, setStatus, setLoading, ...props }) => {
    await csrf();

    setErrors([]);
    setStatus(null);
    setLoading(true);
    axios
      .post("/login", props)
      .then((response) => {
        console.log("login response");
        console.log(response);
        if (response.data.success == true) {
           mutate()
          router.push("/verify-code");
        }
      })
      .catch((error) => {
        if (error.response.status !== 422) throw error;
        setLoading(false);
        setErrors(error.response.data);
      });
  };
  const verifyCode = async ({ setErrors, setStatus, setLoading, ...props }) => {
    try {
      setLoading(true); // Set loading to true when the request starts
      await csrf();

      setErrors([]);
      setStatus(null);

      await axios.post("/api/v1/2fa", props);

      // If verification is successful, you can perform additional actions here if needed
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data);
        if (error.response.data.message === "Verification code expired") {
        }
      } else {
        throw error;
      }
    } finally {
      setLoading(false); // Set loading back to false when the request completes
    }
  };
  const resendVerification = async ({
    setErrors,
    setStatus,
    setLoading,
    setMessage,
    ...props
  }) => {
    try {
      setLoading(true);
      await csrf();

      setErrors([]);
      setStatus(null);

      await axios.post("/api/v1/2fa/resend").then((response) => {
        if (response.data.success) {
          setMessage(response.data.message);
        }
        console.log("Resend response:", response.data);
      });
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data);
      } else {
        throw error;
      }
    } finally {
      setLoading(false);
    }
  };
  const forgotPassword = async ({ setErrors, setStatus, email }) => {
    await csrf();

    setErrors([]);
    setStatus(null);

    axios
      .post("/forgot-password", { email })
      .then((response) => setStatus(response.data.status))
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        setErrors(error.response.data.errors);
      });
  };

  const resetPassword = async ({ setErrors, setStatus, ...props }) => {
    await csrf();

    setErrors([]);
    setStatus(null);

    axios
      .post("/reset-password", { token: params.token, ...props })
      .then((response) =>
        router.push("/login?reset=" + btoa(response.data.status))
      )
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        setErrors(error.response.data.errors);
      });
  };

  const resendEmailVerification = ({ setStatus }) => {
    axios
      .post("/email/verification-notification")
      .then((response) => setStatus(response.data.status));
  };

  const logout = async () => {
    if (!error) {
      await axios.post("/logout").then(() => mutate());
    }

    window.location.pathname = "/login";
  };

  useEffect(() => {
    if (
      window.location.pathname === "/verify-code" &&
      error?.response.data.message === "Unauthenticated."
    ) {
      router.push("/login");
    }
    if (middleware === "guest" && redirectIfAuthenticated && user) {
      router.push(redirectIfAuthenticated);
    }
    if (
      window.location.pathname === "/verify-email" &&
      user?.email_verified_at
    ) {
      router.push(redirectIfAuthenticated);
    }
    if (middleware === "auth" && error) {
      logout();
    }
  }, [user, error]);

  return {
    user,
    register,
    login,
    verifyCode,
    resendVerification,
    forgotPassword,
    resetPassword,
    resendEmailVerification,
    logout,
  };
};
