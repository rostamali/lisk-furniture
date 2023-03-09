import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { ProductType } from 'src/types';

type WishlistType = {
	totalQuantity: number;
	wishlistSubTotal: number;
	wishlistItem: ProductType[];
};

const initialState: WishlistType = {
	totalQuantity: 0,
	wishlistSubTotal: 0,
	wishlistItem: [],
};

export const wishlistSlice = createSlice({
	name: 'wishlist',
	initialState: initialState,
	reducers: {
		hydrateWishlist: (state, { payload }: PayloadAction<any>) => {
			return payload;
		},
		addToWishlist: (state, { payload }: PayloadAction<ProductType>) => {
			const exist = state.wishlistItem.find(
				(item) => item._id === payload._id,
			);
			if (exist) {
				toast.success(
					`${payload.title.substr(0, 15)}... already in wishlist.`,
				);
			}
			state.totalQuantity = state.totalQuantity + 1;
			state.wishlistSubTotal = state.wishlistSubTotal + payload.salePrice;
			state.wishlistItem.push({
				...payload,
			});
			toast.success(
				`${payload.title.substr(0, 15)}... added to wishlist.`,
			);
		},
		removeFromWishlist: (
			state,
			{ payload }: PayloadAction<ProductType>,
		) => {
			const filteredItems = state.wishlistItem.filter(
				(item) => item._id !== payload._id,
			);

			state.totalQuantity = state.totalQuantity - 1;
			state.wishlistSubTotal = state.wishlistSubTotal - payload.salePrice;
			state.wishlistItem = filteredItems;
			toast.success(
				`${payload.title.substr(0, 15)}... removed from wishlist.`,
			);
		},
	},
});

export const { addToWishlist, hydrateWishlist, removeFromWishlist } =
	wishlistSlice.actions;
export default wishlistSlice.reducer;
