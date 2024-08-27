"use client"
import React, { useState, useEffect } from "react";

import Loading from "./Loading";
import GeoMap from "./GeoMap";
import LoadCountryTask, { Country } from "@/lib/helper/loadCountryTask";
import legendItems from "@/lib/legend/legendItems";
import Legend from "./Legend";

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

    return (
        <div>
            {countries.length === 0 ? (
                <Loading />
            ) : (
                <div>
                    <GeoMap countries={countries} />
                    <Legend legendItems={legendItemsReverse} />
                </div>
            )}
        </div>
    );
};

export default GithubMap;