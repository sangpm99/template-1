import { site, blogs, pages, products, body } from "@/enums/siteData";
import type { Site, Blog, Page, Product, Body } from "@/types/home";

const getSiteInfo = async (): Promise<Site> => {
  return site;
};

const getBlogs = async (): Promise<Blog[]> => {
  return blogs;
};

const getPages = async (): Promise<Page[]> => {
  return pages;
};

const getProducts = async (): Promise<Product[]> => {
  return products;
};

const getBody = async (): Promise<Body> => {
  return body;
};

const useHomeStore = defineStore("home-store", () => {
  const loading: Ref<boolean> = ref(false);

  return {
    loading,
  };
});

export { getSiteInfo, getBlogs, getPages, getProducts, getBody, useHomeStore };
