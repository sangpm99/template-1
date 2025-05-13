// Template
export interface Template {
  id: string;
  title: string;
  image: string;
}

// Main
export interface Site {
  template: Template;
  siteName: string;
  siteUrl: string;
  siteEmail: string;
  siteAddress: string;
  sitePhone: string;
  siteDescription: string;
  customLogo: string;
  siteIcon: string;
  topBar: string;
  primaryColor: string;
  secondaryColor: string;
  body: string;
  blogs: Blog[];
  products: Product[];
  pages: Page[];
  footer: FooterColumn[];
  absoluteFooter: string;
}

export interface SiteDetail extends Site {
  id: string;
}

export interface FooterColumn {
  headline: string;
  contents: string[];
}

export interface Body {
  banner: string;
  aboutUs: {
    title: string;
    description: string;
    image1: string;
    headline1: string;
    subtitle1: string;
    image2: string;
    headline2: string;
    subtitle2: string;
  };
  product: {
    title: string;
    description: string;
  };
  blog: {
    title: string;
    description: string;
  };
}

export interface Blog {
  id: string;
  postTitle: string;
  postContent: string;
  postExcerpt: string;
  postDateTimestamp: number;
  featuredImage: string;
}

export interface Page {
  id: string;
  postTitle: string;
  postContent: string;
  postDateTimestamp: number;
}

export interface Product {
  productName: string;
  productSubName: string | null;
  productCode: string;
  mainMockupURL: string;
  mockupURLs: string[];
  videoURL: string | null;
  isDigital: boolean;
  isPersonalize: boolean;
  isRedesign: boolean;
  productTags: string | null;
  description: string | null;
  productCategoryId: string | null;
  id: string;
  referenceId: string;
  taskManagementId: string | null;
  userName: string;
  designResults: DesignResults[];
  createdTimestamp: number;
  variants: string | null;
  metadata: string | null;
  designStatus: string;
  lineItemCount: number;
  productType: ProductType;
  productCategory: ProductCategory;
  isApproved: boolean | null;
  rejectedReason: string | null;
  productListingCount: number;
}

export interface DesignResults {
  type: string;
  originURL: string | null;
  temporaryURL: string | null;
  designURL: string | null;
  previewURL: string | null;
}

export interface ProductType {
  sku: string;
  name: string;
  variant: string;
  id: string;
  productCount: number;
}

export interface ProductCategory {
  name: string | null;
  parentCategoryId: string | null;
}
