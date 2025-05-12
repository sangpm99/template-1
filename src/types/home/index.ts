export interface SearchQuery {
  userId?: string;
  from: number | null;
  to: number | null;
}

export interface SearchQueryPaginated extends SearchQuery {
  pageIndex: number;
  pageSize: number;
}

export interface ChartData {
  datetime: string;
  profit: number;
}

export interface WarningData {
  status: string;
  counter: number;
}

export interface SearchQueryStore {
  storeId: string | null;
  userId: string;
  sortBy: string | null;
  from: number | null;
  to: number | null;
  pageIndex: number;
  pageSize: number;
  status?: string;
}

export interface StoreStatistic {
  name: string;
  email: string;
  platform: string;
  partner: string;
  country: string;
  seller: string;
  rollingReserve: number;
  productUploadedCount: number;
  orderCount: number;
  profit: number;
}

export interface SellerStatistic {
  seller: string;
  shopCount: number;
  productUploadedCount: number;
  orderCount: number;
  totalAmount: number; // REVENUE
  totalCost: number;
  totalFee: number;
  totalDesign: number;
  profit: number;
  productCreatedCount: number;
}

export interface DesignerStatistic {
  id: string;
  designer: string;
  taskCount: number;
  openning: number;
  closed: number;
  rejected: number;
  dueDateCount: number;
  totalStar: number;
  catalogs: Catalog[];
}

export interface Catalog {
  status: string;
  counter: number;
}

export interface DesignRejected {
  createdTimestamp: number;
  reason: string;
  taskId: string;
  taskName: string;
  catalog: string;
  approver: string;
}

export interface Report {
  profits: Profits[];
  orders: Order[];
  totalProduct: number;
  totalListing: number;
}

export interface Profits {
  platform: string;
  total: number;
}

export interface Order {
  platform: string;
  counter: number;
}
