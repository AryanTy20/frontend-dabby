import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
const Register = React.lazy(() => import("./components/register"));
const Login = React.lazy(() => import("./components/login"));
const HomePage = React.lazy(() => import("./components/homepage"));

function App() {
  return (
    <>
      <Suspense fallback={<h1>Loading</h1>}>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
