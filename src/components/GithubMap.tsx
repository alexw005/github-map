"use client";
import { useCallback, useEffect, useState } from "react";

import GeoMap from "./GeoMap";
import SearchTextInput from "./SearchTextInput";
import { useSearchParams } from "next/navigation";
import Loading from "./Loading";
import useAxios from "@/lib/helper/useAxios";
import { API_BASE_URL } from "@/lib/helper/constant";

const GithubMap = () => {
  const searchParams = useSearchParams()
  const { data: optionList, loading: loadingOption, refetch: fetchOptions } = useAxios(`${API_BASE_URL}/list/countries`);

  const [searchText, setSearchText] = useState<string>('');
  const search = searchParams.get('search')
  if (search && search !== searchText) {
    setSearchText(search)
  }

  const handleSearch = (v: string) => {
    setSearchText(v);
  }
  if (loadingOption) {
    return <Loading />;
  }
  return (
    <div>
      {searchText.trim() === '' ? <SearchTextInput onSearch={handleSearch} description="Search country for the total number of github users" options={optionList} />
        : (
          <div>
            <GeoMap searchText={searchText} optionList={optionList} />
          </div>
        )}
    </div>
  );
};

export default GithubMap;
