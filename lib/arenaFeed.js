const getArenaFeed = async (bearerToken, limit = 50) => {
  if (!bearerToken) {
    throw new Error("Bearer token is required");
  }

  const url = new URL("https://api.are.na/v3/me/feed");
  url.searchParams.set("limit", limit);

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch Are.na feed: ${error.message}`, {
      cause: error,
    });
  }
};

export default getArenaFeed;
