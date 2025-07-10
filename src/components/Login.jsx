const redirectToCognito = () => {
  window.location.href =
    "https://decodedmusic.auth.eu-central-1.amazoncognito.com/login?response_type=token&client_id=5pb29tja8gkqm3jb43oimd5qjt&redirect_uri=https://decodedmusic.com/dashboard";
};

return (
  <div className="login-container">
    <button className="sign-in-button" onClick={redirectToCognito}>
      Sign In with Cognito
    </button>
  </div>
);