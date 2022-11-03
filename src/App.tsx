import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./layout";
const Register = React.lazy(() => import("./components/register"));
const Login = React.lazy(() => import("./components/login"));
const HomePage = React.lazy(() => import("./components/homepage"));

function App() {
  return (
    <>
      <Suspense fallback={<h1>Loading</h1>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<h1>Page Not Found</h1>} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
