
import {fetchBaseQuery,

} from "@reduxjs/toolkit/query";


const baseQuery = fetchBaseQuery({
  baseUrl: "https://restcountries.com/", 
});




export { baseQuery };
