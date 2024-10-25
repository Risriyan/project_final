import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import Card from '../components/Card';
import axios from 'axios'; 
import {Link} from 'react-router-dom';


const Search = () => {
    const [movies, setMovies] = useState([]); // Inisialisasi dengan array kosong
    const [search, setSearch] = useSearchParams();
    const cari = search.get("cari");
    const dispatch = useDispatch(); // Untuk mengirim action
    const apiKey = "21087105b235b4e225a788829fa4c160";

    // Fungsi untuk mengupdate query pencarian
    const searchMovie = (query) => {
        setSearch({ cari: query });
    };

    // Mengambil data film dari API
    const fetchSearchMovie = useCallback(async () => {
        if (!cari) return; // Hentikan jika tidak ada pencarian
        try {
            const response = await axios.get(
                `https://api.themoviedb.org/3/search/movie?query=${cari}&include_adult=true&language=en-US&api_key=${apiKey}`
            );
            setMovies(response.data.results);
        } catch (err) {
            console.error("Error fetching movies:", err.message);
        }
    }, [cari]);

    useEffect(() => {
        fetchSearchMovie();
    }, [cari, fetchSearchMovie]);

    return (
        <div className=" bg-white dark:bg-slate-900 pt-20"> {/* Beri margin-top agar tidak tertutup navbar */}
            <div className="container mx-auto">
                <label className="input input-bordered flex items-center gap-2 mb-6">
                    <input
                        type="text"
                        className="grow p-2 border border-gray-300 rounded-md"
                        placeholder="Search for movies"
                        onChange={(e) => searchMovie(e.target.value)} // Memperbarui pencarian
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70"
                    >
                        <path
                            fillRule="evenodd"
                            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                            clipRule="evenodd"
                        />
                    </svg>
                </label>
                <div className="grid md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {movies?.length > 0 ? (
                  movies.map((item, index) => (
                   <Link to={`/detail/${item.id}`} key={index}> {/* Bungkus Card dengan Link */}
                   <Card
                   title={item.title}
                   releaseDate={item.release_date}
                   rating={item.vote_average}
                   image={
                   item.poster_path
                   ? "https://image.tmdb.org/t/p/original" + item.poster_path
                  : "https://via.placeholder.com/500x750" // Placeholder jika tidak ada gambar
               }
                    />
                   </Link>
                        ))
                    ) : (
                        <p>No movies found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Search;
