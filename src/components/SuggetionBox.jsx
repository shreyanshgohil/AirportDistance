import React from "react";

const SuggetionBox = (props) => {
  const { airportData } = props;
    
  return (
    <div className="suggetion-box">
      <div className="suggetion-box-wrapper">
        {airportData.suggestedAirports.geonames && (
          <div className="suggetions-wrapper">
            {airportData.suggestedAirports.geonames.map((singleSuggetion) => (
              <p>{singleSuggetion.name}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SuggetionBox;
