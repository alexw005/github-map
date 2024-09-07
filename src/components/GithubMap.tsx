"use client";
import { useCallback, useEffect, useState } from "react";

import LoadCountryTask, { Feature } from "@/lib/helper/loadCountryTask";
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
      {searchText.trim() === '' ? <SearchTextInput onSearch={handleSearch} description="Search contry for the total number of github users" />
        : (
          <div>
            <GeoMap searchText={searchText} />
          </div>
        )}
    </div>
  );
};

export default GithubMap;
