import { actorMovieDTO } from "../Actors/actor.model";
import { genreDTO } from "../Genres/genre.model";
import { movieTheatherDTO } from "../MovieTheather/movietheather.model";

export interface movieDTO {
  id: number;
  title: string;
  poster: string;
  intheaters: boolean;
  trailer:string;
  summary?:string;
  releaseDate:Date
  genres:genreDTO[]
  movieTheathers:movieTheatherDTO[]
  actors:actorMovieDTO[]
  userVote:number
  avarageVote:number
}
export interface movieCreationDTO {
  title: string;
  inTheaters: boolean;
  trailer:string;
  summary?:string;
  releaseDate?:Date
  poster?:File;
  posterUrl?:string;
  genresIds?:number[]
  movieTheaterIds?:number[]
  actors?:actorMovieDTO[]
}
export interface landingPageDTO {
  inTheaters?: movieDTO[];
  upComingRelease?: movieDTO[];
}
export interface moviesPostGetDTO{
  genres:genreDTO[];
  movieTheathers:movieTheatherDTO[];
}
export interface moviePutGetDTO {
  movie:movieDTO,
  selectedGenres:genreDTO[],
  nonSelectedGenres:genreDTO[]
  selectedMovieTheathers:movieTheatherDTO[],
  nonSelectedMovieTheathers:movieTheatherDTO[],
  actors:actorMovieDTO[]
}