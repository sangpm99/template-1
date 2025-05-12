import { getLocalStorageUser } from "@/stores/authorizeStore";
import { id } from "@/utils";
import type { HubConnection } from "@microsoft/signalr";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

class CallHub {
  client?: HubConnection;
  constructor() {
    const token = getLocalStorageUser()?.token;

    if (token) {
      const config = token ? { accessTokenFactory: () => token } : {};

      this.client = new HubConnectionBuilder()
        .withUrl(
          `${import.meta.env.VITE_API_BASE_URL}/signalr` +
            `?fingerprint=${id()}`,
          {
            ...config,
            headers: {
              fingerprint: id(),
            },
          },
        )
        .withAutomaticReconnect()
        .configureLogging(LogLevel.None)
        .build();
    }
  }

  async start() {
    try {
      await this.client?.start();
    } catch (error) {
      // setTimeout(() => this.start(), 5000);
    }
  }
}

export default new CallHub();
