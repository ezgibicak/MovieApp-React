import { Form, Formik, FormikHelpers } from "formik";
import { userCredentials } from "./auth.model.d";
import * as Yup from "yup";
import TextField from "../Forms/TextField";
import Button from "../Utils/Button";
import { Link } from "react-router-dom";

export default function AuthForm(props: authProps) {
  return (
    <>
      <Formik
        initialValues={props.model}
        onSubmit={props.onSubmit}
        validationSchema={Yup.object({
            email: Yup.string().required('This field is required')
                .email('You have to insert a valid email'),
            password: Yup.string().required('This field is required')
        })}
      >
        {(formikProps) => (
          <Form>
            <TextField field={"email"} displayName={"Email"}></TextField>
            <TextField
              field={"password"}
              displayName={"Password"}
              type="password"
            ></TextField>
            <Button disabled={formikProps.isSubmitting} type="submit">
              Send
            </Button>
            <Link to={""} className="btn btn-secondary">Cancel</Link>
          </Form>
        )}
      </Formik>
    </>
  );
}
interface authProps {
  model: userCredentials;
  onSubmit(
    values: userCredentials,
    actions: FormikHelpers<userCredentials>
  ): void;
}
