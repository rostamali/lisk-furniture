import { ReactElement, useState } from 'react';
import dynamic from 'next/dynamic';
import { Tabs } from 'flowbite-react';
import { BiLockOpen, BiUserCircle } from 'react-icons/bi';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import AdminAuthLayout from 'src/components/layouts/AdminAuthLayout';
import Head from 'next/head';
import { useFetchData, useUpdateData } from 'src/hooks/useApi';
import Spinner from 'src/components/common/shared/Spinner';
import { useForm } from 'react-hook-form';
import ButtonLoader from 'src/components/common/shared/ButtonLoader';
const AdminPageTitle = dynamic(
	() => import('src/components/common/admin/AdminPageTitle'),
	{
		ssr: false,
	},
);
const SelectPhotos = dynamic(
	() => import('src/components/common/admin/SelectPhotos'),
	{
		ssr: false,
	},
);
const Picture = dynamic(() => import('src/components/common/shared/Picture'), {
	ssr: false,
});

const AccountSetting = () => {
	const [showPassword, setShowPassword] = useState({
		currentPassword: false,
		newPassword: false,
		confirmPassword: false,
	});
	const [photo, setPhoto] = useState<string[]>([]);
	type ObjectKey = keyof typeof showPassword;
	const { data: user, isLoading: loadingUser } = useFetchData(
		'/api/auth/profile',
		'auth',
		1,
	);
	const { mutate: updateUserInfo, isLoading: isUpdate } =
		useUpdateData('auth');
	const { register, handleSubmit } = useForm();
	const updateUser = (data: any) => {
		data.thumbnail = photo[0];
		updateUserInfo({
			url: `/api/auth/update/admin`,
			body: data,
		});
	};
	return (
		<>
			<Head>
				<title>Uer account setting</title>
				<meta
					name="description"
					content="Generated by create next app"
				/>
			</Head>
			<div id="admin-info">
				<div className="pb-8">
					<AdminPageTitle
						title={'Account'}
						subtitle={'Admin / Account Settings'}
					/>
				</div>
				<div className="bg-white p-10 rounded-lg">
					<Tabs.Group
						aria-label="Account Setting"
						style="underline"
						className="account-setting"
					>
						<Tabs.Item
							active={true}
							icon={BiUserCircle}
							title="Account"
							className="custom-class"
						>
							{!loadingUser ? (
								<form
									className="admin-form pt-6"
									onSubmit={handleSubmit(updateUser)}
								>
									<div className="w-2/5 flex items-center gap-8 pb-12">
										{photo.length ? (
											<Picture
												link={`/uploads/${photo[0]}`}
												classList={
													'h-[120px] w-[120px] border-2 border-orange-dark rounded-full'
												}
												alt={'user'}
											/>
										) : (
											<Picture
												link={`/uploads/${user.data.thumbnail}`}
												classList={
													'h-[120px] w-[120px] border-2 border-orange-dark rounded-full'
												}
												alt={
													user.status === 'success'
														? user.data.userName
														: 'User'
												}
											/>
										)}
										<div>
											<SelectPhotos
												btnText={'Upload Thumbnail'}
												handler={setPhoto}
												single={true}
												defaultVal={photo}
												btnClass={''}
											/>
											<span className="pt-2 block">
												Only allow png & jpg files
											</span>
										</div>
									</div>
									<div className="grid grid-cols-2 gap-8">
										<div className="input__group flex flex-col">
											<label
												htmlFor="userName"
												className="input__label"
											>
												Username
											</label>
											<input
												id="userName"
												type="text"
												defaultValue={
													user.data.userName
												}
												disabled
												className="input__field"
												{...register('userName')}
											/>
										</div>
										<div className="input__group">
											<label
												htmlFor="email"
												className="input__label"
											>
												E-mail
											</label>
											<input
												type="email"
												id="email"
												disabled
												defaultValue={user.data.email}
												className="input__field"
												{...register('email')}
											/>
										</div>
										<div className="input__group flex flex-col">
											<label
												htmlFor="firstName"
												className="input__label"
											>
												Fist Name
											</label>
											<input
												id="firstName"
												type="text"
												defaultValue={
													user.data.firstName
												}
												className="input__field"
												{...register('firstName')}
											/>
										</div>
										<div className="input__group flex flex-col">
											<label
												htmlFor="lastName"
												className="input__label"
											>
												Last Name
											</label>
											<input
												id="lastName"
												type="text"
												defaultValue={
													user.data.lastName
												}
												className="input__field"
												{...register('lastName')}
											/>
										</div>

										<div className="input__group">
											<label className="input__label">
												Role
											</label>
											<select
												className="input__field"
												defaultValue={user.data.role}
												{...register('role')}
											>
												<option value="admin">
													Admin
												</option>
												<option value="editor">
													Editor
												</option>
												<option value="user">
													User
												</option>
											</select>
										</div>
										<div className="input__group">
											<label className="input__label">
												Account Status
											</label>
											<select
												className="input__field"
												defaultValue={
													user.data.active
														? 'true'
														: 'false'
												}
												{...register('active')}
											>
												<option value="true">
													Active
												</option>
												<option value="false">
													Inactive
												</option>
											</select>
										</div>
									</div>
									<button
										className="submit__btn mt-8 h-[52px] w-[172px]"
										disabled={isUpdate}
									>
										{isUpdate ? (
											<ButtonLoader />
										) : (
											'Save Changes'
										)}
									</button>
								</form>
							) : (
								<div className="flex h-[420px] items-center justify-center">
									<Spinner />
								</div>
							)}
						</Tabs.Item>
						<Tabs.Item title="Security" icon={BiLockOpen}>
							<form>
								{SecurityChange.map((item, index) => (
									<div
										className="flex flex-col gap-2 mb-6"
										key={index}
									>
										<label
											className="input__label"
											htmlFor="currentPassword"
										>
											{item.label}
										</label>
										<div className="relative w-full">
											<input
												type={
													showPassword[
														item.name as ObjectKey
													]
														? 'text'
														: 'password'
												}
												className="input__field block w-full"
											/>
											<div className="absolute inset-y-0 right-4 flex items-center pl-3">
												<button
													type="button"
													onClick={() =>
														setShowPassword({
															...showPassword,
															[item.name]:
																!showPassword[
																	item.name as ObjectKey
																],
														})
													}
												>
													{showPassword[
														item.name as ObjectKey
													] ? (
														<HiEyeOff className="text-xl text-[#3a35418a]" />
													) : (
														<HiEye className="text-xl text-[#3a35418a]" />
													)}
												</button>
											</div>
										</div>
									</div>
								))}
								<button className="submit__btn">
									save changes
								</button>
							</form>
						</Tabs.Item>
					</Tabs.Group>
				</div>
			</div>
		</>
	);
};

const SecurityChange = [
	{
		name: 'currentPassword',
		label: 'Current Password',
	},
	{
		name: 'newPassword',
		label: 'New Password',
	},
	{
		name: 'confirmPassword',
		label: 'Confirm Password',
	},
];

AccountSetting.getLayout = function getLayout(page: ReactElement) {
	return <AdminAuthLayout>{page}</AdminAuthLayout>;
};

export default AccountSetting;