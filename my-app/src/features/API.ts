import { baseQuery } from "../redux/api/baseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const AllAPIs = createApi({
  reducerPath: "AllAPIs",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    Allcontry: builder.query({
        query: () => `v3.1/all`,
      }),
      fliterbyname: builder.query({
        query: (name) => `v3.1/name/${name}`,
      }),
      fliterbyregion: builder.query({
        query: (region) => `v3.1/region/${region}`,
      }),
      fliterbylanguage : builder.query({
        query: (language) => `v3.1/lang/${language}`,
      }),
      Allcontrysec: builder.query({
        query: () => `v3.1/all`,
      }),
      fliterbycode: builder.query({
        query: (code) => `v3.1/alpha/${code}`,
      }),
  }),
});
export const {
    useAllcontryQuery,
    useLazyFliterbynameQuery,
    useLazyFliterbylanguageQuery,
    useLazyFliterbyregionQuery,
    useLazyAllcontrysecQuery,
    useLazyFliterbycodeQuery,
  endpoints,
} = AllAPIs;
