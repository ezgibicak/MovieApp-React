import { urlGenres } from "../endpoints";
import EditEntity from "../Utils/EditEntity";
import { genreCreationDTO, genreDTO } from "./genre.model";
import GenreForm from "./GenreForm";

export default function EditGenres() {

  return (
    <>
<EditEntity<genreCreationDTO,genreDTO> url={urlGenres} entityName="Genres" indexUrl="/genres">
  {(entity,edit)=>
  <GenreForm model={entity} onSubmit={async value=>{
    await edit(value)
  }}></GenreForm>
  }
</EditEntity>
    </>
  );
}
