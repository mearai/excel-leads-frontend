import useSWR from "swr";
import axios from "@/lib/axios";
import { useCallback, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCurrentUser,
  clearCurrentUserEmail,
  setCurrentUser,
  setCurrentUserEmail,
} from "@/store/auth/AuthSlice";
import { addMessage } from "@/store/message/MessageSlice";

const fetcher = (url) => axios.get(url).then((res) => res.data.data);
export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
  const router = useRouter();
  const params = useParams();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);

  const {
    data: user,
    error,
    mutate,
  } = useSWR("/api/v1/user", fetcher, {
    revalidateOnFocus: true, // re-check when tab regains focus
    revalidateOnReconnect: true, // re-check after hibernate/wake
    refreshInterval: 10 * 60 * 1000,
  });

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
  const login = async ({ setErrors, setStatus, setLoading, ...props }) => {
    await csrf();

    setErrors([]);
    setStatus(null);
    setLoading(true);
    axios
      .post("/login", props)
      .then((response) => {
        mutate();
        if (response.data.email) {
          const email = response.data.email;
          dispatch(setCurrentUserEmail(email));
        }
        router.push("/verify-code");
      })
      .catch((error) => {
        // if (error.response.status !== 422) throw error;
        setLoading(false);
        setErrors(error.response.data);
      });
  };
  const verifyCode = async ({
    setErrors,
    setStatus,
    setLoading,

    ...props
  }) => {
    setLoading(true); // Set loading to true when the request starts
    await csrf();

    setErrors([]);
    setStatus(null);

    await axios
      .post("/api/v1/verify", props)
      .then((response) => {
        if (response.data.success == true) {
          mutate();
          // router.push("/");
          // setLoading(false);
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 403) {
          setErrors(error.response.data);
          logout();
        } else if (error.response && error.response.status === 422) {
          setLoading(false);
          setErrors(error.response.data);
          console.error("asd");
        } else {
          setLoading(false);
          throw error;
        }
      });
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

      await axios.post("/api/v1/verify/resend").then((response) => {
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

  const logout = useCallback(async () => {
    if (!error) {
      await axios.post("/logout").then(() => mutate());

      dispatch(clearCurrentUser());
      dispatch(clearCurrentUserEmail());
    }

    window.location.pathname = "/login";
  }, [error, dispatch, mutate]);

  useEffect(() => {
    if (
      window.location.pathname === "/verify-code" &&
      (error?.response?.data?.code === "unauth" ||
        error?.response?.data?.code === "expired")
    ) {
      router.push("/login");
      // dispatch(
      //   addMessage({
      //
      //     type: "error",
      //     text: error?.response?.data?.message,
      //   })
      // );
    }
    // if (error?.response?.data?.code === "invalid_ip") {
    // dispatch(
    //   addMessage({
    //
    //     type: "error",
    //     text: error?.response?.data?.message,
    //   })
    // );
    //   // logout();
    // }
    if (
      window.location.pathname === "/login" &&
      error?.response?.data?.code === "required"
    ) {
      router.push("/verify-code");
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
    if (user && !currentUser) {
      console.log(user);
      dispatch(setCurrentUser(user));
    }
  }, [
    user,
    error,
    dispatch,
    logout,
    currentUser,
    middleware,
    redirectIfAuthenticated,
    router,
  ]);

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
