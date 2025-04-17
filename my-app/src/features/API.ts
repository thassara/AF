import { baseQuery } from "../redux/api/baseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const AllAPIs = createApi({
  reducerPath: "AllAPIs",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    Allcontry: builder.query({
        query: () => `v3.1/all`,
      }),
  }),
});
export const {
    useAllcontryQuery,
  endpoints,
} = AllAPIs;
