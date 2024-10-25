import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DetailView from './DetailView';

const Detail = () => {
  const { id } = useParams(); // Mendapatkan ID dari URL
  const [detail, setDetail] = useState({});

  // Fungsi untuk mengambil detail film dari API
  const ambilDetail = useCallback(async () => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMTA4NzEwNWIyMzViNGUyMjVhNzg4ODI5ZmE0YzE2MCIsIm5iZiI6MTcyOTMwODkzMy45OTI0NzUsInN1YiI6IjY3MDQ4YjI5MmFlN2ViOTA4NGJmZmI4ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Xi1e4bcsB74_3sUCrIfvYv4sQCwpkkbMmryjA87z6zQ'
        }
      });
      setDetail(response.data); // Simpan data ke state
      console.log(response.data); // Debugging: menampilkan data di console
    } catch (error) {
      console.error("Error fetching the movie details:", error); // Menangani error
    }
  }, [id]);

  // Fungsi untuk menandai film sebagai favorit
  const handleFavorite = async () => {
    try {
      const response = await axios.post(
        'https://api.themoviedb.org/3/account/21559374/favorite',
        { media_type: "movie", media_id: id, favorite: true }, // Toggle status favorit
        {
          headers: {
            accept: "application/json",
            "content-type": "application/json",
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMTA4NzEwNWIyMzViNGUyMjVhNzg4ODI5ZmE0YzE2MCIsIm5iZiI6MTcyOTMwODkzMy45OTI0NzUsInN1YiI6IjY3MDQ4YjI5MmFlN2ViOTA4NGJmZmI4ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Xi1e4bcsB74_3sUCrIfvYv4sQCwpkkbMmryjA87z6zQ',
          },
        }
      );
      if (response.data.status_code === 1) {
        alert("Film ditambahkan ke favorit");
      }
    } catch (error) {
      console.error("Error updating favorite status:", error);
    }
  };

  // Fungsi untuk memberikan rating
  const handleRating = async (rating) => {
    try {
      const response = await axios.post(
        `https://api.themoviedb.org/3/movie/${id}/rating`,
        { value: rating },
        {
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMTA4NzEwNWIyMzViNGUyMjVhNzg4ODI5ZmE0YzE2MCIsIm5iZiI6MTcyOTMwODkzMy45OTI0NzUsInN1YiI6IjY3MDQ4YjI5MmFlN2ViOTA4NGJmZmI4ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Xi1e4bcsB74_3sUCrIfvYv4sQCwpkkbMmryjA87z6zQ',
          }
        }
      );
      if (response.data.status_code === 1) {
        alert("Rating berhasil ditambahkan");
      }
    } catch (error) {
      console.error("Error adding rating:", error);
    }
  };

  // UseEffect untuk memanggil fungsi saat ID berubah
  useEffect(() => {
    ambilDetail();
    console.log("Fetching movie detail...");
  }, [ambilDetail]);

  // Render komponen DetailView dan berikan data detail sebagai prop
  return (
    <DetailView detail={detail} handleFavorite={handleFavorite} handleRating={handleRating} />
  );
};

export default Detail;
