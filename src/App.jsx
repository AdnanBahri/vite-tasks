import { Route, RouterProvider, Routes } from "react-router";
import Header from "./components/header";
import HomePage from "./pages/HomePage.jsx";
import SignInPage from "./pages/SignInPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import { AuthRoute, ProtectedRoute } from "./structure";
import useAuth from "./hooks/useAuth";
import TasksPage from "./pages/TasksPage";
import TasksDetailsPage from "./pages/TasksDetailsPage";

const App = () => {
  useAuth();
  return (
    <>
      <Header />
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route path="/:groupId">
            <Route
              index
              element={
                <ProtectedRoute>
                  <TasksPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/:groupId/:listName"
              element={
                <ProtectedRoute>
                  <TasksDetailsPage />
                </ProtectedRoute>
              }
            />
          </Route>
        </Route>
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
    </>
  );
};
export default App;
