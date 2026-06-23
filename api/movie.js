export default async function handler(req, res) {

  // Allow only GET requests
  if (req.method !== "GET") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  const query = req.query.q?.trim();

  // Validate query exists
  if (!query) {
    return res.status(400).json({
      error: "Movie name required"
    });
  }

  // Prevent abuse / extremely long requests
  if (query.length > 100) {
    return res.status(400).json({
      error: "Movie name too long"
    });
  }

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
      return res.status(response.status).json({
        error: "TMDB request failed"
      });
    }

    const data = await response.json();

    return res.status(200).json(data);

  } catch (error) {
    console.error("TMDB Error:", error);

    return res.status(500).json({
      error: "Failed to fetch movie data"
    });
  }
}