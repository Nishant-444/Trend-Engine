// This is the server-side code that will run on Vercel

export default async function handler(request, response) {
   // Get the host from the request headers
  const host = request.headers.get('host');
  // Construct a full, valid URL
  const fullUrl = new URL(request.url, `https://${host}`);
  // Get the search query from the request URL (e.g., /api/movies?query=avatar)
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  // Your secret TMDB API key, stored safely on the server
  const API_KEY = process.env.TMDB_API_KEY;

  // Determine the endpoint based on whether a search query exists
  const endpoint = query
    ? `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}`
    : `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc`;

  const API_OPTIONS = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  try {
    const apiResponse = await fetch(endpoint, API_OPTIONS);
    if (!apiResponse.ok) {
      // If TMDB gives an error, pass it along
      return response.status(apiResponse.status).json({ message: 'Failed to fetch from TMDB' });
    }

    const data = await apiResponse.json();

    // Send the successful response back to your React app
    return response.status(200).json(data);

  } catch (error) {
    console.error('❌ Error in API route:', error);
    return response.status(500).json({ message: 'Internal Server Error' });
  }
}

