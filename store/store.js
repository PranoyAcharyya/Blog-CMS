import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./blogSlice";
import bookmarkReducer from "./bookmarkSlice";

export const store = configureStore({
    reducer:{
        blogs:blogReducer,
        bookmarks:bookmarkReducer
    },
});