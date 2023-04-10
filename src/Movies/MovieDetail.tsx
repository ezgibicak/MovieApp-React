import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Link, useParams } from "react-router-dom";
import { urlMovie, urlRating } from "../endpoints";
import coordinatesDTO from "../Utils/coordinatesDTO.model.d";
import Loading from "../Utils/Loading";
import { movieDTO } from "./movies.model.d";
import Map from "../Utils/Map";
import Rating from "../Utils/Rating";
import Swal from "sweetalert2";
export default function MovieDetails() {
  const { id }: any = useParams();
  const [movie, setMovie] = useState<movieDTO>();
  useEffect(() => {
    axios.get(`${urlMovie}/${id}`).then((response: AxiosResponse<movieDTO>) => {
      response.data.releaseDate = new Date(response.data.releaseDate);
      setMovie(response.data);
    });
  }, [id]);
  function generateEmbeddedVideoURL(trailer: string): string {
    if (!trailer) {
      return "";
    }

    let videoId = trailer.split("v=")[1];
    const ampersandPosition = videoId.indexOf("&");
    if (ampersandPosition !== -1) {
      videoId = videoId.substring(0, ampersandPosition);
    }

    return `https://www.youtube.com/embed/${videoId}`;
  }
  function handleRate(rate: number) {
    axios.post(urlRating, { rate: rate, movieId: id }).then(() => {
      Swal.fire({ title: "Success", text: "Rating received", icon: "success" });
    });
  }
  function transformCoordinates(): coordinatesDTO[] {
    if (movie?.movieTheathers) {
      const coordinates = movie.movieTheathers.map((theater) => {
        return {
          lat: theater.latitude,
          lng: theater.longitude,
          name: theater.name,
        } as coordinatesDTO;
      });
      return coordinates;
    }
    return [];
  }
  return movie ? (
    <div>
      <h2>
        {movie.title} ({movie.releaseDate.getFullYear()})
      </h2>
      {movie.genres?.map((genre) => (
        <Link
          to={`/movie/filter?genreId=${genre.id}`}
          key={genre.id}
          style={{ marginRight: "5px" }}
          className="btn btn-primary btn-sm rounded-pill"
        >
          {genre.name}
        </Link>
      ))}{" "}
      | {movie.releaseDate.toDateString()}| Your vote :{" "}
      <Rating
        maximumValue={5}
        selectedValue={movie.userVote}
        onChange={handleRate}
      ></Rating>{" "}
      | Average Vote :{movie.avarageVote}
      <div style={{ display: "flex", marginTop: "1rem" }}>
        <span style={{ display: "inline-block", marginRight: "1rem" }}>
          <img
            src={movie.poster}
            style={{ height: "315px", width: "225px" }}
            alt="poster"
          ></img>
        </span>
        {movie.trailer ? (
          <div>
            <iframe
              title="trailer"
              src={generateEmbeddedVideoURL(movie.trailer)}
              width="560"
              height="315"
              frameBorder={0}
              allow="accelerometer;autoplay;encrypted-media;gyroscope;picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ) : null}
      </div>
      {movie.summary ? (
        <div style={{ marginTop: "1rem" }}>
          <h2>Summary</h2>
          <div>
            <ReactMarkdown>{movie.summary}</ReactMarkdown>
          </div>
        </div>
      ) : null}
      {movie.actors && movie.actors.length > 0 ? (
        <div style={{ marginTop: "1rem" }}>
          <h2>Actors</h2>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {movie.actors?.map((actor) => (
              <div key={actor.id} style={{ marginBottom: "2px" }}>
                <img
                  src={actor.picture}
                  alt="actor"
                  style={{ verticalAlign: "middle", width: "50px" }}
                ></img>
                <span
                  style={{
                    display: "inline-block",
                    width: "200px",
                    marginLeft: "1rem",
                  }}
                >
                  {actor.name}
                </span>
                <span>{actor.character}</span>
              </div>
            ))}
          </div>
        </div>
      ) : null}
      {movie.movieTheathers && movie.movieTheathers.length > 0 ? (
        <div>
          <h2>Movie Theater</h2>
          <Map coordinates={transformCoordinates()} readOnly={true}></Map>
        </div>
      ) : null}
    </div>
  ) : (
    <Loading></Loading>
  );
}
