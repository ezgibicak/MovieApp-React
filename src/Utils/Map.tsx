import {
  MapContainer,
  TileLayer,
  useMapEvent,
  Marker,
  Popup,
} from "react-leaflet";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";
import coordinatesDTO from "./coordinatesDTO.model.d";
import { useState } from "react";

let defaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconAnchor: [16, 37],
});
L.Marker.prototype.options.icon = defaultIcon;
export default function Map(props: mapProps) {
  const [coordinates, setCoordinates] = useState<coordinatesDTO[]>(
    props.coordinates
  );
  return (
    <MapContainer
      center={[39.89549800099584, 32.83757802092195]}
      zoom={14}
      style={{ height: props.height }}
    >
      <TileLayer
        attribution="Movies"
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      ></TileLayer>
      {props.readOnly ? null : (
        <MapClick
          setCoordinates={(coordinates) => {
            setCoordinates([coordinates]);
            props.handleMapClick(coordinates);
          }}
        ></MapClick>
      )}
      {coordinates.map((coordinate, index) => (
        <Marker key={index} position={[coordinate.lat, coordinate.lng]}>
          {coordinate.name ? <Popup>{coordinate.name}</Popup> : null}
        </Marker>
      ))}
    </MapContainer>
  );
}
interface mapProps {
  height: string;
  coordinates: coordinatesDTO[];
  handleMapClick(coordinates: coordinatesDTO): void;
  readOnly: boolean;
}
Map.defaultProps = {
  height: "500px",
  handleMapClick: () => {},
  readOnly: false,
};
function MapClick(props: mapClickProps) {
  useMapEvent("click", (eventArgs) => {
    props.setCoordinates({
      lat: eventArgs.latlng.lat,
      lng: eventArgs.latlng.lng,
    });
  });
  return null;
}
interface mapClickProps {
  setCoordinates(coordinates: coordinatesDTO): void;
}
