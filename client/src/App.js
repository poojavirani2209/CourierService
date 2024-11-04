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
import AdminHome from "./components/AdminHome";
import AdminOperations from "./components/AdminOperations";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loggedInUserId, setLoggedInUserId] = useState(null);

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
            element={
              <Login
                isAdmin={false}
                onLogin={(userData) => {
                  setLoggedInUserId(userData.id);
                  setIsAuthenticated(true);
                }}
              />
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/home" element={<AdminHome />} />

          <Route
            path="/admin/login"
            element={
              <Login onLogin={() => setIsAuthenticated(true)} isAdmin={true} />
            }
          />
          <Route path="/admin/register" element={<Register />} />
          <Route path="/admin-operations" element={<AdminOperations />} />
          <Route
            path="/dashboard-admin"
            element={<Dashboard isAdmin={true} userId={loggedInUserId} />}
          />
          <Route path="/dashboard" element={<Dashboard isAdmin={false} userId={loggedInUserId}/>} />
          <Route path="/create-shipment" element={<CreateShipment />} />
          <Route path="/track-shipment" element={<TrackShipment />} />

          <Route path="/admin" element={<Navigate to="/admin/home" />} />
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
