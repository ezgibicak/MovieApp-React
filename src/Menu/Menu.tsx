import { Link, NavLink } from "react-router-dom";
import Authorize from "../Authorize/Authorize";
import Button from "../Utils/Button";
import { logOut } from "../Authorize/handleJWT";
import { useContext } from "react";
import AuthenticationContext from "../Authorize/AuthenticationContext";

export default function Menu() {
  const { update, claims } = useContext(AuthenticationContext);
  function getUserEmail(): string {
    return claims.filter((x) => x.name === "email")[0]?.value;
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          Movies
        </NavLink>
        <div
          className="collapse navbar-collapse"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <Authorize
              role="admin"
              authorized={
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/genres">
                      Genres
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/actors">
                      Actor
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/movietheather">
                      Movie Theather
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/movie/create">
                      Create a Movie
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/users">
                      Users
                    </NavLink>
                  </li>
                </>
              }
            />
            <li className="nav-item">
              <NavLink className="nav-link" to="/movie/filter">
                Filter a Movie
              </NavLink>
            </li>
          </ul>
          <div className="d-flex">
            <Authorize
              authorized={
                <>
                  <span className="nav-link">Hello {getUserEmail()}</span>
                  <Button
                    className="nav-link btn btn-link"
                    onClick={() => {
                      logOut();
                      update([]);
                    }}
                  >
                    Log out
                  </Button>
                </>
              }
              notAuthorized={
                <>
                  <Link to={"/register"} className="nav-link btn btn-link">
                    Register
                  </Link>
                  <Link to={"/login"} className="nav-link btn btn-link">
                    Login
                  </Link>
                </>
              }
            ></Authorize>
          </div>
        </div>
      </div>
    </nav>
  );
}
