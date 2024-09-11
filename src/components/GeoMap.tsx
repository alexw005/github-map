'use client';
import "leaflet/dist/leaflet.css";
import { GeoJSON, MapContainer, Marker, TileLayer } from "react-leaflet";
import countries from "../lib\/geoJson/countries.json"
import { GeoJsonObject } from 'geojson';
import { useEffect, useRef, useState } from "react";
import useAxios from "@/lib/helper/useAxios";
import Loading from "./Loading";
import { useRouter } from "next/navigation";
import L, { LatLngExpression } from "leaflet";
import { API_BASE_URL } from "@/lib/helper/constant";
import legendItems from "@/lib/legend/legendItems";
import SearchTextInput from "./SearchTextInput";
import { Feature } from "@/lib/helper/utils";

const GeoMap = ({ searchText, optionList }: { searchText?: string, optionList: string[] }) => {
    const icon = L.icon({ iconUrl: "/images/marker-icon.png" });
    const router = useRouter();
    const [markers, setMarkers] = useState<LatLngExpression>();
    const [center, setCenter] = useState<LatLngExpression>([0, 70]);
    // const [matchedFeature, setMatchedFeature] = useState<Feature | undefined>();
    const [geoData, setGeoData] = useState<GeoJsonObject & { features: Feature[] }>(countries as any);
    const [searchValue, setSearhValue] = useState<string | null>(searchText || '');
    const mapStyle = {
        weight: 2,
        color: "#8f8c8c",
        fillOpacity: 0.2,
    };
    const { data, loading, error, refetch: fetchCount } = useAxios(`${API_BASE_URL}/search?country=${searchValue}`);

    const prevData = useRef(data);
    useEffect(() => {
        if (data) {
            fetchCount();
            // prevData.current = data;
        }
    }, [searchValue]);

    useEffect(() => {
        const matchedFeature = geoData.features?.find((f) => f.properties.ADMIN.toLowerCase() === searchValue?.toLowerCase());

        if (!loading && data && data.count > 0 && matchedFeature) {
            const legendItem = legendItems.find((item: any) => item.isFor(data.count));

            // prevData.current = data;
            matchedFeature.properties.totalCountText = String(data.count);
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

    }
    if (loading) return <Loading />;

    return (
        <>
            {error && <p className="text-red-600">`Error: ${error.message}, please try again`</p>}
            <SearchTextInput onSearch={handleSearch} options={optionList} isSideBar={true} />
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
