import { Country } from "@/lib/helper/loadCountryTask";
import "leaflet/dist/leaflet.css";
import { useCallback, useEffect, useState } from "react";
import { GeoJSON, MapContainer, TileLayer } from "react-leaflet";
// import "./CovidMap.css";

const GeoMap = ({ countries }: { countries: Country[]; }) => {
    const mapStyle = {
        fillColor: "white",
        weight: 2,
        color: "grey",
        fillOpacity: 1,
    };

    const onEachCountry = (country: Country, layer: any) => {
        layer.options.fillColor = country.properties.color;
        layer.bindPopup(`${country.properties.ADMIN} ${country.properties.confirmedText}`);
    };

    const countriesGeoJSON = {
        type: "FeatureCollection" as const,
        features: countries,
    };

    return (
        <MapContainer
            style={{ height: "90vh" }}
            zoom={5}
            center={[20, 70]}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <GeoJSON style={mapStyle} data={countriesGeoJSON} onEachFeature={onEachCountry} />
        </MapContainer>
    );
};

export default GeoMap;
