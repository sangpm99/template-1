const getNavItems = [
  {
    title: "Home",
    to: { name: "root" },
    public: true,
  },
  {
    title: "Shop",
    to: { name: "shop" },
    public: true,
  },
  {
    title: "About",
    to: { name: "about" },
    public: true,
  },
  {
    title: "Blogs",
    to: { name: "blogs" },
    public: true,
  },
  {
    title: "Track Order",
    to: { name: "track-order" },
    public: true,
  },
  {
    title: "Help Center",
    public: true,
    children: [
      {
        title: "Contact",
        to: { name: "contact" },
        public: true,
      },
      {
        title: "Privacy Policy",
        to: { name: "privacy-policy" },
        public: true,
      },
      {
        title: "Billing Terms & Conditions",
        to: { name: "billing-terms-conditions" },
        public: true,
      },
      {
        title: "Cancellation & Changes",
        to: { name: "cancellation-changes" },
        public: true,
      },
      {
        title: "Copyright Policy",
        to: { name: "copyright-policy" },
        public: true,
      },
      {
        title: "Disclaimer",
        to: { name: "disclaimer" },
        public: true,
      },
      {
        title: "FAQs",
        to: { name: "faqs" },
        public: true,
      },
      {
        title: "Return & Refund Policy",
        to: { name: "return-refund-policy" },
        public: true,
      },
      {
        title: "Shipping & Delivery",
        to: { name: "shipping-delivery" },
        public: true,
      },
      {
        title: "Terms Conditions",
        to: { name: "terms-conditions" },
        public: true,
      },
    ],
  },
];

export default getNavItems;
