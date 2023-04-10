import "./App.css";
import Menu from "./Menu/Menu";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import routes from "./route-config";
import configureValidations from "./Validation/Validation";
import { useEffect, useState } from "react";
import { claim } from "./Authorize/auth.model.d";
import AuthenticationContext from "./Authorize/AuthenticationContext";
import { getClaims } from "./Authorize/handleJWT";
import configureInterceptor from "./Utils/httpinterceptor";
configureValidations();
configureInterceptor()
function App() {
  const [claims, setClaims] = useState<claim[]>([]);
  useEffect(() => {
    setClaims(getClaims());
  }, []);
  function isAdmin() {
    return (
      claims.findIndex((x) => x.name === "role" && x.value === "admin") > -1
    );
  }
  return (
    <BrowserRouter>
      <AuthenticationContext.Provider value={{ claims, update: setClaims }}>
        <Menu />
        <div className="container">
          <Switch>
            {routes.map((route) => (
              <Route key={route.path} path={route.path} exact={route.exact}>
                {route.isAdmin && !isAdmin() ? (
                  <>You are not allowed this page</>
                ) : (
                  <route.component />
                )}
              </Route>
            ))}
          </Switch>
        </div>
        <footer className="bd-footer py-5 mt-5 bg-light">
          <div className="container">
            Movie App {new Date().getFullYear().toString()}
          </div>
        </footer>
      </AuthenticationContext.Provider>
    </BrowserRouter>
  );
}

export default App;
