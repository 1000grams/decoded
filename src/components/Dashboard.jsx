useEffect(() => {
  const hash = window.location.hash;
  const params = new URLSearchParams(hash.substring(1)); // skip '#'
  const token = params.get("access_token");

  if (token) {
    localStorage.setItem("authToken", token);
  }
}, []);