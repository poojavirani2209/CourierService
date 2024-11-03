import "./App.css";
import { connectToServer } from "./api/setup";
import { useEffect } from "react";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
  let serverURL = `http://localhost:8887`;

  useEffect(() => {
    connectToServer(serverURL);
  }, []);

  return (
    <>
      <Register></Register>
      <Login></Login>
    </>
  );
}

export default App;
