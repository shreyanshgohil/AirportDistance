const ErrorMessage = ({ children }) => {
    // JSX code
  return (
    <div className="error-message">
      <div className="error-message-wrapper">
        <h3>{children}</h3>
      </div>
    </div>
  );
};

export default ErrorMessage;
