import LoadCountryTask, { Country } from "@/lib/helper/loadCountryTask";
import "leaflet/dist/leaflet.css";
import { GeoJSON, MapContainer, TileLayer } from "react-leaflet";
import { useRouter } from "next/navigation";
import TopLeftSearchInput from "./SideSearchBar";
import { useCallback, useEffect, useState } from "react";
// import "./CovidMap.css";

const GeoMap = ({ searchText }: { searchText?: string }) => {
    const [countries, setCountries] = useState<Country[]>([]);

    const [searchValue, setSearchText] = useState<string | null>(searchText || '');
    const router = useRouter();
    const mapStyle = {
        fillColor: "grey",
        weight: 2,
        color: "grey",
        fillOpacity: 1,
    };
    const loadData = useCallback((s: string) => {
        const loadCountriesTask = new LoadCountryTask();
        loadCountriesTask.loadGithub(s, (countries) => setCountries(countries));
    }, []);
    useEffect(() => {
        if (searchValue) loadData(searchValue);
    }, [searchValue, setSearchText, loadData]);

    const onEachCountry = (country: Country, layer: any) => {
        layer.options.fillColor = country.properties.color;
        layer.bindPopup(`${country.properties.ADMIN} ${country.properties.totalCountText}`);
        if (country.properties.totalCountText) layer.bindTooltip(country.properties.totalCountText, { permanent: true, direction: "center", className: " text-lg custom-tooltip" });
        layer.on({
            click: () => {
                // Access the map instance using layer._map
                const map = layer._map;
                if (map) {
                    const bounds = layer.getBounds();
                    map.fitBounds(bounds);
                }
            },
        });
    }

    const countriesGeoJSON = {
        type: "FeatureCollection" as const,
        features: countries,
    };

    const handleSearch = (searchText: string) => {
        console.log(searchText);
        router.push(`/?search=${searchText}`);
        history.replaceState(null, "", `/?search=${searchText}`);
        window.location.reload();
    }

    return (
        <>
            <TopLeftSearchInput onSearch={handleSearch} />
            <MapContainer
                style={{ height: "90vh" }}
                zoom={3}
                center={[0, 70]}
            >

                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <GeoJSON style={mapStyle} data={countriesGeoJSON} onEachFeature={onEachCountry} />
            </MapContainer>
        </>
    );
};

export default GeoMap;
