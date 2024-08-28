"use client";
import { useEffect, useState } from "react";

import LoadCountryTask, { Country } from "@/lib/helper/loadCountryTask";
import legendItems from "@/lib/legend/legendItems";
import GeoMap from "./GeoMap";
import Legend from "./Legend";
import SearchTextInput from "./SearchTextInput";
import dynamic from "next/dynamic";
const DynamicGeoMap = dynamic(() => import("./GeoMap"), {
  ssr: false,
})
const GithubMap = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const legendItemsReverse = [...legendItems].reverse();
  const [searchText, setSearchText] = useState<string>("");
  const [searchResult, setSearchResult] = useState<Country | null>(null);
  const loadData = (s: string) => {
    const loadCountriesTask = new LoadCountryTask();
    loadCountriesTask.loadGithub(s, (countries) => setCountries(countries));
  };
  useEffect(() => {
    loadData(searchText);
  }, [searchText, setSearchText, loadData]);

  const handleSearch = (v: string) => {
    setSearchText(v);
  }
  return (
    <div>
      {searchText.trim() === '' || countries.length === 0 ? (
        <>
          <SearchTextInput onSearch={handleSearch} />
        </>
      ) : (
        <div>
          <DynamicGeoMap countries={countries} />
          <Legend legendItems={legendItemsReverse} />
        </div>
      )}
    </div>
  );
};

export default GithubMap;
