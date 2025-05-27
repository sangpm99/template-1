interface ShippingAddress {
  fullName: string;
  phone: string;
  address1: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
}

interface ShippingMethod {
  id: string;
  name: string; // "Giao hàng tiêu chuẩn", "Giao siêu tốc", ...
  description?: string;
  cost: number;
  minOrderPrice?: number; // miễn phí nếu >= ?
  availableZones?: string[]; // các vùng áp dụng
}
