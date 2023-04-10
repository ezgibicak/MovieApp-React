import IndividualMovies from "./IndividualMovies";
import { movieDTO } from "./movies.model.d";
import css from "./MovieList.module.css";
import GenericList from "./../Utils/GenericList";

export default function MovieList(props: movieListProps) {
 return <GenericList list={props.movies}>
    <div className={css.div}>
      {props.movies?.map((movie) => (
        <IndividualMovies {...movie} key={movie.id}></IndividualMovies>
      ))}
    </div>
  </GenericList>;
}
interface movieListProps {
  movies?: movieDTO[];
}
