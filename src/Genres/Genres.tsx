
import { urlGenres } from "../endpoints";
import IndexEntity from "../Utils/IndexEntity";
import { genreDTO } from "./genre.model";

export default function Genres() {
  return (
    <>
      <IndexEntity<genreDTO>
        url={urlGenres}
        title="Genres"
        entityName="Genre"
        createUrl="genres/create"
      >
        {(genres, buttons) => (
          <>
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {genres?.map((genre) => (
                <tr key={genre.id}>
                  <td>
                    {buttons(`genres/edit/${genre.id}`,genre.id)}
                  </td>
                  <td>{genre.name}</td>
                </tr>
              ))}
            </tbody>
          </>
        )}
      </IndexEntity>
    </>
  );
}
