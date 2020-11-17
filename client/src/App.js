import Sighnup from "./components/Sighnup";
import { Container } from "react-bootstrap";
import AuthProvider from "./contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard"
import Login from  "./components/Login"
import UpdateProfile from "./components/UpdateProfile"
import PrivateRoute from "./components/PrivateRoute"

function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard}/>
              <Route path="/signup" component={Sighnup} />
              <Route path="/login" component={Login} />
              <Route path="/update-profile" component={UpdateProfile} />
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  );
}

export default App;
