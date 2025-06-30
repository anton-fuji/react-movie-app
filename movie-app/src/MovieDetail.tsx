import { useParams } from "react-router";
import { useEffect, useState } from "react";
import type { Movie,  MovieDetailJson} from "./types"
import { Link } from "react-router";
import {ArrowLeft, Clock, Star} from "lucide-react";
import "./MovieDetail.css"

function MovieDetail() {
    const {movieId} =  useParams();
    const [movie, setMovie] = useState<Movie | null>(null);

    const fetchMovieDetail = async() => {
        const resp = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}?language=ja`,
            {
                headers: {
                    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`
            },}
        );

        const data = await resp.json() as MovieDetailJson; 
        setMovie({
            id: data.id,
            original_title: data.original_title,
            overview: data.overview,
            poster_path: data.poster_path,
            year: Number(data.release_date.split("-")[0]),
            rating: data.vote_average,
            runtime: data.runtime,
            score: data.vote_count,
            genres: data.genres.map(
                (genre: { id: number; name: string }) => genre.name
            ),
          });
        };
    
    useEffect(() => {
        fetchMovieDetail();
    }, []);


    return (
<div className="movie-detail-root">
      {movie && (
        <>
          <div
            className="movie-detail-backdrop"
            style={{
              backgroundImage: `url(${
                "https://image.tmdb.org/t/p/w500" + movie.poster_path
              })`,
            }}
          />
          <div className="movie-detail-backdrop-gradient" />
          <div className="movie-detail-container">
            <Link to="/" className="movie-detail-backlink">
              <ArrowLeft className="movie-detail-backlink-icon" size={20} />
              Back to home
            </Link>
            <div className="movie-detail-grid">
              <div className="movie-detail-poster-wrap">
                <img
                  src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
                  alt={movie.original_title}
                  className="movie-detail-poster-img"
                />
              </div>
              <div className="movie-detail-details">
                <h1 className="movie-detail-title">{movie.original_title}</h1>
                <div className="movie-detail-badges">
                  <span className="badge-outline">{movie.year}</span>
                  <span className="badge-outline">PG-13</span>
                  <span className="badge-outline">
                    <Clock className="badge-icon-svg" size={14} />
                    {movie.runtime}分
                  </span>
                  <span className="badge-outline">
                    <Star className="badge-icon-svg badge-star" size={14} />
                    {(movie.rating / 10).toFixed(1)}
                  </span>
                </div>
                <p className="movie-detail-overview">{movie.overview}</p>
                <div className="movie-detail-genres">
                  {movie.genres.map((g) => (
                    <span key={g} className="badge-genre">
                      {g}
                    </span>
                  ))}
                </div>
                <div className="movie-detail-actions">
                  <button className="movie-detail-btn movie-detail-btn-primary">
                    ▶ Watch Now
                  </button>
                  <button className="movie-detail-btn">
                    ＋ Add to My List
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
    )
}
export default MovieDetail;