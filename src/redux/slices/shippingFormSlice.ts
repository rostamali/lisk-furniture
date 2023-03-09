import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ShippingFormType = {
	province: string;
	city: any[];
	area: string[];
	cost: number;
	selectedCity: string;
	selectedArea: string;
};

const initialState: ShippingFormType = {
	province: '',
	city: [],
	area: [],
	cost: 0,
	selectedCity: '',
	selectedArea: '',
};

type SelectProvider = {
	province: string;
	data: {
		province: string;
		city: {
			name: string;
			area: string[];
		}[];
	}[];
};

export const shippingFormSlice = createSlice({
	name: 'shippingForm',
	initialState: initialState,
	reducers: {
		loadData: (state, { payload }: PayloadAction<any>) => {
			return payload;
		},
		selectProvince: (state, { payload }: PayloadAction<SelectProvider>) => {
			const cityList = payload.data.find(
				(item) =>
					item.province.toLowerCase() ===
					payload.province.toLowerCase(),
			);
			if (cityList) {
				let cityListArray = [];
				for (const item of cityList.city) {
					cityListArray.push(item.name);
				}
				state.city = [...cityListArray];
				state.province = payload.province;
			}
		},
		selectCity: (state, { payload }: PayloadAction<any>) => {
			const cityList = payload.data
				.find(
					(item: any) =>
						item.province.toLowerCase() ===
						state.province.toLowerCase(),
				)
				.city.find(
					(item: any) =>
						item.name.toLowerCase() === payload.city.toLowerCase(),
				);

			state.selectedCity = payload.city;
			state.cost = cityList.cost;
			state.area = [...cityList.area];
		},
		selectArea: (state, { payload }: PayloadAction<any>) => {
			state.selectedArea = payload.area;
		},
		deleteShipping: (state, { payload }: PayloadAction<any>) => {
			(state.province = ''), (state.city = []);
			state.area = [];
			state.cost = 0;
			state.selectedCity = '';
			state.selectedArea = '';
		},
	},
});

export const {
	selectProvince,
	selectCity,
	loadData,
	selectArea,
	deleteShipping,
} = shippingFormSlice.actions;
export default shippingFormSlice.reducer;
