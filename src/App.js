import "./App.css";
import Layout from "./components/Layout";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import NewDecisionForm from "./components/NewDecisionForm";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import AllDecisionsPage from "./pages/AllDecisionsPage";
import AnonymousRoute from "./components/AnonymousRoute";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/decision-form" element={<NewDecisionForm />} />
        <Route
          path="/signup"
          element={
            <AnonymousRoute>
              <SignupPage />
            </AnonymousRoute>
          }
        />
        <Route
          path="/login"
          element={
            <AnonymousRoute>
              <LoginPage />
            </AnonymousRoute>
          }
        />
        <Route
          path="/decisions"
          element={<AllDecisionsPage />}
        />
        <Route
          path="/decisions/:id"
          element={<AllDecisionsPage />}
        />
        <Route
          path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
