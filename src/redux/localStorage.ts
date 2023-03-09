import { hydrate } from './slices/cartSlice';
import { loadData } from './slices/shippingFormSlice';
import { hydrateWishlist } from './slices/wishlistSlice';
import store from './store';
export const loadState = () => {
	try {
		const serialState = localStorage.getItem('appState');
		if (serialState === null) {
			return undefined;
		}
		return JSON.parse(serialState);
	} catch (err) {
		return undefined;
	}
};
const data = loadState();
if (data) {
	store.dispatch(hydrate(data.cart));
	store.dispatch(loadData(data.shippingForm));
	store.dispatch(hydrateWishlist(data.wishlist));
}

export const saveState = (state: any) => {
	try {
		const serialState = JSON.stringify(state);
		localStorage.setItem('appState', serialState);
	} catch (err) {}
};
