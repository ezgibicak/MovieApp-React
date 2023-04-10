import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { urlActors } from "../endpoints";
import DisplayErrors from "../Utils/DisplayErrors";
import { convertActorToFormData } from "../Utils/formDataUtils";
import { actorCreationDTO } from "./actor.model";
import ActorForm from "./ActorForm";

export default function CreateActors() {
  const [errors, setErrors] = useState<string[]>([]);
  const history = useHistory();
  async function create(actor: actorCreationDTO) {
    try {
      const formData = convertActorToFormData(actor);
      await axios({
        method: "post",
        url: urlActors,
        data: formData,
        headers: { "Content-Type": " multipart/form-data" },
      });
      history.push("/actors");
    } catch (error: any) {
      if (error && error.response) {
        setErrors(error.response.data);
      }
    }
  }
  return (
    <>
      <h3>Create Actors</h3>
      <DisplayErrors errors={errors}></DisplayErrors>
      <ActorForm
        model={{ name: "", dateOfBirth: undefined }}
        onSubmit={async (values) => await create(values)}
      ></ActorForm>
    </>
  );
}
