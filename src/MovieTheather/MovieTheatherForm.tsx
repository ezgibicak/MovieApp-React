import { Form, Formik, FormikHelpers } from "formik";
import { Link } from "react-router-dom";
import TextField from "../Forms/TextField";
import Button from "../Utils/Button";
import * as Yup from "yup";
import { movieTheatherCreationDTO } from "./movietheather.model";
import MapField from "../Forms/MapField";
import coordinatesDTO from "../Utils/coordinatesDTO.model.d";
export default function MovieTheatherForm(props: movieTheatherFormProps) {
  function transformCoordinates(): coordinatesDTO[] | undefined {
    if(props.model.latitude && props.model.longitude){
      const response:coordinatesDTO ={
        lat:props.model.latitude,
        lng:props.model.longitude
      }
      return [response]
    }
    return undefined;
  }
  return (
    <>
      <Formik
        initialValues={props.model}
        onSubmit={props.onSubmit}
        validationSchema={Yup.object({
          name: Yup.string()
            .required("This field is required")
            .firstLetterUpperCase(),
        })}
      >
        {(formikProps) => (
          <Form>
            <TextField field="name" displayName="Name"></TextField>
            <div style={{ marginBottom: "1rem" }}>
              <MapField
                latField="latitude"
                lngField="longitude"
                coordinates={transformCoordinates()}
              ></MapField>
            </div>
            <Button disabled={formikProps.isSubmitting} type="submit">
              Save Changes
            </Button>
            <Link className="btn btn-secondary" to="/movietheather">
              Cancel
            </Link>
          </Form>
        )}
      </Formik>
    </>
  );
}
interface movieTheatherFormProps {
  model: movieTheatherCreationDTO;
  onSubmit(
    value: movieTheatherCreationDTO,
    action: FormikHelpers<movieTheatherCreationDTO>
  ): void;
}
