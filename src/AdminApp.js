import "./App.css";
import AuthState from "./Context/Auth/AuthState";
import BrandsState from "./Context/Brands/BrandsState";
import ProjectsState from "./Context/Projects/ProjectsState";
import UsersState from "./Context/Users/UsersState";
import RolesState from "./Context/Roles/RolesState";
import AppRouter from "./Routes/AppRouter";
import PermisosState from "./Context/Permisos/PermisosState";

function AdminApp() {
  return (
    <AuthState>
      <ProjectsState>
        <UsersState>
          <BrandsState>
            <RolesState>
              <PermisosState>
                <AppRouter />
              </PermisosState>
            </RolesState>
          </BrandsState>
        </UsersState>
      </ProjectsState>
    </AuthState>
  );
}

export default AdminApp;
