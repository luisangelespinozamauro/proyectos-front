import "./App.css";
import AuthState from "./Context/Auth/AuthState";
import AppRouter from "./Routes/AppRouter";

function AdminApp() {
  return (
    <AuthState>
      <AppRouter />   
    </AuthState>               
  );
}

export default AdminApp;
