import useSWR from "swr";
import axios from "@/lib/axios";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUser,
  selectCurrentUser,
  clearCurrentUser,
} from "@/store/auth/AuthSlice";

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const { data, error, mutate } = useSWR("/api/user", fetcher);

  const csrf = () => axios.get("/sanctum/csrf-cookie");

  useEffect(() => {
    if (data) {
      dispatch(fetchUser());
    }
  }, [data, dispatch]);

  const register = async ({ setErrors, ...props }) => {
    await csrf();
    setErrors([]);

    axios
      .post("/register", props)
      .then(() => dispatch(fetchUser()))
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
      .then(() => {
        dispatch(fetchUser());
        router.push("/dashboard");
      })
      .catch((error) => {
        if (error.response.status !== 422) throw error;
        setLoading(false);
        setErrors(error.response.data.errors);
      });
  };

  const logout = async () => {
    await axios.post("/logout").then(() => {
      dispatch(clearCurrentUser());
      router.push("/login");
    });
  };

  useEffect(() => {
    if (middleware === "guest" && redirectIfAuthenticated && user) {
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
    logout,
  };
};

const fetcher = (url) => axios.get(url).then((res) => res.data);
