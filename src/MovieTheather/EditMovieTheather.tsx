import { urlMovieTheather } from "../endpoints";
import EditEntity from "../Utils/EditEntity";
import {
  movieTheatherCreationDTO,
  movieTheatherDTO,
} from "./movietheather.model";
import MovieTheatherForm from "./MovieTheatherForm";

export default function EditMovieTheather() {
  return (
    <EditEntity<movieTheatherCreationDTO, movieTheatherDTO>
      url={urlMovieTheather}
      entityName="Movie Theather"
      indexUrl="/movietheather"
    >
      {(entity, edit) => (
        <MovieTheatherForm
          model={entity}
          onSubmit={async (values) => await edit(values)}
        ></MovieTheatherForm>
      )}
    </EditEntity>
  );
}
