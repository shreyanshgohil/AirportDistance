import React, { useId, useState } from "react";
import { fetchData } from "../utils/helper";

// Single input value handling
const AirportInput = (props) => {
  // INITS
  const { labelTitle, onAirportData } = props;
  const airPortId = useId();
  const [airportData, setAirportData] = useState({
    isActive: false,
    inputValue: "",
    suggestedAirports: {},
  });

  // State management and api calling For airport
  const airportChageHandler = async (event) => {
    const value = event.target.value;
    const data = await fetchData(
      `http://api.geonames.org/search?q=${encodeURI(
        value
      )}&username=beastridervv&type=json&fcodeName=airport`
    );

    onAirportData({
      ...airportData,
      suggestedAirports: data,
      inputValue: value,
    });
    setAirportData((prevState) => {
      return {
        ...prevState,
        suggestedAirports: data,
        inputValue: value,
      };
    });
  };

  //   JSX
  return (
    <div className="airport-input">
      <div className="airport-input-wrapper">
        <div className="airport-wrapper">
          <label htmlFor={airPortId}>{labelTitle}</label>
          <input
            type="text"
            name="airportFirst"
            id={airPortId}
            onChange={airportChageHandler}
            onFocus={() => {
              onAirportData({ ...airportData, isActive: true });
              setAirportData((prevState) => {
                return {
                  ...prevState,
                  isActive: true,
                };
              });
            }}
            onBlur={() => {
              onAirportData({ ...airportData, isActive: false });
              setAirportData((prevState) => {
                return {
                  ...prevState,
                  isActive: false,
                };
              });
            }}
            value={airportData.inputValue}
          />
        </div>
      </div>
    </div>
  );
};

export default AirportInput;