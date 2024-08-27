'use client'
import React, { useState, useEffect } from "react";

import Loading from "./Loading";
import GeoMap from "./GeoMap";
import LoadCountryTask, { Country } from "@/lib/helper/loadCountryTask";
// import Legend from "./Legend";
// import legendItems from "../entities/LegendItems";

const GithubMap = () => {
    const [countries, setCountries] = useState<Country[]
    >([]);
    const [isBrowser, setIsBrowser] = useState(false);



    // const legendItemsReverse = [...legendItems].reverse();

    const load = () => {
        console.log("load");
        const loadCountriesTask = new LoadCountryTask();
        loadCountriesTask.load((countries) => setCountries(countries));
    };
    useEffect(() => {
        load();
        // Check if the code is running in the browser
        setIsBrowser(typeof window !== "undefined");
    }, []);

    return (
        <div>
            {!isBrowser || countries.length === 0 ? (
                <Loading />
            ) : (
                <div>
                    <GeoMap countries={countries} />
                    {/* <Legend legendItems={legendItemsReverse} /> */}
                </div>
            )}
        </div>
    );
};

export default GithubMap;