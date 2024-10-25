import themeReducer from "./reducer/ThemeReducer";
import { configureStore } from "@reduxjs/toolkit";
import dataReducer from './reducer/dataReducer';


const store = configureStore({
    reducer: {
        theme: themeReducer, // Tambahkan koma di sini
       dataReducer:dataReducer,
    },
});

export default store;
