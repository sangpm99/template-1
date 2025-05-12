export interface GetAuditLogsParams {
  actor: string | null;
  operation: string | null;
  entity: string | null;
  record: string | null;
  from: number | null;
  to: number | null;
  pageIndex: number;
  pageSize: number;
}

export interface PaginatedAuditLogs {
  pageIndex: number;
  pageSize: number;
  itemsCount: number;
  items: Item[];
  extra: string;
}

export interface Item {
  id: string;
  actor: string;
  operation: string;
  entity: string;
  record: string;
  newValue: string;
  oldValue: string;
  timestamp: number;
  ipAddress: string;
}
