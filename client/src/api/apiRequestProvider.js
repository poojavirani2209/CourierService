import { Request } from "./apiClient";

export default class RequestProvider {
  static serverInstance = null;

  static async createServerInstance(serverURL) {
    if (!this.serverInstance) {
      this.serverInstance = new Request(serverURL);
    }
  }

  static request() {
    return this.serverInstance;
  }
}
