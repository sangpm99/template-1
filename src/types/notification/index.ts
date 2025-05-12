export interface SearchQuery {
  platforms?: string;
  status?: string;
  pageIndex: number;
  pageSize: number;
}

export interface Notification {
  id: string;
  platform: string;
  actor: string;
  notifier: string;
  type: string;
  action: string;
  entity: string;
  status: string | null;
  reference: string;
  createdTimestamp: number;
}
