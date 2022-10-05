import { useId, useState } from "react";
import FindDistanceButton from "./FindDistanceButton";

const UserDataInput = () => {
  // Inits
  const airPortId1 = useId();
  const airPortId2 = useId();
  const [airportOneData, setAirportOneData] = useState({
    isActive: false,
    inputValue: "",
    suggestedAirports: {},
  });
  const [airportTwoData, setAirportTwoData] = useState({
    isActive: false,
    inputValue: "",
    suggestedAirports: {},
  });

  // State management and api calling For airport one
  const airportOneChageHandler = async (event) => {
    const value = event.target.value;
    const response = await fetch(
      `http://api.geonames.org/search?q=${encodeURI(
        value
      )}&username=beastridervv&type=json&fcodeName=airport`
    );
    const data = await response.json();
    setAirportOneData((prevState) => {
      return {
        ...prevState,
        suggestedAirports: data,
        inputValue: value,
      };
    });
  };

  // State management and api calling For airport two
  const airportTwoChageHandler = async (event) => {
    const value = event.target.value;
    const response = await fetch(
      `http://api.geonames.org/search?q=${encodeURI(
        value
      )}&username=beastridervv&type=json&fcodeName=airport&maxRows=10`
    );
    const data = await response.json();
    setAirportTwoData((prevState) => {
      return {
        ...prevState,
        suggestedAirports: data,
        inputValue: value,
      };
    });
  };

  // JSX code
  return (
    <div className="user-data-input">
      <div className="user-data-input-wrapper">
        <div className="airport-wrapper">
          <label htmlFor={airPortId1}>Airport 1</label>
          <input
            type="text"
            name="airportFirst"
            id={airPortId1}
            onChange={airportOneChageHandler}
            onFocus={() =>
              setAirportOneData((prevState) => {
                return {
                  ...prevState,
                  isActive: true,
                };
              })
            }
            onBlur={() =>
              setAirportOneData((prevState) => {
                return {
                  ...prevState,
                  isActive: false,
                };
              })
            }
            value={airportOneData.inputValue}
          />
        </div>
        <div className="airport-wrapper">
          <label htmlFor={airPortId2}>Airport 2</label>
          <input
            type="text"
            name="airportSecond"
            id={airPortId2}
            onChange={airportTwoChageHandler}
            onFocus={() =>
              setAirportTwoData((prevState) => {
                return {
                  ...prevState,
                  isActive: true,
                };
              })
            }
            onBlur={() =>
              setAirportTwoData((prevState) => {
                return {
                  ...prevState,
                  isActive: false,
                };
              })
            }
            value={airportTwoData.inputValue}
          />
        </div>
        <div className="final-search-wrapper">
          <FindDistanceButton
            airportOneData={airportOneData}
            airportTwoData={airportTwoData}
          />
        </div>
      </div>
    </div>
  );
};

export default UserDataInput;
