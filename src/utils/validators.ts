import * as Yup from 'yup';

export const signupValidation = Yup.object().shape({
	username: Yup.string()
		.trim()
		.matches(/^\S*$/, 'Username cannot contain space')
		.required('Username is required')
		.min(2, 'Username must be at least 2 characters')
		.max(20, 'Username must not exceed 20 characters'),
	email: Yup.string()
		.required('Email is required')
		.email('Email is invalid')
		.trim(),
	password: Yup.string()
		.required('Password is required')
		.trim()
		.min(6, 'Password must be at least 6 characters')
		.max(40, 'Password must not exceed 40 characters'),
});

export const signinValidation = Yup.object().shape({
	email: Yup.string().required('Email is required').email('Email is invalid'),
	password: Yup.string()
		.required('Password is required')
		.min(6, 'Password must be at least 6 characters')
		.max(40, 'Password must not exceed 40 characters'),
});
export const createUserValidator = Yup.object().shape({
	userName: Yup.string()
		.trim()
		.matches(/^\S*$/, 'Username cannot contain space')
		.required('Username is required')
		.min(2, 'Username must be at least 2 characters')
		.max(20, 'Username must not exceed 20 characters'),
	email: Yup.string()
		.required('Email is required')
		.email('Email is invalid')
		.trim(),
	password: Yup.string()
		.required('Password is required')
		.trim()
		.min(6, 'Password must be at least 6 characters')
		.max(40, 'Password must not exceed 40 characters'),
});
export const checkoutFormValidator = Yup.object().shape({
	province: Yup.string().required('Province is required'),
	city: Yup.string().required('City is required'),
	area: Yup.string().required('Area is required'),
	address: Yup.string().required('Address is required'),
});
export const productForm = Yup.object().shape({
	name: Yup.string()
		.required('Name is required')
		.min(2, 'Name must be atleast 2 characters'),
	badge: Yup.string(),
	salePrice: Yup.number()
		.typeError('Sale price must be a number')
		.positive('Sale price must be positive')
		.required('Sale price is required'),
	sku: Yup.string().required('SKU is required'),
	stock: Yup.number()
		.typeError('Stock must be a number')
		.required('Stock is required'),
	category: Yup.string()
		.min(2, 'Category is required')
		.required('Category is required'),
});
