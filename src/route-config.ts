import CreateActors from "./Actors/CreateActors";
import EditActors from "./Actors/EditActors";
import IndexActors from "./Actors/IndexActors";
import CreateGenres from "./Genres/CreateGenres";
import EditGenres from "./Genres/EditGenres";
import Genres from "./Genres/Genres";
import LandingPage from "./LandingPage/LandingPage";
import CreateMovie from "./Movies/CreateMovie";
import EditMovie from "./Movies/EditMovie";
import FilterMovie from "./Movies/FilterMovie";
import IndexMovie from "./Movies/IndexMovie";
import MovieDetail from "./Movies/MovieDetail";
import CreateMovieTheather from "./MovieTheather/CreateMovieTheather";
import EditMovieTheather from "./MovieTheather/EditMovieTheather";
import IndexMovieTheather from "./MovieTheather/IndexMovieTheather";
import RedirectToLandingPage from "./Utils/RedirectToLandingPage";
import Register from "./Authorize/Register";
import Login from "./Authorize/Login";
import IndexUsers from "./Authorize/IndexUsers";

const routes = [
  {
    path: "/genres",
    component: Genres,
    exact: true,
    isAdmin: true,
  },
  {
    path: "/",
    component: LandingPage,
    exact: true,
  },
  {
    path: "/genres/create",
    component: CreateGenres,
    isAdmin: true,
  },
  {
    path: "/genres/edit/:id(\\d+)",
    component: EditGenres,
    isAdmin: true,
  },
  {
    path: "/actors",
    component: IndexActors,
    exact: true,
    isAdmin: true,
  },
  {
    path: "/actors/create",
    component: CreateActors,
    isAdmin: true,
  },
  {
    path: "/actors/edit/:id(\\d+)",
    component: EditActors,
    isAdmin: true,
  },
  {
    path: "/movie",
    component: IndexMovie,
    exact: true,
    isAdmin: true,
  },
  {
    path: "/movie/create",
    component: CreateMovie,
    isAdmin: true,
  },
  {
    path: "/movie/edit/:id(\\d+)",
    component: EditMovie,
    isAdmin: true,
  },
  {
    path: "/movie/filter",
    component: FilterMovie,
  },
  {
    path: "/movie/:id(\\d+)",
    component: MovieDetail,
  },
  {
    path: "/movietheather/create",
    component: CreateMovieTheather,
    isAdmin: true,
  },
  {
    path: "/movietheather/edit/:id(\\d+)",
    component: EditMovieTheather,
    isAdmin: true,
  },
  {
    path: "/movietheather",
    component: IndexMovieTheather,
    isAdmin: true,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/users",
    component: IndexUsers,
    exact: true,
    isAdmin:true
  },
  {
    path: "*",
    component: RedirectToLandingPage,
  },
];
export default routes;
