export default async function handler(request, response) {
  const host = request.headers.host;
  
  const fullUrl = new URL(request.url, `https://${host}`);
  
  const { searchParams } = fullUrl;
  const query = searchParams.get('query');

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




