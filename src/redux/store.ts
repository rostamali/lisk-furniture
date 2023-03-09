import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './slices/cartSlice';
import shippingFormSlice from './slices/shippingFormSlice';
import wishlistSlice from './slices/wishlistSlice';

const store = configureStore({
	reducer: {
		cart: cartSlice,
		shippingForm: shippingFormSlice,
		wishlist: wishlistSlice,
	},
	devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
