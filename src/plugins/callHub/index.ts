import type { App } from "vue";
import CallHub from "./callHub";

declare module "vue" {
  interface ComponentCustomProperties {
    $callHub: typeof CallHub;
  }
}

export default {
  install(app: App) {
    CallHub.start();
    app.config.globalProperties.$callHub = CallHub;
  },
};
