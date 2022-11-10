import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import Loader from "./components/loader";
import Layout from "./layout";
import ProtectedRoute from "./layout/protectedRoute";
import PersistantRoute from "./layout/persistantRoute";
import ErrorFallback from "./components/ErrorBoundary";
import Auth from "./components/auth";
const HomePage = React.lazy(() => import("./components/homepage"));
const PageNotFound = React.lazy(() => import("./components/pagenotfound"));

function App() {
  return (
    <>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => location.reload()}
      >
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              {["/login", "/register"].map((item, i) => (
                <Route key={i} path={item} element={<Auth />} />
              ))}
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
