import { useFormikContext } from "formik";
import coordinatesDTO from "../Utils/coordinatesDTO.model.d";
import Map from "../Utils/Map";
export default function MapField(props: mapFieldsProps) {
  const { values } = useFormikContext<any>();
  function handleMapClick(coordinates: coordinatesDTO) {
    values[props.latField] = coordinates.lat;
    values[props.lngField] = coordinates.lng;
  }
  return (
    <Map coordinates={props.coordinates} handleMapClick={handleMapClick}></Map>
  );
}
interface mapFieldsProps {
  coordinates: coordinatesDTO[];
  latField: string;
  lngField: string;
}
MapField.defaultProps = {
  coordinates: [],
};
