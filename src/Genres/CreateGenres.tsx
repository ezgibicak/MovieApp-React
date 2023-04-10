import axios from "axios";
import { genreCreationDTO } from "./genre.model";
import GenreForm from "./GenreForm";
import { urlGenres } from "../endpoints";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import DisplayErrors from "../Utils/DisplayErrors";

export default function CreateGenres() {
  const history = useHistory();
  const [errors, setErrors] = useState<string[]>([]);
  async function create(genre: genreCreationDTO) {
    try {
      axios.post(urlGenres, genre);
      history.push("/genres");
    } catch (error: any) {
      if (error && error.response) {
        setErrors(error.response.data);
      }
    }
  }
  return (
    <>
      <h3>Create Genres</h3>
      <DisplayErrors errors={errors}></DisplayErrors>
      <GenreForm
        model={{ name: "" }}
        onSubmit={async (value) => {
          await create(value);
        }}
      ></GenreForm>
    </>
  );
}
