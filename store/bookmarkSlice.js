

const { createSlice } = require("@reduxjs/toolkit");

const bookmarkFromStorage =
  typeof window !== "undefined"
    ? localStorage.getItem("bookmarks")
    : null;

const bookmarklist = bookmarkFromStorage
  ? JSON.parse(bookmarkFromStorage)
  : [];

const initialState = {
    bookmarks: bookmarklist
}

const bookmarkSlice = createSlice({
    name:'bookmarslice',
    initialState,
    reducers:{
        addtoBookmark:(state,action)=>{
            state.bookmarks = [...state.bookmarks,action.payload];
            // console.log(state.bookmarks);
            localStorage.setItem('bookmarks',JSON.stringify(state.bookmarks));
        },
        removeBookmark:(state,action)=>{
            state.bookmarks = state.bookmarks.filter((i)=> i.id !== action.payload.id)
            // console.log(state.bookmarks);
            localStorage.setItem('bookmarks',JSON.stringify(state.bookmarks));
        }
    }
})


export const {addtoBookmark,removeBookmark} = bookmarkSlice.actions;
export default bookmarkSlice.reducer;