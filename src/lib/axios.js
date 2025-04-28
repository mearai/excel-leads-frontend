import { addMessage } from "@/store/message/MessageSlice";
import { getStore } from "@/store/store";
import Axios from "axios";

const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
  withXSRFToken: true,
});
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const store = getStore();

    const status = error.response?.status;
    const message = error.response?.data?.message;
    if (
      error.response &&
      error.response.status === 419 &&
      error.response.data.message === "CSRF token mismatch."
    ) {
      // Optional: clear your auth state (e.g., Redux, localStorage, etc.)
      // Then redirect

      if (typeof window !== "undefined") {
        store?.dispatch(
          addMessage({
            type: "warning",
            text: "Session expired. You’ve been logged out.",
          })
        );
      }
    }

    return Promise.reject(error);
  }
);

export default axios;
