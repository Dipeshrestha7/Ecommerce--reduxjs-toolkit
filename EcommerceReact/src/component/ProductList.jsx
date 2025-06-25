import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProduct } from '../features/products/productsSlice';
import { addToCart } from '../features/cart/cartSlice';

function ProductList() {

    const dispatch = useDispatch();
    const {items,status} = useSelector((state) =>state.products);

    useEffect(()=>{
        if(status == 'idle') dispatch(fetchProduct());
    },[status,dispatch]);

    if(status =='loading') return <p>Loading...</p>
    if(status=='failed') return <p>Error loading products.</p>;
  return (
    <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {items.map((item) => (
                    <div key={item.id} className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col h-[400px] w-full hover:shadow-xl transition-shadow duration-300">
                        <img src={item.image} alt={item.title} className="w-full h-48 object-cover flex-shrink-0" />
                        <div className="p-4 flex flex-col flex-grow justify-between">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">{item.title}</h3>
                                <p className="text-green-600 font-bold mb-4">${item.price}</p>
                            </div>
                            <button
                                onClick={() => dispatch(addToCart(item))}
                                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
  )
}

export default ProductList