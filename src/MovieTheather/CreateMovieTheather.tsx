import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { urlMovieTheather } from "../endpoints";
import DisplayErrors from "../Utils/DisplayErrors";
import { movieTheatherCreationDTO } from "./movietheather.model";
import MovieTheatherForm from "./MovieTheatherForm";

export default function CreateMovieTheather() {
  const [errors, setErrors] = useState<string[]>([]);
  const history = useHistory();
  async function create(movieTheather: movieTheatherCreationDTO) {
    try {
      await axios.post(urlMovieTheather, movieTheather);
      history.push("/movieTheather");
    } catch (error: any) {
      if (error && error.response) {
        setErrors(error.response.data);
      }
    }
  }
  return (
    <>
      <h3>Create Movie Theather</h3>
      <DisplayErrors errors={errors}></DisplayErrors>
      <MovieTheatherForm
        model={{ name: "" }}
        onSubmit={async (values) => await create(values)}
      ></MovieTheatherForm>
    </>
  );
}
