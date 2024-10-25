import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Card from '../components/Card';

const Favorite = () => {
  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/account/21559374/favorite/movies?language=en-US&page=1&sort_by=created_at.asc`, // Ganti {account_id} dengan ID akun yang benar
        {
          headers: {
            accept: "application/json",
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMTA4NzEwNWIyMzViNGUyMjVhNzg4ODI5ZmE0YzE2MCIsIm5iZiI6MTcyOTMwODkzMy45OTI0NzUsInN1YiI6IjY3MDQ4YjI5MmFlN2ViOTA4NGJmZmI4ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Xi1e4bcsB74_3sUCrIfvYv4sQCwpkkbMmryjA87z6zQ', // Ganti dengan token yang valid
          },
        }
      );
      setFavorites(response.data.results);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <div>
      <h2>Film Favorit</h2>
      <ul>
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
      </ul>
    </div>
  );
};

export default Favorite;
