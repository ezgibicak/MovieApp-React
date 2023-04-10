import { urlActors } from "../endpoints";
import EditEntity from "../Utils/EditEntity";
import { convertActorToFormData } from "../Utils/formDataUtils";
import { actorCreationDTO, actorDTO } from "./actor.model";
import ActorForm from "./ActorForm";

export default function EditActors() {
  function transform(actor: actorDTO): actorCreationDTO {
    var dateOfBirthStr = new Date(actor.dateOfBirth.toString());
    return {
      name: actor.name,
      biography: actor.biography,
      dateOfBirth: dateOfBirthStr,
      pictureURL: actor.picture,
    };
  }
  return (
    <>
      <EditEntity<actorCreationDTO, actorDTO>
        url={urlActors}
        indexUrl="/actors"
        entityName="Actors"
        transformFormData={convertActorToFormData}
        transform={transform}
      >
        {(entity, edit) => (
          <ActorForm
            model={entity}
            onSubmit={async (values) => await edit(values)}
          ></ActorForm>
        )}
      </EditEntity>
    </>
  );
}
