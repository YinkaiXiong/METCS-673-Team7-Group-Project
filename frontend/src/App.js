import React from "react";
import Login from "./Login/login";
import Signup from "./SignUp/signup";
import ServerStatusPage from "./Dashboard/ServerStatusPage";
import ServerListPage from "./ServerList/ServerListPage";
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet} from "react-router-dom";
import { UserProvider } from "./Login/UserContext";
import { useUser } from "./Login/UserContext";


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
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
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
