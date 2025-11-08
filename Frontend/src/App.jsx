// App.js
import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext";
// import { TransactionProvider } from "./context/TransactionContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./Routes/PrivateRoute";
// import PrivateRoute from "./components/Common/PrivateRoute";
import "./App.css";
import { AuthContextProvider } from "./context/AuthContext";
import { TransactionContextProvider } from "./context/TransactionContext";

function App() {
  return (
    <AuthContextProvider>
      <TransactionContextProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route path="/" element={<Navigate to="/dashboard" />} />
            </Routes>
          </div>
        </Router>
      </TransactionContextProvider>
    </AuthContextProvider>
  );
}

export default App;
