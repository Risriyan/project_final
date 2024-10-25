import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Card from '../components/Card';

const MyRating = () => {
  const [MyRating, setMyRating] = useState([]);

  const fetchMyRating = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/account/21559322/rated/movies`, // Ganti {account_id} dengan ID akun yang benar
        {
          headers: {
            accept: "application/json",
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMTA4NzEwNWIyMzViNGUyMjVhNzg4ODI5ZmE0YzE2MCIsIm5iZiI6MTcyOTQxMjcxOC41NDA5Mywic3ViIjoiNjcwNDhiMjkyYWU3ZWI5MDg0YmZmYjhmIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.Kxkc22afQFcXNrFRLwnWUlWAwKvMreCazj_WrEfRKnY', // Ganti dengan token yang valid
          },
        }
      );
      setMyRating(response.data.results);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  useEffect(() => {
    fetchMyRating();
  }, []);

  return (
    <div>
      <h2>My Ratting</h2>
      <ul>
      <div className="Card flex w-full overflow-x-auto gap-6">
        {MyRating?.map((item, index) => (
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

export default MyRating;