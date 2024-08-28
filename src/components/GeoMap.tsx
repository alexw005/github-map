import { Country } from "@/lib/helper/loadCountryTask";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import { GeoJSON, MapContainer, TileLayer } from "react-leaflet";
// import "./CovidMap.css";

const GeoMap = ({ countries, searchResult }: { countries: Country[]; searchResult: string }) => {
  const mapStyle = {
    fillColor: "white",
    weight: 2,
    color: "grey",
    fillOpacity: 1,
  };
  useEffect(() => {}, [countries, searchResult]);
  const onEachCountry = (country: Country, layer: any) => {
    layer.options.fillColor = country.properties.color;
    const name = country.properties.ADMIN;
    const confirmedText = country.properties.confirmedText;
    layer.bindPopup(`${name} ${confirmedText}`);
  };
  const countriesGeoJSON = {
    type: "FeatureCollection" as const,
    features: countries,
  };
  return (
    <MapContainer style={{ height: "90vh" }} zoom={5} center={[20, 60]}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <GeoJSON style={mapStyle} data={countriesGeoJSON} onEachFeature={onEachCountry} />
    </MapContainer>
  );
};

export default GeoMap;
