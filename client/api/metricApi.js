import axios from 'axios'

const API_URL = import.meta.env.VITE_MOVIE_METRIC_API_URL

export const incrementMetric = async (searchTerm, movie) => {
  try {
    await axios.post(`${API_URL}/increment`, {
      movieId: movie.id,
      searchTerm,
      posterUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
    })
  } catch (error) {
    console.log(error)
  }
}

export const getTrendingMovies = async () => {
  try {
    const response = await axios.get(`${API_URL}/get/trending`)
    console.log(response)
    console.log(response.data.metrics[0])
    return response.data.metrics
  } catch (error) {
    console.log(error)
  }
}
