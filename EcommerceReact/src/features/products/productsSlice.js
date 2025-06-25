import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

const initialState = {
    items:[],
    status:'idle',
    error: null
};

export const fetchProduct = createAsyncThunk('product/fetchProducts', async () =>{
    try{
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch products');
        }

        const data = await response.json();
        return data;
    }catch(error){
        throw error;
    }
});

const productsSlice = createSlice({
    name:'products',
    initialState,
    reducers:{
        addProduct:(state,action) =>{
            state.items.push(action.payload);
        },
        removeProduct:(state,action) =>{
            state.items = state.items.filter((item) =>item.id !== action.payload.id);
        },
        clearProduct:(state) =>{
            state.items =[];
        }
    },
    extraReducers: (builder) =>{
        builder
            .addCase(fetchProduct.pending, (state) =>{
                state.status ='loading';
            })
            .addCase(fetchProduct.fulfilled, (state,action) =>{
                state.status ='succeeded';
                state.items = action.payload;
            })
            .addCase(fetchProduct.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
})

export const {addProduct, removeProduct, clearProduct} = productsSlice.actions;
export default productsSlice.reducer;