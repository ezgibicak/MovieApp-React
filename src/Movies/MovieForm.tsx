import { Form, Formik, FormikHelpers } from "formik";
import { movieCreationDTO } from "./movies.model.d";
import * as Yup from "yup";
import Button from "../Utils/Button";
import { Link } from "react-router-dom";
import TextField from "../Forms/TextField";
import DateField from "../Forms/DateField";
import ImageField from "../Forms/ImageField";
import CheckBoxField from "../Forms/CheckBoxField";
import MultipleSelector, {
  multipleSelectorModel,
} from "../Forms/MultipleSelector";
import { useState } from "react";
import { genreDTO } from "../Genres/genre.model";
import { movieTheatherDTO } from "../MovieTheather/movietheather.model";
import TypeAheadActors from "../Forms/TypeAheadActors";
import { actorMovieDTO } from "../Actors/actor.model";
import MarkDownField from "../Forms/MarkDownField";

export default function MovieForm(props: movieFormProps) {
  const [selectedGenres, setSelectedGenres] = useState(
    mapToModel(props.selectedGenres)
  );
  const [unSelectedGenres, setUnselectedGenres] = useState(
    mapToModel(props.unSelectedGenres)
  );
  const [selectedMovieTheater, setSelectedMovieTheater] = useState(
    mapToModel(props.selectedMovieTheater)
  );
  const [unSelectedMovieTheater, setUnselectMovieTheater] = useState(
    mapToModel(props.unSelectedMovieTheater)
  );
  const [selectedActors, setSelectedActor] = useState(props.selectedActors);
  function mapToModel(
    items: { id: number; name: string }[]
  ): multipleSelectorModel[] {
    return items.map((item) => {
      return { key: item.id, value: item.name };
    });
  }

  return (
    <Formik
      initialValues={props.model}
      onSubmit={(values, actions) => {
        values.genresIds = selectedGenres.map((item) => item.key);
        values.movieTheaterIds = selectedMovieTheater.map((item) => item.key);
        values.actors = selectedActors;
        props.onSubmit(values, actions);
      }}
      validationSchema={Yup.object({
        title: Yup.string()
          .required("This field is required.")
          .firstLetterUpperCase(),
      })}
    >
      {(formikProps) => (
        <Form>
          <TextField field="title" displayName="Title"></TextField>
          <CheckBoxField
            displayName="In Theaters"
            field="inTheaters"
          ></CheckBoxField>
          <TextField field="trailer" displayName="Trailer"></TextField>
          <DateField field="releaseDate" displayName="Release Date"></DateField>
          <ImageField
            displayName="Poster"
            field="poster"
            imageURL={props.model.posterUrl}
          ></ImageField>
          <MarkDownField displayName={"Summary"} field={"summary"}></MarkDownField>
          <MultipleSelector
            displayName="Genres"
            selected={selectedGenres}
            nonselected={unSelectedGenres}
            onChange={(selected, nonSelect) => {
              setSelectedGenres(selected);
              setUnselectedGenres(nonSelect);
            }}
          ></MultipleSelector>
          <MultipleSelector
            displayName="Movie Theater"
            selected={selectedMovieTheater}
            nonselected={unSelectedMovieTheater}
            onChange={(selected, nonSelect) => {
              setSelectedMovieTheater(selected);
              setUnselectMovieTheater(nonSelect);
            }}
          ></MultipleSelector>
          <TypeAheadActors
            displayName="Actors"
            actors={selectedActors}
            onAdd={(actors) => {
              setSelectedActor(actors);
            }}
            listUI={(actor: actorMovieDTO) => (
              <>
                {actor.name}/
                <input
                  type="text"
                  placeholder="Character"
                  value={actor.character}
                  onChange={(e) => {
                    const index = selectedActors.findIndex(
                      (x) => x.id === actor.id
                    );
                    const actors = [...selectedActors];
                    actors[index].character = e.currentTarget.value;
                    setSelectedActor(actors);
                  }}
                ></input>
              </>
            )}
            onRemove={(actor) => {
              const actors = selectedActors.filter((x) => x !== actor);
              setSelectedActor(actors);
            }}
          ></TypeAheadActors>
          <Button disabled={formikProps.isSubmitting} type="submit">
            Save Changes
          </Button>
          <Link className="btn btn-secondary" to="/genres">
            Cancel
          </Link>
        </Form>
      )}
    </Formik>
  );
}
interface movieFormProps {
  model: movieCreationDTO;
  onSubmit(
    values: movieCreationDTO,
    actions: FormikHelpers<movieCreationDTO>
  ): void;
  selectedGenres: genreDTO[];
  unSelectedGenres: genreDTO[];
  selectedMovieTheater: movieTheatherDTO[];
  unSelectedMovieTheater: movieTheatherDTO[];
  selectedActors: actorMovieDTO[];
}
