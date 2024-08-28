"use client";
import { useEffect, useState } from "react";

import LoadCountryTask, { Country } from "@/lib/helper/loadCountryTask";
import legendItems from "@/lib/legend/legendItems";
import GeoMap from "./GeoMap";
import Legend from "./Legend";
import Loading from "./Loading";
import SearchTextInput from "./SearchTextInput";

const GithubMap = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const legendItemsReverse = [...legendItems].reverse();

  const [searchResult, setSearchResult] = useState("");
  const loadData = (s: string) => {
    const loadCountriesTask = new LoadCountryTask();
    loadCountriesTask.loadGithub(s, (countries) => setCountries(countries));
  };
  useEffect(() => {
    loadData(searchResult);
  }, [searchResult, setSearchResult, loadData]);

  const handleSearch = (searchText: string) => {
    const feature = countries.find((feature) =>
      feature.properties.ADMIN?.toLowerCase().includes(searchText.toLowerCase()),
    );

    if (feature) {
      setSearchResult(feature.properties.ADMIN);
    } else {
      console.warn("Location not found");
    }
  };
  return (
    <div>
      {countries.length === 0 ? (
        <Loading />
      ) : (
        <div>
          <SearchTextInput onSearch={handleSearch} />
          <GeoMap countries={countries} searchResult={searchResult} />
          <Legend legendItems={legendItemsReverse} />
        </div>
      )}
    </div>
  );
};

export default GithubMap;
