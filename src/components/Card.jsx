import React from "react";

// Fungsi untuk menghasilkan bintang berdasarkan rating
const generateStars = (rating) => {
  const stars = [];
  const filledStars = Math.floor(rating / 2); // Mengonversi rating 0-10 menjadi 0-5
  const hasHalfStar = rating % 2 >= 0.5; // Cek jika ada setengah bintang

  // Tambahkan bintang penuh
  for (let i = 0; i < filledStars; i++) {
    stars.push(<span key={i}>★</span>);
  }

  // Tambahkan setengah bintang jika perlu
  if (hasHalfStar) {
    stars.push(<span key="half">☆</span>);
  }

  // Tambahkan bintang kosong untuk sisanya
  while (stars.length < 5) {
    stars.push(<span key={stars.length}>☆</span>);
  }

  return stars;
};

const Card = ({ title, overview, image, rating }) => {
  return (
    <div className="bg-white dark:bg-slate-700 card card-compact shadow-xl w-48">
      <figure>
        <img
          src={image}
          alt={title}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title line-clamp-1">{title}</h2>
        <p className="line-clamp-2">{overview}</p>
        <div className="flex items-center">
          {/* Tampilkan bintang */}
          <div className="text-yellow-500">{generateStars(rating)}</div>
          <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">{rating}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
