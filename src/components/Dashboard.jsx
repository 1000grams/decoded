useEffect(() => {
  const hash = window.location.hash;
  const idToken = new URLSearchParams(hash.substring(1)).get('id_token');

  if (idToken) {
    localStorage.setItem('cognito_id_token', idToken);

    fetch(`${process.env.REACT_APP_API_URL}/dashboard`, {
      headers: {
        Authorization: `Bearer ${idToken}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Dashboard data:', data);
      })
      .catch((error) => {
        console.error('Error fetching dashboard data:', error);
      });
  }
}, []);