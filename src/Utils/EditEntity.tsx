import axios, { AxiosResponse } from "axios";
import { ReactElement, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import DisplayErrors from "./DisplayErrors";
import Loading from "./Loading";

export default function EditEntity<TCreation, TRead>(
  props: editEntityProps<TCreation, TRead>
) {
  const { id }: any = useParams();
  const history = useHistory();
  const [entity, setEntity] = useState<TCreation>();
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    axios.get(`${props.url}/${id}`).then((response: AxiosResponse<TRead>) => {
      setEntity(props.transform(response.data));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  async function edit(entityToEdit: TCreation) {
    try {
      if (props.transformFormData) {
        const formData = props.transformFormData(entityToEdit);
        await axios({
          method: "put",
          url: `${props.url}/${id}`,
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      else{
        await axios.put(`${props.url}/${id}`, entityToEdit);
      }
      history.push(props.indexUrl);
    } catch (error: any) {
      if (error && error.response) {
        setErrors(error.response.data);
      }
    }
  }
  return (
    <>
      <h3>Edit {props.entityName}</h3>
      <DisplayErrors errors={errors}></DisplayErrors>
      {entity ? props.children(entity, edit) : <Loading></Loading>}
    </>
  );
}
interface editEntityProps<TCreation, TRead> {
  url: string;
  entityName: string;
  transform(entity: TRead): TCreation;
  transformFormData?(model: TCreation): FormData;
  children(entity: TCreation, edit: (entity: TCreation) => void): ReactElement;
  indexUrl: string;
}
EditEntity.defaultProps = {
  transform: (entity: any) => entity,
};
