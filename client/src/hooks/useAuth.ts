import { useEffect } from "react";
import { loginRequest } from "../api/login";
import { useAuthStore } from "../store/auth";

export default function useAuth() {
  useEffect(() => {
    loginApi();
  }, []);

  async function loginApi() {
    try {
      await loginRequest().then((res) => {
        useAuthStore.getState().setToken(res.headers.authorization);
      });
    } catch (error) {
      console.log(error);
    }
  }
}
