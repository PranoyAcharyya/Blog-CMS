import { supabase } from "@/lib/supabaseClient";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//fetch blogs 


export const fetchBlogs = createAsyncThunk(
    "blogs/fetchBlogs",
    async(userId)=>{
        const {data,error} = await supabase.from("blogs").select("*").eq("author_id",userId).order("created_at",{ascending:false});

        if(error) throw error;
        return data;
    }
)


// create blogs 


export const createBlog = createAsyncThunk(
    "blogs/createBlog",
    async(blogData) => {
        const {data,error} = await supabase.from("blogs").insert(blogData).select().single();

        if(error) throw error;
        return data;
    }
)


//delete blog

export const deleteBlog = createAsyncThunk(
    "blogs/deleteBlog",
    async (id) => {
        const {error} = await supabase
        .from("blogs")
        .delete()
        .eq("id",id);

        if(error) throw error;
        return id;
    }
)

/* ============================
   UPDATE BLOG
============================ */

export const updateBlog = createAsyncThunk(
  "blogs/updateBlog",
  async ({ id, updates }) => {
    const { data, error } = await supabase
      .from("blogs")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
);


//slice

const blogSlice = createSlice({
    name:"blogs",
    initialState:{
        items:[],
        loading:false,
        error:null,
    },
    extraReducers:(builder) => {
        builder
        .addCase(fetchBlogs.pending,(state)=>{
            state.loading = true;
        })
        .addCase(fetchBlogs.fulfilled,(state,action)=>{
            state.loading = false;
            state.items = action.payload;
        })
        .addCase(fetchBlogs.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.error.message;
        })
        //create
        .addCase(createBlog.fulfilled,(state,action)=>{
            state.items.unshift(action.payload);
        })
        //delete
        .addCase(deleteBlog.fulfilled,(state,action)=>{
            state.items = state.items.filter(
                (b) => b.id !== action.payload
            );
        })
        .addCase(updateBlog.fulfilled,(state,action)=>{
            const index = state.items.findIndex(
                (b) => b.id === action.payload.id
            );
            if(index !== -1){
                state.items[index] = action.payload;
            }
        })
        
    },
});


export default blogSlice.reducer;