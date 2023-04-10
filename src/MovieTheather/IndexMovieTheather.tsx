
import { Link } from "react-router-dom";
import { urlMovieTheather } from "../endpoints";
import IndexEntity from "../Utils/IndexEntity";
import { movieTheatherDTO } from "./movietheather.model";

export default function IndexMovieTheather() {
  return (
    <IndexEntity<movieTheatherDTO> 
            url={urlMovieTheather} createUrl="movietheather/create" title="Movie Theaters"
            entityName="Movie Theater"
        >
            {(entities, buttons) => <>
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {entities?.map(entity => <tr key={entity.id}>
                        <td>
                            {buttons(`movietheather/edit/${entity.id}`, entity.id)}
                        </td>
                        <td>
                            {entity.name}
                        </td>
                    </tr>)}
                </tbody>
            </>}
        </IndexEntity>
  );
}
