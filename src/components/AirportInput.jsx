import React, { useId, useState } from "react";
import { fetchData } from "../utils/helper";
import SuggetionBox from "./SuggetionBox";
// Single input value handling
const AirportInput = (props) => {
  // INITS

  const { labelTitle, onAirportData } = props;
  const airPortId = useId();
  const [airportData, setAirportData] = useState({
    isActive: false,
    inputValue: "",
    suggestedAirports: {},
    suggestedValue: "",
  });

  // State management and api calling For airport
  const airportChageHandler = async (event) => {
    const value = event.target.value;
    const data = await fetchData(
      `http://api.geonames.org/search?q=${encodeURI(
        value
      )}&username=beastridervv&type=json&fcodeName=airport&maxRows=10`
    );
    setAirportData((prevState) => {
      return {
        ...prevState,
        suggestedAirports: data,
        inputValue: value,
        suggestedValue: "",
      };
    });

    onAirportData({
      ...airportData,
      suggestedAirports: data,
      inputValue: value,
    });
  };

  // select one suggetion handler
  const selectOneSuggetion = async (selectedSuggetion) => {
    const data = await fetchData(
      `http://api.geonames.org/search?q=${encodeURI(
        selectedSuggetion
      )}&username=beastridervv&type=json&fcodeName=airport&maxRows=10`
    );
    setAirportData((prevState) => {
      return {
        ...prevState,
        inputValue: selectedSuggetion,
        suggestedAirports: data,
        suggestedValue: selectedSuggetion,
      };
    });
    onAirportData({
      ...airportData,
      suggestedAirports: data,
      inputValue: selectedSuggetion,
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
            autoComplete="off"
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
        {airportData.suggestedValue.length === 0 && (
          <div className="suggetions">
            <SuggetionBox
              airportData={airportData}
              onSuggetion={selectOneSuggetion}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AirportInput;
