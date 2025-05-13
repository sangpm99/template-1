import { createApp } from "vue";

import App from "@/App.vue";
import { registerPlugins } from "@core/utils/plugins";

// Styles
import "@core/scss/template/index.scss";
import "@styles/styles.scss";

// reCaptcha
import { install } from "vue3-recaptcha-v2";

// casl
import ability from "@/plugins/2.casl/ability";
import { abilitiesPlugin } from "@casl/vue";

// @ts-ignore
import JsonViewer from "vue3-json-viewer";
import "vue3-json-viewer/dist/index.css";

// Create vue app
const app = createApp(App);

import "lity/dist/lity.min.css";

import customConfig from "@/custom.config";

// Register plugins
registerPlugins(app);
app.use(install, {
  sitekey: import.meta.env.VITE_GOOGLE_SITE_KEY,
  cnDomains: false, // Optional, If you use in China, set this value true
});
app.use(abilitiesPlugin, ability, {
  useGlobalProperties: true,
});

app.use(JsonViewer);
// Mount vue app
await customConfig();
app.mount("#app");
