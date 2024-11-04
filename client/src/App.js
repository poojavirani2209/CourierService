import "./App.css";
import { connectToServer } from "./api/setup";
import { useEffect } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import CreateShipment from "./components/CreateShipment";
import TrackShipment from "./components/TrackShipment";

function App() {
  let serverURL = `http://localhost:8887`;

  useEffect(() => {
    connectToServer(serverURL);
  }, []);

  return (
    <>
      <Register></Register>
      <Login></Login>
      <CreateShipment></CreateShipment>
      <TrackShipment></TrackShipment>
    </>
  );
}

export default App;
