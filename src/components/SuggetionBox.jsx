// Suggetion box handling
const SuggetionBox = (props) => {
  // Inits
  const { airportData, onSuggetion } = props;
  const selectedSuggetionHandler = (selectedSuggetion) => {
    onSuggetion(selectedSuggetion.name);
  };
  // JSX code
  return (
    <div className="suggetion-box">
      <div className="suggetion-box-wrapper">
        {airportData.suggestedAirports.geonames && (
          <div className="suggetions-wrapper">
            {airportData.suggestedAirports.geonames.map(
              (singleSuggetion, i) => (
                <p
                  onClick={() => selectedSuggetionHandler(singleSuggetion)}
                  key={i}
                >
                  {singleSuggetion.name}
                </p>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SuggetionBox;
