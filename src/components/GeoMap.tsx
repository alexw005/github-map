import { Country } from "@/lib/helper/loadCountryTask";
import "leaflet/dist/leaflet.css";
import { GeoJSON, MapContainer, TileLayer } from "react-leaflet";
import { useRouter } from "next/navigation";
import TopLeftSearchInput from "./SideSearchBar";
// import "./CovidMap.css";

const GeoMap = ({ countries }: { countries: Country[] }) => {
    const router = useRouter();
    const mapStyle = {
        fillColor: "grey",
        weight: 2,
        color: "grey",
        fillOpacity: 1,
    };
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
