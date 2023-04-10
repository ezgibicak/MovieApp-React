import axios from "axios";
import { authenticationResponse, userCredentials } from "./auth.model.d";
import { urlAccount } from "../endpoints";
import { useContext, useState } from "react";
import DisplayErrors from "../Utils/DisplayErrors";
import AuthForm from "./AuthForm";
import { getClaims, saveToken } from "./handleJWT";
import AuthenticationContext from "./AuthenticationContext";
import { useHistory } from "react-router-dom";

export default function Login() {
  const [errors, setErrors] = useState<string[]>([]);
  const { update } = useContext(AuthenticationContext);
  const history =useHistory();
  async function login(credentials: userCredentials) {
    try {
      setErrors([]);
      const response = await axios.post<authenticationResponse>(
        `${urlAccount}/login`,
        credentials
      );
      saveToken(response.data);
      update(getClaims());
      history.push('/');
    } catch (error: any) {
      if (error && error.response) {
        setErrors(error.response.data);
      }
    }
  }
  return (
    <>
      <h3>Login</h3>
      <DisplayErrors errors={errors}></DisplayErrors>
      <AuthForm
        model={{ email: "", password: "" }}
        onSubmit={async (value) => await login(value)}
      ></AuthForm>
    </>
  );
}
