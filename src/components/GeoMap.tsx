'use client';
import { Feature } from "@/lib/helper/loadCountryTask";
import "leaflet/dist/leaflet.css";
import { GeoJSON, MapContainer, TileLayer } from "react-leaflet";
import TopLeftSearchInput from "./SideSearchBar";
import countries from "../lib\/geoJson/countries.json"
import { GeoJsonObject } from 'geojson';


import { useEffect, useState } from "react";
import useAxios from "@/lib/helper/useAxios";
import Loading from "./Loading";
import useStableCallback from "@/lib/helper/useStableCallback";

import { useRouter } from "next/navigation";
// import "./CovidMap.css";

const GeoMap = ({ searchText }: { searchText?: string }) => {
    const router = useRouter();
    const [geoData, setGeoData] = useState<GeoJsonObject & { features: Feature[] }>(countries as any);
    const [searchValue, setSearhValue] = useState<string | null>(searchText || '');
    const mapStyle = {
        fillColor: "grey",
        weight: 2,
        color: "grey",
        fillOpacity: 0.5,
    };
    const { data, loading, error, refetch } = useAxios(`https://api.github.com/search/users?q=location:${searchValue}`);
    useEffect(() => {
        const matchedFeature = geoData.features?.find((f) => f.properties.ADMIN.toLowerCase() === searchValue?.toLowerCase());

        if (data && data.total_count > 0 && matchedFeature) {
            matchedFeature.properties.totalCountText = String(data.total_count);
            matchedFeature.properties.color = "red";
            setGeoData({ ...geoData, features: [...geoData.features.filter((f) => f.properties.ADMIN !== matchedFeature.properties.ADMIN), matchedFeature] });
        };
    }, [data, searchValue]);


    const onEachCountry = (country: Feature, layer: any) => {
        layer.options.fillColor = country.properties.color;
        layer.bindPopup(`${country.properties.ADMIN} ${country.properties.totalCountText}`);
        if (country.properties.totalCountText) layer.bindTooltip(country.properties.totalCountText, { permanent: true, direction: "center", className: " text-lg custom-tooltip" });
        layer.on({
            click: () => {
                if (!country.properties.totalCountText) handleSearch(country.properties.ADMIN)
                // Access the map instance using layer._map
                const map = layer._map;
                if (map) {
                    const bounds = layer.getBounds();
                    map.fitBounds(bounds);
                }
            },
        });
    };


    const handleSearch = (s: string): void => {
        console.log(s);
        router.push(`/?search=${s}`);
        setSearhValue(s)
        history.replaceState(null, "", `/?search=${s}`);
        window.location.reload();
    }
    if (loading) return <Loading />;
    if (error) {
        return <><div>Error: {error.message}
            <button onClick={refetch}>Retry</button></div></>
    }
    return (
        <>
            <TopLeftSearchInput onSearch={handleSearch} />
            <MapContainer
                key={searchValue}
                style={{ height: "90vh" }}
                zoom={3}
                center={[0, 70]}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <GeoJSON style={mapStyle} data={geoData} onEachFeature={onEachCountry} />
            </MapContainer>
        </>
    );
};

export default GeoMap;
