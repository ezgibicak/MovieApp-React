import { Form, Formik, FormikHelpers } from "formik";
import { Link } from "react-router-dom";
import TextField from "../Forms/TextField";
import Button from "../Utils/Button";
import { actorCreationDTO } from "./actor.model";
import * as Yup from "yup";
import DateField from "../Forms/DateField";
import ImageField from "../Forms/ImageField";
import MarkDownField from "../Forms/MarkDownField";

export default function ActorForm(props: actorFormProps) {
  return <Formik initialValues={props.model}
  onSubmit={props.onSubmit}
  validationSchema={Yup.object({
    name: Yup.string()
      .required("This field is required")
      .firstLetterUpperCase(),
    dateOfBirth:Yup.date().nullable().required("This field is required")
  })}>
    {(formikProps) => (
          <Form>
            <TextField field="name" displayName="Name"></TextField>   
            <DateField field="dateOfBirth" displayName="Date Of Birth"></DateField>
            <ImageField displayName="Picture" field="picture" imageURL={props.model.pictureURL}></ImageField>
            <MarkDownField displayName="Biography" field="biography"></MarkDownField>
            <Button disabled={formikProps.isSubmitting} type="submit">
              Save Changes
            </Button>  
            <Link className="btn btn-secondary" to="/genres">
              Cancel
            </Link>
          </Form>
        )}
  </Formik>;
}
interface actorFormProps {
    model:actorCreationDTO
    onSubmit(values:actorCreationDTO, action:FormikHelpers<actorCreationDTO>):void
}
