import React from "react";
import ServerStatusPage from "./pages/DashboardPage/ServerStatusPage";
import ServerListPage from "./pages/ServerListPage/ServerListPage";
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet, useParams} from "react-router-dom";
import { UserProvider } from "./pages/LoginPage/UserContext";
import { useUser } from "./pages/LoginPage/UserContext";
import LoginPage from "./pages/LoginPage/LoginPage";
import ResetAccountPasswordPage from "./pages/ResetAccountPasswordPage/ResetAccountPasswordPage";
import CreateAccountPage from "./pages/CreateAccountPage/CreateAccountPage";
import VerifyAccount from "./pages/CreateAccountPage/VerifyAccount";


const PrivateRoute = () => {
  const { user } = useUser();
  // determine if authorized, from context or however you're doing it

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return user ? <Outlet /> : <Navigate to="/" />;
}

function App() {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />

          <Route path="/resetpassword/:token" element={<ResetAccountPasswordPage />} />
          <Route path="/verify/:token/:email" element={<VerifyAccount />} />
          <Route path="/signup" element={<CreateAccountPage />} />
          <Route exact path='/serverStatus' element={<ServerStatusPage/>}/>
          <Route exact path='/serverStatus' element={<PrivateRoute/>}>
            <Route exact path='/serverStatus' element={<ServerStatusPage/>}/>
          </Route>
          <Route exact path='/serverlistpage' element={<PrivateRoute/>}>
            <Route exact path='/serverlistpage' element={<ServerListPage/>}/>
          </Route>
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
