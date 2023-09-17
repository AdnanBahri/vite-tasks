import { Route, RouterProvider, Routes } from "react-router";
import Header from "./components/header";
import HomePage from "./pages/HomePage.jsx";
import SignInPage from "./pages/SignInPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import { AuthRoute, ProtectedRoute } from "./structure";
import useAuth from "./hooks/useAuth";

const App = () => {
  useAuth();
  return (
    <div className="">
      <Header />
      <Routes>
        <Route
          path="/"
          index
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/signin"
          element={
            <AuthRoute>
              <SignInPage />
            </AuthRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <AuthRoute>
              <SignUpPage />
            </AuthRoute>
          }
        />
      </Routes>
    </div>
  );
};
export default App;
