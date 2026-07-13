export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  const query = req.query.q?.trim();

  if (!query) {
    return res.status(400).json({
      error: "Movie name required"
    });
  }

  try {
    const apiKey = process.env.TMDB_API_KEY;

    // Search movie
    const searchRes = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`
    );

    const searchData = await searchRes.json();

    if (!searchData.results?.length) {
      return res.status(404).json({
        error: "Movie not found"
      });
    }

    const movie = searchData.results[0];

    // Details
    const detailsRes = await fetch(
      `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}`
    );

    const details = await detailsRes.json();

    // Credits
    const creditsRes = await fetch(
      `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${apiKey}`
    );

    const credits = await creditsRes.json();

    const videosRes = await fetch(
      `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${apiKey}`
    );

    const videos = await videosRes.json();

    const similarRes = await fetch(
      `https://api.themoviedb.org/3/movie/${movie.id}/similar?api_key=${apiKey}`
    );

    const similarData = await similarRes.json();

    const similarMovies =
      similarData.results
        ?.slice(0, 5)
        .map(movie => movie.title) || [];

    const trailer =
      videos.results?.find(
        v =>
          v.site === "YouTube" &&
          v.type === "Trailer"
      ) || null;

    const director =
      credits.crew?.find(person => person.job === "Director")
        ?.name || "Unknown";

    const cast =
      credits.cast
        ?.slice(0, 3)
        .map(actor => actor.name) || [];

    return res.status(200).json({
      id: movie.id,

      title: movie.title,

      similarMovies,

      trailerKey: trailer?.key || null,

      poster: movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : null,

      rating: movie.vote_average,

      year: movie.release_date
        ? movie.release_date.split("-")[0]
        : "N/A",

      overview: details.overview,

      runtime: details.runtime,

      genres: details.genres?.map(g => g.name),

      director,

      cast
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Failed to fetch movie data"
    });
  }
}