import "./App.css";
import Layout from "./components/Layout";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import NewDecisionForm from "./components/NewDecisionForm";
import SignupPage from './pages/SignupPage'
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/decision-form" element={<NewDecisionForm />} />
        <Route path="/signup" element={<SignupPage />}/>
        <Route path="/login" element={<LoginPage />}/>
      </Routes>
    </Layout>
  );
}

export default App;
