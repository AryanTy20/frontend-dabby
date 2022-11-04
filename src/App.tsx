import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./layout";
import { ErrorBoundary } from "react-error-boundary";
import ProtectedRoute from "./layout/protectedRoute";
import PersistantRoute from "./layout/persistantRoute";
import ErrorFallback from "./components/ErrorBoundary";
const Register = React.lazy(() => import("./components/register"));
const Login = React.lazy(() => import("./components/login"));
const HomePage = React.lazy(() => import("./components/homepage"));
const PageNotFound = React.lazy(() => import("./components/pagenotfound"));

function App() {
  return (
    <>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => location.reload()}
      >
        <Suspense fallback={<h1>Loading</h1>}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route element={<PersistantRoute />}>
                <Route element={<ProtectedRoute />}>
                  <Route path="/" element={<HomePage />} />
                </Route>
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

export default App;
