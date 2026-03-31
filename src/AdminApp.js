import "./App.css";
import AuthState from "./Context/Auth/AuthState";
import ProjectsState from "./Context/Projects/ProjectsState";
import UsersState from "./Context/Users/UsersState";
import AppRouter from "./Routes/AppRouter";

function AdminApp() {
  return (
    <AuthState>
      <ProjectsState>
        <UsersState>
          <AppRouter />
        </UsersState>
      </ProjectsState>
    </AuthState>
  );
}

export default AdminApp;
