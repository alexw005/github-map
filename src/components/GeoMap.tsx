import React from "react";
import { MapContainer, GeoJSON } from "react-leaflet";
import { Country, CountryProperties } from "@/lib/helper/loadCountryTask";
import "leaflet/dist/leaflet.css";
// import "./CovidMap.css";

const GeoMap = ({ countries }: { countries: Country[] }) => {

    const mapStyle = {
        fillColor: "white",
        weight: 2,
        color: "grey",
        fillOpacity: 1,
    };

    const onEachCountry = (country: Country, layer: any) => {
        layer.options.fillColor = country.properties.color;
        const name = country.properties.ADMIN;
        const confirmedText = country.properties.confirmedText;
        layer.bindPopup(`${name} ${confirmedText}`);
    };
    const countriesGeoJSON = {
        type: "FeatureCollection" as const,
        features: countries,
    }
    return (
        <MapContainer style={{ height: "90vh" }} zoom={5} center={[20, 60]}>
            <GeoJSON
                style={mapStyle}
                data={countriesGeoJSON}
                onEachFeature={onEachCountry}
            />
        </MapContainer>
    );
};

export default GeoMap;