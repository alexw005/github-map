"use client"
import React, { useState, useEffect, useRef } from "react";

import Loading from "./Loading";
import GeoMap from "./GeoMap";
import LoadCountryTask, { Country } from "@/lib/helper/loadCountryTask";
import legendItems from "@/lib/legend/legendItems";
import Legend from "./Legend";
import SearchTextInput from "./SearchTextInput";
import { GeoJSONProps, TileLayer } from "react-leaflet";

const GithubMap = () => {

    const [countries, setCountries] = useState<Country[]
    >([]);
    const legendItemsReverse = [...legendItems].reverse();

    const load = () => {
        const loadCountriesTask = new LoadCountryTask();
        loadCountriesTask.load((countries) => setCountries(countries));
    };
    useEffect(() => {
        load();
    }, []);



    const [searchResult, setSearchResult] = useState<any | null>(null)

    const handleSearch = (searchText: string) => {
        const feature = countries.find((feature) =>
            feature.properties?.ADMIN
                ?.toLowerCase()
                .includes(searchText.toLowerCase())
        );

        if (feature) {
            setSearchResult(feature);
        } else {
            console.warn('Location not found');
        }
    };
    return (
        <div>
            {countries.length === 0 ? (
                <Loading />
            ) : (
                <div>
                    <SearchTextInput onSearch={handleSearch} />

                    <GeoMap countries={countries} />
                    <Legend legendItems={legendItemsReverse} />

                </div>
            )}
        </div>
    );
};

export default GithubMap;