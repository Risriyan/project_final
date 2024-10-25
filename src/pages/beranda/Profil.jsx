import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Define or import the Card component
const Card = ({ title, overview, image, rating, onDelete }) => (
  <div className="bg-gray-800 rounded-lg shadow-md p-4 w-60">
    <img src={image} alt={title} className="w-full h-auto rounded-lg mb-3" />
    <h3 className="text-lg font-bold mb-1">{title}</h3>
    <p className="text-sm text-gray-400 mb-2">{overview.slice(0, 100)}...</p>
    <span className="bg-sky-500 text-sm px-3 py-1 rounded-lg">
      {rating} / 10
    </span>
    {onDelete && (
      <button
        className="ml-auto text-sm px-3 py-1 mt-2 rounded-lg bg-red-500"
        onClick={(e) => {
          e.preventDefault();
          onDelete();
        }}
      >
        Delete
      </button>
    )}
  </div>
);

const Profil = () => {
  const [MyRating, setMyRating] = useState([]); // User's rated movies
  const [favorites, setFavorites] = useState([]); // User's favorite movies
  const [profileData, setProfileData] = useState({
    username: "rakasaja",
    memberSince: "October 2024",
    avgMovieScore: 55, // Example score
    avgTVScore: 0, // Example TV score
    totalEdits: 0,
    totalRatings: 6, // Example number of ratings
    genres: [
      { name: "Horror", percentage: 25 },
      { name: "Action", percentage: 20 },
      { name: "Family", percentage: 30 },
      { name: "Drama", percentage: 25 },
    ],
  });

  const penilaian = [
    { rating: 9, jumlah: 2 },
    { rating: 8, jumlah: 4 },
    { rating: 7, jumlah: 3 },
  ];

  const fetchFavorites = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/account/21559322/favorite/movies",
        {
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMTA4NzEwNWIyMzViNGUyMjVhNzg4ODI5ZmE0YzE2MCIsIm5iZiI6MTcyOTMwODkzMy45OTI0NzUsInN1YiI6IjY3MDQ4YjI5MmFlN2ViOTA4NGJmZmI4ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Xi1e4bcsB74_3sUCrIfvYv4sQCwpkkbMmryjA87z6zQ", // Ganti dengan token yang valid

          },
        }
      );
      setFavorites(response.data.results);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  }, []);

  const fetchMyRating = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/account/21559322/rated/movies",
        {
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMTA4NzEwNWIyMzViNGUyMjVhNzg4ODI5ZmE0YzE2MCIsIm5iZiI6MTcyOTQxMjcxOC41NDA5Mywic3ViIjoiNjcwNDhiMjkyYWU3ZWI5MDg0YmZmYjhmIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.Kxkc22afQFcXNrFRLwnWUlWAwKvMreCazj_WrEfRKnY", // Replace with a valid token
          },
        }
      );
      setMyRating(response.data.results);
    } catch (error) {
      console.error("Error fetching ratings:", error);
    }
  }, []);

  const DeleteRating = async (id) => {
    try {
      const response = await axios.delete(
        `https://api.themoviedb.org/3/movie/${id}/rating`,
        {
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMTA4NzEwNWIyMzViNGUyMjVhNzg4ODI5ZmE0YzE2MCIsIm5iZiI6MTcyOTQxMjcxOC41NDA5Mywic3ViIjoiNjcwNDhiMjkyYWU3ZWI5MDg0YmZmYjhmIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.Kxkc22afQFcXNrFRLwnWUlWAwKvMreCazj_WrEfRKnY", // Replace with a valid token
          },
        }
      );

      if (response.data.status_code === 13) {
        alert("Berhasil dihapus dari rating");
        fetchMyRating();
      }
    } catch (error) {
      console.error("Error deleting rating:", error);
    }
  };

  useEffect(() => {
    fetchMyRating();
    fetchFavorites();
  }, [fetchFavorites, fetchMyRating]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-5 pt-24">
      {/* Header Profil */}
      <div className="bg-sky-500 p-5 flex justify-between items-center rounded-lg shadow-md">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gray-600 text-white rounded-full flex items-center justify-center text-3xl">
            R
          </div>
          <div>
            <h1 className="text-2xl font-bold">{profileData.username}</h1>
            <p className="text-sm">Anggota sejak {profileData.memberSince}</p>
          </div>
        </div>
        <div className="flex space-x-8">
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold">{profileData.avgMovieScore}%</span>
            <p className="text-sm">Skor Rata-Rata Film</p>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold">{profileData.avgTVScore}%</span>
            <p className="text-sm">Skor Rata-Rata TV</p>
          </div>
        </div>
      </div>

      {/* Bagian Statistik */}
      <div className="bg-gray-800 p-5 rounded-lg mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <h2 className="text-lg font-semibold">Statistik</h2>
          <p>Total Suntingan: <span className="font-bold">{profileData.totalEdits}</span></p>
          <p>Total Penilaian: <span className="font-bold">{profileData.totalRatings}</span></p>
        </div>

        {/* Overview Penilaian */}
        <div>
          <h2 className="text-lg font-semibold">Ikhtisar Penilaian</h2>
          <div className="space-y-2 mt-3">
            {penilaian.map((rating) => (
              <div key={rating.rating} className="flex items-center">
                <span className="w-10 text-sm">{rating.rating}</span>
                <div className="bg-gray-600 h-4 rounded-lg flex-1 mr-2">
                  <div
                    className="bg-sky-500 h-4 rounded-lg"
                    style={{ width: `${rating.jumlah * 10}%` }}
                  />
                </div>
                <span className="text-sm">{rating.jumlah}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bagian Genre yang Paling Banyak Ditonton */}
      <div className="bg-gray-800 p-5 rounded-lg mt-5">
        <h2 className="text-lg font-semibold">Genre yang Paling Banyak Ditonton</h2>
        <div className="mt-3 flex space-x-4">
          {profileData.genres.map((g) => (
            <div key={g.name} className="flex flex-col items-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-sm bg-gray-600"
                style={{ background: `conic-gradient(green ${g.percentage}%, gray ${100 - g.percentage}%)` }}
              >
                {g.percentage}%
              </div>
              <span className="text-sm mt-2">{g.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bagian Daftar Rating Film */}
      <div className="p-5">
        <h2 className="text-lg font-semibold mb-3">Rating Saya</h2>
        <div className="space-y-4">
          {MyRating.map((movie) => (
            <div key={movie.id} className="flex bg-gray-800 p-4 rounded-lg shadow-md">
              {/* Poster Film */}
              <div className="w-1/6">
                <img
                  src={"https://image.tmdb.org/t/p/original" + movie.poster_path}
                  alt={movie.title}
                  className="w-full h-auto rounded-lg"
                />
              </div>

              {/* Detail Film */}
              <div className="flex flex-col justify-between ml-4">
                <h3 className="text-lg font-bold">{movie.title}</h3>
                <p className="text-sm text-gray-400">{movie.overview.slice(0, 100)}...</p>
                <div className="flex items-center mt-2">
                  <span className="bg-cyan-500 text-sm px-3 py-1 rounded-lg">
                    {movie.vote_average} / 10
                  </span>
                  <button
                    className="ml-auto text-sm px-3 py-1 rounded-lg bg-red-500"
                    onClick={() => DeleteRating(movie.id)}
                  >
                    Delete Rating
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bagian Film Favorit */}
      <h2 className="text-lg font-semibold mb-3">Favorite saya</h2>
      <div className="Card flex w-full overflow-x-auto gap-6">
        {favorites?.map((item, index) => (
            <Link to={`/Detail/${item.id}`} key={index} className="w-60"> 
            {/* Bungkus seluruh Card dengan Link */}
            <Card
                title={item.title}
                overview={item.overview} 
                image={
                item.poster_path
                    ? "https://image.tmdb.org/t/p/w500" + item.poster_path
                    : "https://via.placeholder.com/500x750" // Placeholder jika tidak ada gambar
                }
                rating={item.vote_average}
            />
            </Link>
        ))}
        </div>
      </div>
  );
};

export default Profil;
