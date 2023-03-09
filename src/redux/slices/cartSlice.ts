import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { ProductCardType } from 'src/types';

export interface QtyCardType extends ProductCardType {
	qty: number;
}

type CartType = {
	totalQuantity: number;
	cartSubTotal: number;
	total: number;
	cartItem: QtyCardType[];
	loading: boolean;
	shipCost: number;
};

const initialState: CartType = {
	totalQuantity: 0,
	cartSubTotal: 0,
	total: 0,
	cartItem: [],
	loading: false,
	shipCost: 0,
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState: initialState,
	reducers: {
		hydrate: (state, { payload }: PayloadAction<any>) => {
			return payload;
		},

		addToCart: (state, { payload }: PayloadAction<ProductCardType>) => {
			const exist = state.cartItem.find(
				(item) => item._id === payload._id,
			);
			if (exist) {
				exist.qty++;
			}
			state.cartItem.push({
				...payload,
				qty: 1,
			});
			state.totalQuantity = state.totalQuantity + 1;
			state.cartSubTotal = state.cartSubTotal + payload.salePrice;

			state.total = state.cartSubTotal + state.shipCost;
			toast.success(`${payload.title.substr(0, 15)}... added to cart.`);
			state.loading = false;
		},
		removeFromCart: (state, { payload }: PayloadAction<QtyCardType>) => {
			const filteredItems = state.cartItem.filter(
				(item) => item._id !== payload._id,
			);

			state.totalQuantity = state.totalQuantity - payload.qty;
			state.cartSubTotal =
				state.cartSubTotal - payload.qty * payload.salePrice;
			state.cartItem = filteredItems;
			state.total = state.cartSubTotal + state.shipCost;
			toast.success(
				`${payload.title.substr(0, 15)}... removed from cart.`,
			);
		},
		increaseCartItem: (state, { payload }: PayloadAction<QtyCardType>) => {
			const exist = state.cartItem.find(
				(item) => item._id === payload._id,
			);
			if (exist) {
				exist.qty++;
				state.cartSubTotal = state.cartSubTotal + payload.salePrice;
				state.totalQuantity = state.totalQuantity + 1;
				state.total = state.cartSubTotal + state.shipCost;
				toast.success(`Product Quantity Updated.`);
			}
		},
		decreaseCartItem: (state, { payload }: PayloadAction<QtyCardType>) => {
			const exist = state.cartItem.find(
				(item) => item._id === payload._id,
			);
			if (exist) {
				if (exist.qty === 1) {
					const filteredItems = state.cartItem.filter(
						(item) => item._id !== payload._id,
					);
					state.cartItem = filteredItems;
					state.cartSubTotal = state.cartSubTotal - payload.salePrice;
					state.totalQuantity = state.totalQuantity - 1;
					state.total = state.cartSubTotal + state.shipCost;
					toast.success(
						`${payload.title.substr(0, 15)}... removed from cart.`,
					);
				} else {
					exist.qty--;
					state.cartSubTotal = state.cartSubTotal - payload.salePrice;
					state.totalQuantity = state.totalQuantity - 1;
					state.total = state.cartSubTotal + state.shipCost;
					toast.success(`Product Quantity Updated.`);
				}
			}
		},
		handleTotalCost: (state, { payload }: PayloadAction<any>) => {
			const cityList = payload.data
				.find(
					(item: any) =>
						item.province.toLowerCase() ===
						payload.province.toLowerCase(),
				)
				.city.find(
					(item: any) =>
						item.name.toLowerCase() === payload.city.toLowerCase(),
				);
			state.shipCost = cityList.cost;
			state.total = state.cartSubTotal + cityList.cost;
		},
		deleteCart: (state, { payload }: PayloadAction<any>) => {
			(state.totalQuantity = 0),
				(state.cartSubTotal = 0),
				(state.total = 0),
				(state.cartItem = []),
				(state.shipCost = 0);
		},
	},
});

export const {
	addToCart,
	hydrate,
	removeFromCart,
	increaseCartItem,
	decreaseCartItem,
	handleTotalCost,
	deleteCart,
} = cartSlice.actions;
export default cartSlice.reducer;
