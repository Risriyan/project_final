import React, { useEffect, useReducer } from "react";
import BerandaView from "./BerandaView";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setNowPlaying, setPopuler, setTopRated, setComingson} from "../../store/action/dataActions";

const Beranda = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.dataReducer); // Pastikan untuk menghubungkan state reducer dengan store

  const apiKey = "21087105b235b4e225a788829fa4c160"; // Ganti dengan API key Anda

  const fetchMovies = async () => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`);
      dispatch(setPopuler(response.data.results)); // Dispatch action untuk set Populer
    } catch (error) {
      console.error("Error fetching the movie data:", error);
    }
  };

  const fetchTopRated = async () => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`);
      dispatch(setTopRated(response.data.results)); // Dispatch action untuk set Top Rated
    } catch (error) {
      console.error("Error fetching the top-rated movie data:", error);
    }
  };

  const fetchComingson = async () => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`);
      dispatch(setComingson(response.data.results)); // Dispatch action untuk set Comingson
    } catch (error) {
      console.error("Error fetching the upcoming movie data:", error);
    }
  };

  const fetchNowPlaying = async () => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`);
      dispatch(setNowPlaying(response.data.results)); // Dispatch action untuk set Now Playing
    } catch (error) {
      console.error("Error fetching the now playing movie data:", error);
    }
  };

  useEffect(() => {
    fetchMovies();
    fetchTopRated();
    fetchComingson();
    fetchNowPlaying();
  }, [apiKey]);

  return (
    <BerandaView
      Comingson={state.Comingson}
      topRated={state.TopRated}
      movies={state.Populer}
      NowPlaying={state.NowPlaying}
    />
  );
};

export default Beranda;
