'use client';
import { Feature } from "@/lib/helper/loadCountryTask";
import "leaflet/dist/leaflet.css";
import { GeoJSON, MapContainer, TileLayer } from "react-leaflet";
import TopLeftSearchInput from "./SideSearchBar";
import countries from "../lib\/geoJson/countries.json"
import { GeoJsonObject } from 'geojson';


import { useEffect, useRef, useState } from "react";
import useAxios from "@/lib/helper/useAxios";
import Loading from "./Loading";
import useStableCallback from "@/lib/helper/useStableCallback";

import { useRouter } from "next/navigation";
import { LatLngExpression } from "leaflet";
import useForceUpdate from "@/lib/helper/useForceUpdate";
// import "./CovidMap.css";

const GeoMap = ({ searchText }: { searchText?: string }) => {
    const forceUpdate = useForceUpdate();
    const router = useRouter();
    const [center, setCenter] = useState<LatLngExpression>([0, 70]);
    // const [matchedFeature, setMatchedFeature] = useState<Feature | undefined>();
    const [geoData, setGeoData] = useState<GeoJsonObject & { features: Feature[] }>(countries as any);
    const [searchValue, setSearhValue] = useState<string | null>(searchText || '');
    const mapStyle = {
        fillColor: "grey",
        weight: 2,
        color: "grey",
        fillOpacity: 0.5,
    };
    const { data, loading, error, refetch } = useAxios(`https://api.github.com/search/users?q=location:${searchValue}`);
    const prevData = useRef(data);
    useEffect(() => {
        if (data)
            prevData.current = data;
    }, [searchValue]);

    useEffect(() => {
        const matchedFeature = geoData.features?.find((f) => f.properties.ADMIN.toLowerCase() === searchValue?.toLowerCase());
        // console.log(prevData.current, data, searchValue, matchedFeature);
        if (!loading && data && data.total_count > 0 && matchedFeature && prevData?.current !== data) {
            prevData.current = data;
            matchedFeature.properties.totalCountText = String(data.total_count);
            matchedFeature.properties.color = "red";
            setGeoData({ ...geoData, features: [...geoData.features.filter((f) => f.properties.ADMIN !== matchedFeature.properties.ADMIN), matchedFeature] });

        }
    }, [data, loading, searchValue]);

    const onEachCountry = (country: Feature, layer: any) => {
        layer.options.fillColor = country.properties.color;
        layer.bindPopup(`${country.properties.ADMIN} ${country.properties.totalCountText}`);
        if (country.properties.totalCountText) layer.bindTooltip(country.properties.totalCountText, { permanent: true, direction: "center", className: " text-lg custom-tooltip" });
        layer.on({
            click: () => {
                if (!country.properties.totalCountText) { handleSearch(country.properties.ADMIN); }
                // Access the map instance using layer._map
                const map = layer._map;
                if (map) {
                    const bounds = layer.getBounds();
                    setCenter(bounds.getCenter());
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
        // window.location.reload();

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
                key={center.toString()}
                style={{ height: "90vh" }}
                zoom={3}
                center={center}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <GeoJSON style={mapStyle} data={geoData} onEachFeature={onEachCountry} />
            </MapContainer>
        </>
    );
};

export default GeoMap;
