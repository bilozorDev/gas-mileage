"use client";

import { useEffect, useState } from "react";

const GetFullCarInfo = ({ id }) => {
  const [data, setData] = useState();
  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      const response = await fetch(
        `https://www.fueleconomy.gov/ws/rest/vehicle/${id}`,
        {
          headers: { Accept: "application/json" },
        }
      );
      const carInfo = await response.json();
      setData(carInfo);
    };
    fetchData();
  }, [id]);
  console.log(data);

  return (
    <>
      {data ? (
        <div>
          <h2>
            {data.make} {data.model}
          </h2>
          <ul>
            <li>Year: {data.year}</li>
            <li>City MPG: {data.city08}</li>
            <li>Highway MPG: {data.highway08}</li>
            <li>Combined MPG: {data.comb08}</li>
          </ul>
        </div>
      ) : null}
    </>
  );
};
export default GetFullCarInfo;
