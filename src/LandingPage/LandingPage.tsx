import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { urlMovie } from "../endpoints";
import MovieList from "../Movies/MovieList";
import { landingPageDTO } from "../Movies/movies.model.d";
import AlertContext from "../Utils/AlertContext";
export default function LandingPage() {
  const [movies, setMovies] = useState<landingPageDTO>({});
  useEffect(() => {
    loadData();
  }, []);
  function loadData() {
    axios
      .get(`${urlMovie}/Index`)
      .then((response: AxiosResponse<landingPageDTO>) => {
        setMovies(response.data);
      });
  }
  return (
    <AlertContext.Provider
      value={() => {
        loadData();
      }}
    >
      <h3>In Theaters</h3>
      <MovieList movies={movies.inTheaters}></MovieList>
      <h3>Upcoming Releases</h3>
      <MovieList movies={movies.upComingRelease}></MovieList>
    </AlertContext.Provider>
  );
}
