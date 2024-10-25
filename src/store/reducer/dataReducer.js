// src/pages/beranda/reducer/dataReducer.js
import { NowPlaying, Comingson, TopRated, Populer } from "../action/dataActions";

const initialState = {
  NowPlaying: [],
  Populer: [],
  Comingson: [],
  TopRated: [],
};

// Reducer function
const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case NowPlaying:
      return {
        ...state,
        NowPlaying: action.payload,
      };

    case Populer:
      return {
        ...state,
        Populer: action.payload,
      };

    case Comingson:
      return {
        ...state,
        Comingson: action.payload,
      };

    case TopRated:
      return {
        ...state,
        TopRated: action.payload,
      };

    default:
      return state;
  }
};

export default dataReducer; // Ekspor filmReducer sebagai default
