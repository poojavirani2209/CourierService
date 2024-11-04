import "./App.css";
import { connectToServer } from "./api/setup";
import { useEffect, useState } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import CreateShipment from "./components/CreateShipment";
import TrackShipment from "./components/TrackShipment";
import Dashboard from "./components/Dashboard";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import UserOperations from "./components/UserOperations";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  let serverURL = `http://localhost:8887`;

  useEffect(() => {
    connectToServer(serverURL);
  }, []);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/user-operations" element={<UserOperations />} />
          <Route
            path="/user-login"
            element={<Login onLogin={() => setIsAuthenticated(true)} />}
          />
          <Route path="/register" element={<Register />} />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-shipment" element={<CreateShipment />} />
          <Route path="/track-shipment" element={<TrackShipment />} />

          {/* Redirect to Home if route not found */}
          <Route
            path="*"
            element={
              isAuthenticated ? (
                <Navigate to="/user-operations" />
              ) : (
                <Navigate to="/home" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
