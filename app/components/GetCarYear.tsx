import OptionsSelector from "./OptionsSelector";

const GetCarYear = async () => {
  const data = await fetch(
    "https://www.fueleconomy.gov/ws/rest/vehicle/menu/year",
    { headers: { Accept: "application/json" } }
  );
  const response = await data.json();

  console.log(response);
  return <OptionsSelector options={response.menuItem} />;
};
export default GetCarYear;
