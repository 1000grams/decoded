const redirectToCognito = () => {
  window.location.href =
    "https://auth.decodedmusic.com/login?client_id=5pb29tja8gkqm3jb43oimd5qjt&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=https://decodedmusic.com/dashboard";
};

return (
  <div className="login-container">
    <button className="sign-in-button" onClick={redirectToCognito}>
      Sign In with Cognito
    </button>
  </div>
);