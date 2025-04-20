import React from "react";
import { useSelector } from 'react-redux';
import { inputActions } from "../features/SearchSlice";

const Cn: React.FC = () => {
      const inputData = useSelector((state: any) => state?.inputs?.inputData ?? {});
      const searchData = inputData?.searchdata ?? ""; // string
      const filterData = inputData?.fliter ?? ""; // string

      console.log  ("inputData", searchData);
      console.log  ("inputData", filterData);
    return (
        <div>
            <h1>All Countrys</h1></div>)
}
export default Cn;