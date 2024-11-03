import axios from "axios";

export class Request {
  client;
  serverURL;

  constructor(serverURL) {
    this.serverURL = serverURL;
    this.client = this.createRequestClient(serverURL);
  }

  createRequestClient(serverURL) {
    return axios.create({
      baseURL: serverURL,
    });
  }

  async post(requestURL, payload) {
    try {
      const response = await this.client.post(requestURL, payload);
      return response;
    } catch (error) {
      return error;
    }
  }
}
