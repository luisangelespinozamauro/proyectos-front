import "./App.css";
import AuthState from "./Context/Auth/AuthState";
import ProjectsState from "./Context/Projects/ProjectsState";
import AppRouter from "./Routes/AppRouter";

function AdminApp() {
  return (
    <AuthState>
      <ProjectsState>
        <AppRouter />
      </ProjectsState>
    </AuthState>
  );
}

export default AdminApp;
