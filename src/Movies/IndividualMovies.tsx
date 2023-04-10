import { movieDTO } from "./movies.model.d";
import css from "./individualMovie.module.css";
import { Link } from "react-router-dom";
import Button from "../Utils/Button";
import CustomConfirm from "../Utils/CustomConfirm";
import axios from "axios";
import { urlMovie } from "../endpoints";
import { useContext } from "react";
import AlertContext from "../Utils/AlertContext";
import Authorize from "../Authorize/Authorize";

export default function IndividualMovies(props: movieDTO) {
  const buildLink = () => `/movie/${props.id}`;
  const customAlert = useContext(AlertContext);
  async function deleteMovie() {
    axios.delete(`${urlMovie}/${props.id}`).then(() => {
      customAlert();
    });
  }
  return (
    <div className={css.div}>
      <Link to={buildLink()}>
        <img alt="Poster" src={props.poster}></img>
      </Link>
      <p>
        <Link to={buildLink()}>{props.title}</Link>
      </p>
      <div>
        <Authorize
        role="admin"
          authorized={
            <>
              <Link
                style={{ marginRight: "1rem" }}
                to={`/movie/edit/${props.id}`}
                className="btn btn-info"
              >
                Edit
              </Link>
              <Button
                onClick={() => CustomConfirm(() => deleteMovie())}
                className="btn btn-danger"
              >
                Delete
              </Button>
            </>
          }
        ></Authorize>
      </div>
    </div>
  );
}
