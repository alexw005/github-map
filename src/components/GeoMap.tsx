'use client';
import { Feature } from "@/lib/helper/loadCountryTask";
import "leaflet/dist/leaflet.css";
import { GeoJSON, MapContainer, Marker, TileLayer } from "react-leaflet";
import TopLeftSearchInput from "./SideSearchBar";
import countries from "../lib\/geoJson/countries.json"
import { GeoJsonObject } from 'geojson';


import { useEffect, useRef, useState } from "react";
import useAxios from "@/lib/helper/useAxios";
import Loading from "./Loading";
import useStableCallback from "@/lib/helper/useStableCallback";

import { useRouter } from "next/navigation";
import L, { LatLngExpression } from "leaflet";
import useForceUpdate from "@/lib/helper/useForceUpdate";
import { API_BASE_URL } from "@/lib/helper/constant";
import legendItems from "@/lib/legend/legendItems";

const GeoMap = ({ searchText }: { searchText?: string }) => {
    const icon = L.icon({ iconUrl: "/images/marker-icon.png" });
    const router = useRouter();
    const [markers, setMarkers] = useState<LatLngExpression>();
    const [center, setCenter] = useState<LatLngExpression>([0, 70]);
    // const [matchedFeature, setMatchedFeature] = useState<Feature | undefined>();
    const [geoData, setGeoData] = useState<GeoJsonObject & { features: Feature[] }>(countries as any);
    const [searchValue, setSearhValue] = useState<string | null>(searchText || '');
    const mapStyle = {
        weight: 2,
        color: "#cccccc",
        fillOpacity: 0.2,
    };
    const { data, loading, error, refetch } = useAxios(`${API_BASE_URL}/search?country=${searchValue}`);
    const prevData = useRef(data);
    useEffect(() => {
        if (data) {
            refetch();
            prevData.current = data;
        }
    }, [searchValue]);

    useEffect(() => {
        const matchedFeature = geoData.features?.find((f) => f.properties.ADMIN.toLowerCase() === searchValue?.toLowerCase());

        if (!loading && data && data.total_count > 0 && matchedFeature && prevData?.current !== data) {
            const legendItem = legendItems.find((item: any) => item.isFor(data.total_count));

            prevData.current = data;
            matchedFeature.properties.totalCountText = String(data.total_count);
            matchedFeature.properties.color = legendItem != null ? legendItem.color : 'white';
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
                    setMarkers(bounds.getCenter());
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
            <TopLeftSearchInput onSearch={handleSearch} description="You may click to search" />
            <MapContainer
                key={center.toString()}
                style={{ height: "90vh" }}
                zoom={3}
                center={center}
            >
                {markers && <Marker position={markers} icon={icon} />}
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <GeoJSON style={mapStyle} data={geoData} onEachFeature={onEachCountry} />
            </MapContainer>
        </>
    );
};

export default GeoMap;
