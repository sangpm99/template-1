import { getSiteInfo } from "@/stores/home";
import { themeConfig } from "@themeConfig";
import {
  staticPrimaryColor,
  staticPrimaryDarkenColor,
} from "@/plugins/vuetify/theme";

const changeSiteIcon = (iconUrl: string) => {
  let element: HTMLLinkElement | null =
    document.querySelector("link[rel*='icon']");

  if (!element) {
    element = document.createElement("link");
    element.rel = "icon";
    document.head.appendChild(element);
  }

  element.href = iconUrl;
};

const changeSiteTitle = (title: string, tagLine: string) => {
  document.title = `${title} - ${tagLine}`;
};

const changSiteLogo = (logoUrl: string) => {
  themeConfig.app.logo = h("img", {
    src: logoUrl,
    style: "width: 50px",
  });
};

const changeSiteColor = (primaryColor: string) => {
  localStorage.setItem("materialize-initial-loader-color", primaryColor);
  staticPrimaryColor.value = primaryColor;
  staticPrimaryDarkenColor.value = primaryColor;
};

const customConfig = async () => {
  const site = await getSiteInfo();
  changeSiteIcon(site.siteIcon);
  changeSiteTitle(site.siteName, site.siteDescription);
  changSiteLogo(site.customLogo);
  changeSiteColor(site.primaryColor);
};

export default customConfig;
