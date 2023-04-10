import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { ReactElement, useState } from "react";
import { actorMovieDTO } from "../Actors/actor.model";
import axios, { AxiosResponse } from "axios";
import { urlActors } from "../endpoints";

export default function TypeAheadActors(props: typeAheadActorsProps) {
  const [actors, setActors] = useState<actorMovieDTO[]>([]);
  const [isLoading, setLoading] = useState(false);
  const selected: actorMovieDTO[] = [];
  const [draggedElement, setDarggedElement] = useState<
    actorMovieDTO | undefined
  >(undefined);
  function handleDragStart(actor: actorMovieDTO) {
    setDarggedElement(actor);
  }
  function handleSearch(query:string){
    setLoading(true);
    axios.get(`${urlActors}/searchByName/${query}`).then((response:AxiosResponse<actorMovieDTO[]>)=>{
      setActors(response.data);
      setLoading(false);
    })
  }
  function handleDragOver(actor: actorMovieDTO) {
    if (!draggedElement) {
      return;
    }
    if (actor.id !== draggedElement.id) {
      const draggedElementIndex = props.actors.findIndex(
        (x) => x.id === draggedElement.id
      );
      const actorIndex = props.actors.findIndex((x) => x.id === actor.id);
      const actors = [...props.actors];
      actors[actorIndex] = draggedElement;
      actors[draggedElementIndex] = actor;
      props.onAdd(actors);
    }
  }
  return (
    <div className="mb-3">
      <label>{props.displayName}</label>
      <AsyncTypeahead
        id="typeahead"
        onChange={(actors) => {
          if (props.actors.findIndex((x) => x.id === actors[0].id) === -1) {
            actors[0].character='';
            props.onAdd([...props.actors, actors[0]]);
          }
        }}
        options={actors}
        labelKey={(actor) => actor.name}
        filterBy={() => true}
        isLoading={isLoading}
        onSearch={handleSearch}
        placeholder="Write the name of actor"
        minLength={1}
        flip={true}
        selected={selected}
        renderMenuItemChildren={(actor) => (
          <>
            <img
              alt="actor"
              src={actor.picture}
              style={{ height: "64px", marginRight: "10px", width: "64px" }}
            ></img>
            <span>{actor.name}</span>
          </>
        )}
      ></AsyncTypeahead>
      <ul className="list-group">
        {props.actors.map((actor) => (
          <li
            className="list-group-item list-group item-action"
            key={actor.id}
            draggable={true}
            onDragStart={() => handleDragStart(actor)}
            onDragOver={() => handleDragOver(actor)}
          >
            {props.listUI(actor)}
            <span
              className="badge badge-primary badge-pill pointer text-dark"
              style={{ marginLeft: "0.5rem" }}
              onClick={() => props.onRemove(actor)}
            >
              X
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
interface typeAheadActorsProps {
  displayName: string;
  actors: actorMovieDTO[];
  onAdd(actors: actorMovieDTO[]): void;
  listUI(actor: actorMovieDTO): ReactElement;
  onRemove(actor: actorMovieDTO): void;
}
