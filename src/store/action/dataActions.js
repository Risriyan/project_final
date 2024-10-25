// src/pages/beranda/action/dataActions.js
export const NowPlaying = "NowPlaying";
export const Populer = "Populer";
export const TopRated = "TopRated";
export const Comingson = "Comingson";

export const setNowPlaying = (data) => ({
    type: NowPlaying,
    payload: data,
});

export const setPopuler = (data) => ({
    type: Populer,
    payload: data,
});

export const setTopRated = (data) => ({
    type: TopRated,
    payload: data,
});

export const setComingson = (data) => ({
    type: Comingson,
    payload: data,
});
