import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./app.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ContextProvider } from "./context/userContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route
          path="*"
          element={
            <ContextProvider>
              <App />
            </ContextProvider>
          }
        />
      </Routes>
    </Router>
  </React.StrictMode>
);
