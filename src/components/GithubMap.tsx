"use client";
import { useCallback, useEffect, useState } from "react";

import LoadCountryTask, { Country } from "@/lib/helper/loadCountryTask";
import GeoMap from "./GeoMap";
import SearchTextInput from "./SearchTextInput";
import { useSearchParams } from "next/navigation";
import Loading from "./Loading";

const GithubMap = () => {
  const searchParams = useSearchParams()
  const [countries, setCountries] = useState<Country[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const search = searchParams.get('search')
  if (search && search !== searchText) {
    setSearchText(search)
  }
  const loadData = useCallback((s: string) => {
    const loadCountriesTask = new LoadCountryTask();
    loadCountriesTask.loadGithub(s, (countries) => setCountries(countries));
  }, []);
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
          {searchText.trim() !== '' ? <Loading /> : <SearchTextInput onSearch={handleSearch} />}
        </>
      ) : (
        <div>
          <GeoMap countries={countries} />
        </div>
      )}
    </div>
  );
};

export default GithubMap;
