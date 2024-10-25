import React from 'react';

// Komponen DetailView menerima 'detail', 'handleFavorite', dan 'handleRating' sebagai props
const DetailView = ({ detail, handleFavorite, handleRating }) => {
  return (
    <div className="bg-white dark:bg-slate-900 text-black dark:text-white min-h-screen container mx-auto p-4 mt-16">
      {/* Tampilkan poster film */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="md:w-1/3">
          {detail.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/original${detail.poster_path}`}
              alt={detail.title}
              className="w-full h-auto rounded-lg" // href video 
            />
          ) : (
            <div className="w-full h-80 bg-gray-300 rounded-lg flex items-center justify-center">
              <p>No Image Available</p>
            </div>
          )}
        </div>

        {/* Bagian detail film */}
        <div className="md:w-2/3">
          <h1 className="text-3xl font-bold mb-4">{detail.title}</h1>
          <p className="text-lg mb-2"><strong>Release Date:</strong> {detail.release_date}</p>
          <p className="text-lg mb-2"><strong>Rating:</strong> {detail.vote_average}/10</p>
          <p className="text-lg mb-4"><strong>Runtime:</strong> {detail.runtime} minutes</p>

          {/* Deskripsi atau sinopsis film */}
          <h2 className="text-2xl font-semibold mb-2">Overview</h2>
          <p className="text-md text-justify">{detail.overview}</p>

          {/* Jika ada, tampilkan genre film */}
          {detail.genres && (
            <div className="mt-4">
              <h3 className="text-xl font-semibold mb-2">Genres:</h3>
              <ul className="flex gap-2 flex-wrap">
                {detail.genres.map((genre) => (
                  <li key={genre.id} className="bg-gray-200 dark:bg-gray-800 px-3 py-1 rounded-lg">
                    {genre.name}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tombol Rating */}
          <div className="mt-5">
            <h3 className="text-lg font-semibold">Beri Rating:</h3>
            {[2, 4, 6, 8, 10].map((rate) => (
              <button
                key={rate}
                value={rate}
                onClick={() => handleRating(rate)} // Gunakan detail.id
                className={`px-3 py-1 mx-1 rounded-lg bg-yellow-500`}
              >
                {rate} ⭐
              </button>
            ))}
          </div>

          {/* Tombol Favorit */}
          <div className="mt-3">
            <button
              onClick={() => handleFavorite()} // Gunakan detail.id
              className={`px-4 py-2 rounded-lg bg-red-500`}
            >
              <svg
                className="w-6 h-6 text-red-300 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailView;
