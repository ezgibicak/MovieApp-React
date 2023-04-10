import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { urlMovie } from "../endpoints";
import { genreDTO } from "../Genres/genre.model";
import { movieTheatherDTO } from "../MovieTheather/movietheather.model";
import DisplayErrors from "../Utils/DisplayErrors";
import { convertMovieToFormData } from "../Utils/formDataUtils";
import Loading from "../Utils/Loading";
import MovieForm from "./MovieForm";
import { movieCreationDTO, moviesPostGetDTO } from "./movies.model.d";

export default function CreateMovie() {
  const [nonSelectGenre, setNonSelectedGenre] = useState<genreDTO[]>([]);
  const [nonSelectMovieTheater, setNonSelectedMovieTheater] = useState<
    movieTheatherDTO[]
  >([]);
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<string[]>([]);
  useEffect(() => {
    axios
      .get(`${urlMovie}/postget`)
      .then((response: AxiosResponse<moviesPostGetDTO>) => {
        setNonSelectedGenre(response.data.genres);
        setNonSelectedMovieTheater(response.data.movieTheathers);
        setLoading(false);
      });
  }, []);
  async function create(movie: movieCreationDTO) {
    try {
      const data = convertMovieToFormData(movie);
      const response = await axios({
        method: "post",
        data: data,
        url: urlMovie,
        headers: { "Content-Type": "multipart/form-data" },
      });
      history.push(`movie/${response.data}`);
    } catch (error: any) {
      if (error && error.response) {
        setErrors(error.response.data);
      }
    }
  }
  return (
    <>
      <h3>Create Movie</h3>
      <DisplayErrors errors={errors}></DisplayErrors>
      {loading ? (
        <Loading />
      ) : (
        <MovieForm
          model={{ title: "", inTheaters: false, trailer: "" }}
          onSubmit={async values => await create(values)}
          selectedGenres={[]}
          unSelectedGenres={nonSelectGenre}
          selectedMovieTheater={[]}
          unSelectedMovieTheater={nonSelectMovieTheater}
          selectedActors={[]}
        ></MovieForm>
      )}
    </>
  );
}
