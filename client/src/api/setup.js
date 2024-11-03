import RequestProvider from "./apiRequestProvider";

export async function connectToServer(serverURL) {
  await RequestProvider.createServerInstance(serverURL);
}
