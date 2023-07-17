import { useConfigsStore } from "../store/configs";

export default function useConfigs() {
  localStorage.getItem("configs") === null
    ? localStorage.setItem(
        "configs",
        JSON.stringify({ theme: "day", language: "en" })
      )
    : localStorage.getItem("configs");

  const configsLocalStorage = JSON.parse(localStorage.getItem("configs")!);

  useConfigsStore.getState().setConfigs(configsLocalStorage);
}
