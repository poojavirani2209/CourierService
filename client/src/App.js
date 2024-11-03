import "./App.css";
import { connectToServer } from "./api/setup";
import { useEffect } from "react";
import Register from "./components/Register";

function App() {
  let serverURL = `http://localhost:8887`;

  useEffect(() => {
    connectToServer(serverURL);
  }, []);

  return <Register></Register>;
}

export default App;
