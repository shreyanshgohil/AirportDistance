import React, { useState } from "react";
import { getDistanceFromLatLonInKm } from "../utils/helper";
import ErrorMessage from "./ErrorMessage";
const FindDistanceButton = (props) => {
  // Inits
  const { airportOneData, airportTwoData } = props;
  const [showErrorMessage, setErrorMessage] = useState(false);
  const [airportDistance, setAirportDistance] = useState(0);
  //   Logic for calculate Distance between two airports

  const calculateDistanceHandler = () => {
    if (
      airportOneData.suggestedAirports.totalResultsCount === 1 &&
      airportTwoData.suggestedAirports.totalResultsCount === 1
    ) {
      const distance = getDistanceFromLatLonInKm(
        airportOneData.suggestedAirports.geonames[0].lat,
        airportOneData.suggestedAirports.geonames[0].lng,
        airportTwoData.suggestedAirports.geonames[0].lat,
        airportTwoData.suggestedAirports.geonames[0].lng
      );
      setAirportDistance(Math.round(distance));
      setErrorMessage(false);
    } else {
      setErrorMessage(true);
    }
  };

  //   JSX code
  return (
    <div className="Find-distance-button">
      <button onClick={calculateDistanceHandler}>Find Distance</button>
      {showErrorMessage ? (
        <ErrorMessage>
          Please select the One airport form suggesition box
        </ErrorMessage>
      ) : (
        airportDistance > 0 && <h3>{airportDistance}</h3>
      )}
    </div>
  );
};

export default FindDistanceButton;
