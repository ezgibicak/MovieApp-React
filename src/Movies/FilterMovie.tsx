import axios, { AxiosResponse } from "axios";
import { Field, Formik } from "formik";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { urlGenres, urlMovie } from "../endpoints";
import { genreDTO } from "../Genres/genre.model";
import Button from "../Utils/Button";
import Pagination from "../Utils/Pagination";
import MovieList from "./MovieList";
import { movieDTO } from "./movies.model.d";

export default function FilterMovie() {
  const [genres, setGenre] = useState<genreDTO[]>([]);
  const [movies, setMovie] = useState<movieDTO[]>([]);
  const history = useHistory();
  const query = new URLSearchParams(useLocation().search);
  const [totalAmountOfPages, setTotalAmountOfPages] = useState(0);
  useEffect(() => {
    axios
      .get(`${urlGenres}/All`)
      .then((response: AxiosResponse<genreDTO[]>) => {
        setGenre(response.data);
      });
  }, []);
  useEffect(() => {
    searchMovie(initialMovie);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (query.get("title")) {
      initialMovie.title = query.get("title")!;
    }

    if (query.get("genreId")) {
      initialMovie.genreId = parseInt(query.get("genreId")!, 10);
    }

    if (query.get("upcomingReleases")) {
      initialMovie.upComingReleases = true;
    }

    if (query.get("inTheaters")) {
      initialMovie.inTheaters = true;
    }

    if (query.get("page")) {
      initialMovie.page = parseInt(query.get("page")!, 10);
    }

    searchMovie(initialMovie);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  function searchMovie(values: filterMovieProps) {
    modifyUrl(values);
    axios
      .get(`${urlMovie}/Filter`, { params: values })
      .then((response: AxiosResponse<movieDTO[]>) => {
        const records = parseInt(response.headers["totalamountofrecords"], 10);
        setTotalAmountOfPages(Math.ceil(records / values.recordsPerPage));
        setMovie(response.data);
      });
  }
  function modifyUrl(values: filterMovieProps) {
    const queryString: string[] = [];
    if (values.title) {
      queryString.push(`title=${values.title}`);
    }
    if (values.genreId !== 0) {
      queryString.push(`genreId=${values.genreId}`);
    }
    if (values.upComingReleases) {
      queryString.push(`upComingReleases=${values.upComingReleases}`);
    }
    if (values.inTheaters) {
      queryString.push(`inTheaters=${values.inTheaters}`);
    }
    queryString.push(`page=${values.page}`);
    history.push(`/movie/filter?${queryString.join("&")}`);
  }
  const initialMovie: filterMovieProps = {
    title: "",
    genreId: 0,
    upComingReleases: false,
    inTheaters: false,
    page: 1,
    recordsPerPage: 10,
  };
  return (
    <>
      <h2>Filter Movie</h2>
      <Formik
        initialValues={initialMovie}
        onSubmit={(values) => {
          values.page = 1;
          searchMovie(values);
        }}
      >
        {(formikProps) => (
          <>
            <div className="row gx-3 align-item-center mb-3">
              <div className="col-auto">
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  placeholder="Title of the movie"
                  {...formikProps.getFieldProps("title")}
                />
              </div>
              <div className="col-auto">
                <select
                  className="form-select"
                  {...formikProps.getFieldProps("genreId")}
                >
                  <option value="0">Select a genre</option>
                  {genres.map((genre) => (
                    <option value={genre.id}>{genre.name}</option>
                  ))}
                </select>
              </div>
              <div className="col-auto">
                <div className="form-check">
                  <Field
                    className="form-check-input"
                    id="upComingReleases"
                    name="upComingReleases"
                    type="checkbox"
                  ></Field>
                  <label
                    className="form-check-label"
                    htmlFor="upComingReleases"
                  >
                    Upcoming Releases
                  </label>
                </div>
              </div>
              <div className="col-auto">
                <div className="form-check">
                  <Field
                    className="form-check-input"
                    id="inTheaters"
                    name="inTheaters"
                    type="checkbox"
                  ></Field>
                  <label className="form-check-label" htmlFor="inTheaters">
                    In Theaters
                  </label>
                </div>
              </div>
              <div className="col-auto">
                <Button
                  className="btn btn-primary"
                  onClick={() => formikProps.submitForm()}
                >
                  Filter
                </Button>
                <Button
                  className="btn btn-danger ms-3"
                  onClick={() => {
                    formikProps.setValues(initialMovie);
                    searchMovie(initialMovie);
                  }}
                >
                  Clear
                </Button>
              </div>
            </div>
            <MovieList movies={movies}></MovieList>
            <Pagination
              totalAmountOfPages={totalAmountOfPages}
              currentPage={formikProps.values.page}
              onChange={(newPage) => {
                formikProps.values.page = newPage;
                searchMovie(formikProps.values);
              }}
            />
          </>
        )}
      </Formik>
    </>
  );
}
interface filterMovieProps {
  title: string;
  genreId: number;
  upComingReleases: boolean;
  inTheaters: boolean;
  page: number;
  recordsPerPage: number;
}
