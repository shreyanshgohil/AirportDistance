import React, { useState } from "react";
import { getDistanceFromLatLonInKm } from "../utils/helper";
import ErrorMessage from "./ErrorMessage";

// Handling the Distance Calculation
const FindDistanceButton = (props) => {
  // Inits
  const { airportOneData, airportTwoData } = props;
  const [showErrorMessage, setErrorMessage] = useState(false);
  const [airportDistance, setAirportDistance] = useState(0);
  //   Logic for calculate Distance between two airports
  const calculateDistanceHandler = () => {
    const firstAirport = airportOneData.suggestedAirports.geonames.find(
      (singleAirportData) =>
        singleAirportData.name === airportOneData.inputValue
    );
    const secondAirport = airportTwoData.suggestedAirports.geonames.find(
      (singleAirportData) =>
        singleAirportData.name === airportTwoData.inputValue
    );
    if (firstAirport && secondAirport) {
      const distance = getDistanceFromLatLonInKm(
        airportOneData.suggestedAirports.geonames[0].lat,
        airportOneData.suggestedAirports.geonames[0].lng,
        secondAirport.lat,
        secondAirport.lng
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
        <ErrorMessage>Something went wrong</ErrorMessage>
      ) : (
        airportDistance > 0 && <h3>{airportDistance}</h3>
      )}
    </div>
  );
};

export default FindDistanceButton;
