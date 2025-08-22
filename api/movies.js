// This is the server-side code that will run on Vercel

// In api/movies.js

export default async function handler(request, response) {
  // --- Start of Fix ---
  // Get the host (e.g., 'your-project.vercel.app') from the request headers.
  const host = request.headers.host;
  
  // Create a full URL object by combining the host with the relative path.
  const fullUrl = new URL(request.url, `https://${host}`);
  
  // Now, safely get search parameters from the full URL.
  const { searchParams } = fullUrl;
  const query = searchParams.get('query');
  // --- End of Fix ---

  const API_KEY = process.env.TMDB_API_KEY;

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
      return response.status(apiResponse.status).json({ message: 'Failed to fetch from TMDB' });
    }
    
    const data = await apiResponse.json();
    return response.status(200).json(data);

  } catch (error) {
    console.error('❌ Error in API route:', error);
    return response.status(500).json({ message: 'Internal Server Error' });
  }
}



