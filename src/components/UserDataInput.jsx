import { useState } from "react";
import FindDistanceButton from "./FindDistanceButton";
import AirportInput from "./AirportInput";

// Handling the user-inputs
const UserDataInput = () => {
  // Inits
  const [airportOneData, setAirportOneData] = useState({});
  const [airportTwoData, setAirportTwoData] = useState({});

  // Fuction for get the data of child componentAioport one
  const airportOneDataHandler = (data) => {
    setAirportOneData(data);
  };

  // Fuction for get the data of child componentAioport Two
  const airportTwoDataHandler = (data) => {
    setAirportTwoData(data);
  };

  // JSX code
  return (
    <div className="user-data-input">
      <div className="user-data-input-wrapper">
        <div className="airport-wrapper">
          <AirportInput
            onAirportData={airportOneDataHandler}
            labelTitle="Airport One"
          />
        </div>
        <div className="airport-wrapper">
          <AirportInput
            onAirportData={airportTwoDataHandler}
            labelTitle="Airport Two"
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
