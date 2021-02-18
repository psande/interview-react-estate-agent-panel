/**
 * Utility function to wrap api fetch calls.
 * If 'id' is received, we update the listing instead of fetching.
 */
const FetchApi = async (id = false, expired = true) => {
  let response;
  const domain = window.location.hostname;

  if (!id) {
    response = await fetch('//' + domain + ':3001/listings');
  } else {
    response = await fetch('//' + domain + ':3001/listings/' + id, {
      method: 'PATCH',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({expired})
    });
  }

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  } else {
    return response.json();
  }
}

export default FetchApi;