import { useEffect } from "react";
import { loginUserWebsite } from "../api/auth";
import { useAuthStore } from "../store/auth";

export default function useAuthWebsite() {
  useEffect(() => {
    loginApi();
  }, []);

  async function loginApi() {
    try {
      const response = await loginUserWebsite();
      useAuthStore.getState().setAuth(response.data.jwt, {
        id: response.data.user.id,
        firstName: response.data.user.firstName,
        lastName: response.data.user.lastName,
        email: response.data.user.email,
        role: response.data.user.role,
        createdAt: response.data.user.createdAt,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
