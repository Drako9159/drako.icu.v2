import { logoutUser } from "../../../api/auth";
import axios from "axios";
import { useToastStore } from "../../../store/toastNotify";
import { useAuthStore } from "../../../store/auth";

export default function Logout() {
  const setNotify = useToastStore.getState().setNotify;
  const logout = useAuthStore.getState().logout;

  async function handleLogout() {
    try {
      await logoutUser();
      logout();
      setNotify({ color: "red", message: "Is no longer an admin" });
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        setNotify({ color: "red", message: error.response?.data.message });
      }
    }
  }
  handleLogout();
}
