"use client";
import { useState } from "react";

import GeoMap from "./GeoMap";
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

  if (loadingOption) {
    return <Loading />;
  }
  return (
    <div>
      <GeoMap optionList={optionList} />
    </div>
  );
};

export default GithubMap;
