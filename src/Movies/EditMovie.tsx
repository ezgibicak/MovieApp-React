import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { urlMovie } from "../endpoints";
import DisplayErrors from "../Utils/DisplayErrors";
import { convertMovieToFormData } from "../Utils/formDataUtils";
import Loading from "../Utils/Loading";
import MovieForm from "./MovieForm";
import { movieCreationDTO, moviePutGetDTO } from "./movies.model.d";

export default function EditMovie() {
  const { id }: any = useParams();
  const [movie, setMovie] = useState<movieCreationDTO>();
  const [moviePutGet, setMoviePutGet] = useState<moviePutGetDTO>();
  const [error, setErrors] = useState<string[]>([]);

  const history = useHistory();
  useEffect(() => {
    axios
      .get(`${urlMovie}/PutGet/${id}`)
      .then((response: AxiosResponse<moviePutGetDTO>) => {
        const model: movieCreationDTO = {
          title: response.data.movie.title,
          inTheaters: response.data.movie.intheaters,
          trailer: response.data.movie.trailer,
          summary: response.data.movie.summary,
          releaseDate: new Date(response.data.movie.releaseDate),
          posterUrl: response.data.movie.poster,
        };
        setMovie(model);
        setMoviePutGet(response.data);
      });
  }, [id]);

  async function edit(movieToEdit: movieCreationDTO) {
    try {
      const formData = convertMovieToFormData(movieToEdit);
      console.log(movieToEdit);
      console.log(formData.get("poster"));
      await axios({
        method: "put",
        url: `${urlMovie}/${id}`,
        data: formData,
        headers: { "Content-Type": " multipart/form-data" },
      });
      history.push(`/movie/${id}`);
    } catch (error: any) {
      if (error && error.response) {
        setErrors(error.response);
      }
    }
  }
  return (
    <>
      <h3>Edit Movie</h3>
      <DisplayErrors errors={error}></DisplayErrors>
      {movie && moviePutGet ? (
        <MovieForm
          model={movie}
          onSubmit={async (values) => await edit(values)}
          selectedGenres={moviePutGet.selectedGenres}
          unSelectedGenres={moviePutGet?.nonSelectedGenres}
          selectedMovieTheater={moviePutGet?.selectedMovieTheathers}
          unSelectedMovieTheater={moviePutGet?.nonSelectedMovieTheathers}
          selectedActors={moviePutGet?.actors}
        ></MovieForm>
      ) : (
        <Loading></Loading>
      )}
    </>
  );
}
