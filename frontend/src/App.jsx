import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Members from "./pages/Members";
import Settings from "./pages/Settings";
import ProtectedRoute from "./routes/ProtectedRoute";
import Layout from "./components/layout/Layout";
import WorkspaceDetail from "./pages/WorkspaceDetail";
import ProjectDetail from "./pages/ProjectDetail";
import JoinWorkspace from "./pages/JoinWorkspace"
import { useEffect } from "react";
import useAuthStore from "./store/authStore";
import { fetchProfile } from "./services/authService";
import Register from "./pages/Register";
import VerifyEmail from "./pages/VerifyEmail";
import LandingPage from "./pages/LandingPage";

function App() {

  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);


  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />}/>
      <Route path="/register" element={<Register />}/>
      <Route path="/verify-email/:token" element={<VerifyEmail />}/>
      {/* <Route path="/join/:invitationToken" element={<JoinWorkspace/>}/> */}
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/workspace/:workspaceId" element={<WorkspaceDetail />} />
        <Route path="/workspace/:workspaceId/project/:projectId" element={<ProjectDetail />} />
        <Route path="/join/:invitationToken" element={<JoinWorkspace/>}/>
        <Route path="/members" element={<Members />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;