import { deepMerge } from "@antfu/utils";
import { themeConfig } from "@themeConfig";
import type { App } from "vue";
import { createVuetify } from "vuetify";
import { VBtn } from "vuetify/components/VBtn";
import defaults from "./defaults";
import { icons } from "./icons";
import { staticPrimaryColor, staticPrimaryDarkenColor, themes } from "./theme";

// Styles
import { cookieRef } from "@/@layouts/stores/config";
import "@core/scss/template/libs/vuetify/index.scss";
import "vuetify/styles";

export default function (app: App) {
  const cookieThemeValues = {
    defaultTheme: resolveVuetifyTheme(themeConfig.app.theme),
    themes: {
      light: {
        colors: {
          primary: cookieRef("lightThemePrimaryColor", staticPrimaryColor)
            .value,
          "primary-darken-1": cookieRef(
            "lightThemePrimaryDarkenColor",
            staticPrimaryDarkenColor
          ).value,
          "snackbar-background": "#ff5722",
        },
      },
      dark: {
        colors: {
          primary: cookieRef("darkThemePrimaryColor", staticPrimaryColor).value,
          "primary-darken-1": cookieRef(
            "darkThemePrimaryDarkenColor",
            staticPrimaryDarkenColor
          ).value,
        },
      },
    },
  };

  const optionTheme = deepMerge({ themes }, cookieThemeValues);

  const vuetify = createVuetify({
    aliases: {
      IconBtn: VBtn,
    },
    defaults,
    icons,
    theme: optionTheme,
  });

  app.use(vuetify);
}
