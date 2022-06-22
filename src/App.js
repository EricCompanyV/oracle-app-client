import "./App.css";
import Layout from "./components/Layout";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import NewDecisionForm from "./components/NewDecisionForm";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/decision-form" element={<NewDecisionForm />} />
      </Routes>
    </Layout>
  );
}

export default App;
