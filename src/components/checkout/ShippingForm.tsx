import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import {
	selectArea,
	selectCity,
	selectProvince,
} from '../../redux/slices/shippingFormSlice';
import { handleTotalCost } from '../../redux/slices/cartSlice';
import { UseFormRegister, FieldValues, FieldErrors } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useEffect } from 'react';

type ShippingFormType = {
	register: UseFormRegister<FieldValues>;
	errors: FieldErrors;
	setValue: (name: string, value: string | undefined) => void;
};

const ShippingForm: React.FC<ShippingFormType> = ({
	register,
	errors,
	setValue,
}) => {
	const dispatch = useDispatch();

	const { city, area, province, selectedArea, selectedCity } = useSelector(
		(state: RootState) => state.shippingForm,
	);

	function actionCreator(city: string, data: any) {
		dispatch(
			handleTotalCost({
				city,
				data,
				province,
			}),
		);
		dispatch(
			selectCity({
				city,
				data,
			}),
		);
	}

	useEffect(() => {
		setValue('province', province);
		setValue('city', selectedCity);
		setValue('area', selectedArea);
	}, [province, selectedArea, selectedCity, setValue]);

	return (
		<>
			<div className="billing-form__wrapper font-mulish">
				<div>
					<h3 className="text-black text-2xl font-bold mb-14">
						Shipping Details
					</h3>
					<div className="mb-3">
						<span className="form-label">Province</span>
						<select
							name="province"
							defaultValue={province ? province : ''}
							className="input-field"
							onChange={(e) => [
								dispatch(
									selectProvince({
										province: e.target.value,
										data: shippingCost,
									}),
								),
							]}
						>
							<option disabled value="">
								Select Province
							</option>
							{shippingCost.map((item, index) => (
								<option value={item.province} key={index}>
									{item.province}
								</option>
							))}
						</select>
						<ErrorMessage
							errors={errors}
							name={'province'}
							render={({ message }) => (
								<p className="text-red-500 text-sm italic font-normal font-Averta">
									{message}
								</p>
							)}
						/>
					</div>
					<div className="mb-3">
						<span className="form-label">City</span>
						<select
							{...register('city')}
							className="input-field"
							disabled={!city}
							defaultValue={selectedCity ? selectedCity : ''}
							onChange={(e) =>
								actionCreator(e.target.value, shippingCost)
							}
						>
							<option>Select City</option>
							{city ? (
								city.map((item: string, index: number) => (
									<option value={item} key={index}>
										{item}
									</option>
								))
							) : (
								<option>hhh</option>
							)}
						</select>
						<ErrorMessage
							errors={errors}
							name={'city'}
							render={({ message }) => (
								<p className="text-red-500 text-sm italic font-normal font-Averta">
									{message}
								</p>
							)}
						/>
					</div>
					<div className="mb-3">
						<span className="form-label">Area</span>
						<select
							{...register('area')}
							disabled={!area}
							className="input-field"
							defaultValue={selectedArea ? selectedArea : ''}
							onChange={(e) =>
								dispatch(
									selectArea({
										area: e.target.value,
									}),
								)
							}
						>
							<option>Select Area</option>
							{area &&
								area.map((item: string, index: number) => (
									<option value={item} key={index}>
										{item}
									</option>
								))}
						</select>
						<ErrorMessage
							errors={errors}
							name={'area'}
							render={({ message }) => (
								<p className="text-red-500 text-sm italic font-normal font-Averta">
									{message}
								</p>
							)}
						/>
					</div>
					<div className="mb-3">
						<label htmlFor={'address'} className="form-label">
							Address
						</label>
						<input
							type={'text'}
							id={'address'}
							className="input-field"
							{...register('address')}
						/>
						<ErrorMessage
							errors={errors}
							name={'address'}
							render={({ message }) => (
								<p className="text-red-500 text-sm italic font-normal font-Averta">
									{message}
								</p>
							)}
						/>
					</div>
					<div className="textarea-message">
						<label htmlFor="orderNote" className="form-label">
							Order Note
						</label>
						<textarea
							className="textarea-field"
							id="orderNote"
							{...register('orderNote')}
						></textarea>
					</div>
				</div>
			</div>
		</>
	);
};
export const shippingCost = [
	{
		province: 'Rajshahi',
		city: [
			{
				name: 'Bogura',
				area: [
					'Adamdighi',
					'Bagura Cantonment',
					'Bagura',
					'Balkuchi',
					'Sadar',
				],
				cost: 20,
			},
			{
				name: 'Rajshahi',
				area: [
					'Arani',
					'Bagha',
					'Bharkandi',
					'Binodpur Bazar',
					'Binodpur Bazar',
					'Godagari',
				],
				cost: 40,
			},
			{
				name: 'Nougan',
				area: ['Atrai', 'Bagmara', 'Nondipur'],
				cost: 50,
			},
		],
	},
	{
		province: 'Dhaka',
		city: [
			{
				name: 'EPZ',
				area: ['area 1', 'area 2', 'area 3', 'area 4', 'area 5'],
				cost: 10,
			},
			{
				name: 'Nodi',
				area: [
					'area 6',
					'area 7',
					'area 8',
					'area 8',
					'area 10',
					'area 11',
				],
				cost: 60,
			},
		],
	},
];
export default ShippingForm;
