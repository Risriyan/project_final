import React, { useState, useEffect } from "react";
import Card from "../../components/Card";
import { Link } from 'react-router-dom';

const BerandaView = ({ movies, topRated, Comingson, NowPlaying }) => {
  const [randomMovie, setRandomMovie] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    if (movies.length > 0) {
      const random = Math.floor(Math.random() * movies.length);
      setRandomMovie(movies[random]);
      
      // Mengambil video dari TMDB API untuk film acak yang dipilih
      const apiKey = '21087105b235b4e225a788829fa4c160'; // Ganti dengan API key Anda
      const movieId = movies[random].id;

      async function fetchVideo() {
        try {
          const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`);
          const data = await response.json();
          if (data.results && data.results.length > 0) {
            const randomVideo = data.results[Math.floor(Math.random() * data.results.length)];
            setVideoUrl(`https://www.youtube.com/embed/${randomVideo.key}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&modestbranding=1&loop=1&playlist=${randomVideo.key}`);
          }
        } catch (error) {
          console.error('Error mengambil video:', error);
        }
      }

      fetchVideo();
    }
  }, [movies]);

  return (
    <div className="bg-white dark:bg-slate-900 text-black dark:text-white">
      <div className="relative">
        {/* Container untuk video dan detail film acak */}
        <div className="relative w-full h-screen">
          {/* Menampilkan detail film acak di sisi kiri video */}
          {randomMovie && (
            <div className="absolute left-0 top-0 w-1/2 h-full p-4 flex flex-col justify-center items-start z-20">
              <h1 className="text-white font-bold text-xl">{randomMovie.title}</h1> 
              <p className="text-white text-xs mt-2">{randomMovie.overview}</p>
            </div>
          )}

          <div
            className="video-container w-full h-full"
            style={{
              position: "relative",
              height: "100vh",
              overflow: "hidden",
            }}
          >
            {/* Iframe responsif untuk mengisi lebar penuh */}
            <iframe
              src={videoUrl || "https://www.youtube.com/embed/zCR978-YAEM?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&modestbranding=1&loop=1&playlist=zCR978-YAEM"}
              title="Pemutar video YouTube"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
              style={{
                position: "absolute", 
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                border: "none",
              }}
              referrerPolicy="strict-origin-when-cross-origin"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Bagian untuk daftar film */}
      <h2 className="text-black dark:text-white font-bold text-3xl p-4">POPULER</h2>
      <div className="Card flex w-full overflow-x-auto gap-6">
        {movies?.map((item, index) => (
          <Link to={`/Detail/${item.id}`} key={index} className="w-60">
            <Card
              title={item.title}
              overview={item.overview}
              image={
                item.poster_path
                  ? "https://image.tmdb.org/t/p/w500" + item.poster_path
                  : "https://via.placeholder.com/500x750"
              }
              rating={item.vote_average}
            />
          </Link>
        ))}
      </div>

      <h2 className="text-black dark:text-white font-bold text-3xl p-4">TOP RATED</h2>
      <div className="Card flex w-full overflow-x-auto gap-6">
        {topRated?.map((item, index) => (
          <Link to={`/Detail/${item.id}`} key={index} className="w-60">
            <Card
              title={item.title}
              overview={item.overview}
              image={
                item.poster_path
                  ? "https://image.tmdb.org/t/p/w500" + item.poster_path
                  : "https://via.placeholder.com/500x750"
              }
              rating={item.vote_average}
            />
          </Link>
        ))}
      </div>

      <h2 className="text-black dark:text-white font-bold text-3xl p-4">COMING SOON</h2>
      <div className="Card flex w-full overflow-x-auto gap-6">
        {Comingson?.map((item, index) => (
          <Link to={`/Detail/${item.id}`} key={index} className="w-60">
            <Card
              title={item.title}
              overview={item.overview}
              image={
                item.poster_path
                  ? "https://image.tmdb.org/t/p/w500" + item.poster_path
                  : "https://via.placeholder.com/500x750"
              }
              rating={item.vote_average}
            />
          </Link>
        ))}
      </div>

      <h2 className="text-black dark:text-white font-bold text-3xl p-4">NOW PLAYING</h2>
      <div className="Card flex w-full overflow-x-auto gap-6">
        {NowPlaying?.map((item, index) => (
          <Link to={`/Detail/${item.id}`} key={index} className="w-60">
            <Card
              title={item.title}
              overview={item.overview}
              image={
                item.poster_path
                  ? "https://image.tmdb.org/t/p/w500" + item.poster_path
                  : "https://via.placeholder.com/500x750"
              }
              rating={item.vote_average}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BerandaView;
