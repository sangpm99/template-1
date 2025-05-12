import type { SelectOptions } from "@/types";

export const pageIndex: number = 1;
export const pageSize: number = 20;
export const pageSizeOption: number = 200;
export const pageSizeOptions: number[] = [20, 50, 100];
export const totalVisible: number = 4;
export const orderStatus = [
  "NEW",
  "IN_PROGRESS",
  "DESIGNED",
  "IN_PRODUCTION",
  "IN_TRANSIT",
  "DELIVERED",
  "COMPLETED",
  "CANCELLED",
];
export const orderTrackingStatus = [
  "NotFound",
  "InfoReceived",
  "InTransit",
  "Expired",
  "AvailableForPickup",
  "OutForDelivery",
  "DeliveryFailure",
  "Delivered",
  "Exception",
];

export const storeStatus = ["Live", "Suspend", "Hold", "Law"];
export const taskStatuses = [
  { key: "OPEN", label: "Open", color: "#0277BD" },
  { key: "REVIEW", label: "Review", color: "warning" },
  { key: "COMPLETED", label: "Completed", color: "success" },
  { key: "REJECTED", label: "Rejected", color: "#F44336" },
  { key: "CLOSED", label: "Closed", color: "#2E7D32" },
];

export const productStatuses = [
  { key: "NONE", label: "None", color: "error" },
  { key: "DESIGNING", label: "Designing", color: "purple" },
  { key: "DESIGNED", label: "Designed", color: "info" },
  { key: "REDESIGN", label: "Redesign", color: "warning" },
  { key: "COMPLETED", label: "Completed", color: "success" },
];

export const colorsWarning = [
  "#F44336",
  "#FFC107",
  "#FF9800",
  "#F9A825",
  "#F9A825",
  "#795548",
  "#DD2C00",
];

export const colors = [
  "#4CAF50",
  "#3F51B5",
  "#009688",
  "#E91E63",
  "#8BC34A",
  "#CDDC39",
  "#03A9F4",
  "#F44336",
  "#9C27B0",
  "#673AB7",
  "#2196F3",
  "#00BCD4",
  "#FFEB3B",
  "#FFC107",
  "#FF9800",
  "#FF5722",
  "#795548",
  "#607D8B",
];

export const tiktokAuthUrl =
  "https://services.tiktokshops.us/open/authorize?app_key=6d654adb3qv68";

export const booleanOptions: SelectOptions[] = [
  { title: "Yes", value: true },
  { title: "No", value: false },
];

export const aspectRatioOptions: SelectOptions[] = [
  { title: "10:16", value: "ASPECT_10_16" },
  { title: "16:10", value: "ASPECT_16_10" },
  { title: "9:16", value: "ASPECT_9_16" },
  { title: "16:9", value: "ASPECT_16_9" },
  { title: "3:2", value: "ASPECT_3_2" },
  { title: "2:3", value: "ASPECT_2_3" },
  { title: "4:3", value: "ASPECT_4_3" },
  { title: "3:4", value: "ASPECT_3_4" },
  { title: "1:1", value: "ASPECT_1_1" },
  { title: "1:3", value: "ASPECT_1_3" },
  { title: "3:1", value: "ASPECT_3_1" },
];

export const magicPromptOptions: SelectOptions[] = [
  { title: "Auto", value: "AUTO" },
  { title: "On", value: "ON" },
  { title: "Off", value: "OFF" },
];

export const modelOptions: SelectOptions[] = [
  { title: "V1", value: "V_1" },
  { title: "V1 Turbo", value: "V_1_TURBO" },
  { title: "V2", value: "V_2" },
  { title: "V2 Turbo", value: "V_2_TURBO" },
];

export const styleTypeOptions: SelectOptions[] = [
  { title: "Auto", value: "AUTO" },
  { title: "General", value: "GENERAL" },
  { title: "Realistic", value: "REALISTIC" },
  { title: "Design", value: "DESIGN" },
  { title: "Render 3D", value: "RENDER_3D" },
  { title: "Anime", value: "ANIME" },
];
