"use client";
import { useCallback, useEffect, useState } from "react";

import LoadCountryTask, { Country } from "@/lib/helper/loadCountryTask";
import GeoMap from "./GeoMap";
import SearchTextInput from "./SearchTextInput";
import { useSearchParams } from "next/navigation";
import Loading from "./Loading";

const GithubMap = () => {
  const searchParams = useSearchParams()

  const [searchText, setSearchText] = useState<string>('');
  const search = searchParams.get('search')
  if (search && search !== searchText) {
    setSearchText(search)
  }


  const handleSearch = (v: string) => {
    setSearchText(v);
  }
  return (
    <div>
      {searchText.trim() === '' ? (
        <>
          {searchText.trim() !== '' ? <Loading /> : <SearchTextInput onSearch={handleSearch} />}
        </>
      ) : (
        <div>
          <GeoMap searchText={searchText} />
        </div>
      )}
    </div>
  );
};

export default GithubMap;
