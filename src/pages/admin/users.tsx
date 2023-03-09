import AdminPageTitle from 'src/components/common/admin/AdminPageTitle';
import Empty from 'src/components/common/admin/Empty';
import CustomPagination from 'src/components/common/shared/CustomPagination';
import Picture from 'src/components/common/shared/Picture';
import Spinner from 'src/components/common/shared/Spinner';
import AdminAuthLayout from 'src/components/layouts/AdminAuthLayout';
import { useCreateData, useDeleteData, useFetchData } from 'src/hooks/useApi';
import { handleDeleteConfirm } from 'src/utils/confirmation';
import Head from 'next/head';
import { ReactElement, useState } from 'react';
import { MdSyncDisabled } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import SelectPhotos from 'src/components/common/admin/SelectPhotos';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { createUserValidator } from 'src/utils/validators';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorMessage } from '@hookform/error-message';
import ButtonLoader from 'src/components/common/shared/ButtonLoader';

const Users = () => {
	const [page, setPage] = useState(1);
	const [showPassword, setShowPassword] = useState(false);
	const { data: userList, isLoading } = useFetchData(
		`/api/auth/users?page=${page}&limit=6`,
		'user-list',
		page,
	);
	const { mutate: deleteAccount } = useDeleteData('auth');
	const { mutate: createUser, isLoading: isCreating } = useCreateData(
		'/api/auth/createuser',
		'user-list',
	);
	const handleDeleteAccount = (id: string) => {
		handleDeleteConfirm('Are you sure ?', 'User will be deleted !').then(
			(result) => {
				if (result.isConfirmed) {
					if (
						userList.currentPage === userList.pages &&
						userList.data.length === 1
					) {
						deleteAccount(`/api/auth/deleteuser/${id}`);
						setPage(userList.pages - 1);
					} else {
						deleteAccount(`/api/auth/deleteuser/${id}`);
					}
				}
			},
		);
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(createUserValidator),
	});

	const onSubmit = handleSubmit(async (user) => {
		createUser(user);
		reset();
	});

	return (
		<>
			<Head>
				<title>User List</title>
				<meta
					name="description"
					content="Generated by create next app"
				/>
			</Head>
			<div className="product-category">
				<div className="pb-8 flex items-center justify-between">
					<div>
						<AdminPageTitle
							title={'Users'}
							subtitle={'Admin / Users'}
						/>
					</div>
					<div className="flex  items-center gap-3">
						<input
							type="text"
							placeholder="Search by name..."
							className="input__field"
						/>
						<button className="submit__btn">Search</button>
					</div>
				</div>
				<div className="">
					<div className="grid grid-cols-3 gap-8">
						<div className="bg-white p-10 rounded-lg flex flex-col gap-4">
							<h3 className="text-black text-lg font-semibold pb-2">
								Create User
							</h3>
							<form onSubmit={onSubmit}>
								<div className="input__group">
									<label
										htmlFor="useruserNamename"
										className="input__label"
									>
										Username
									</label>
									<input
										id="userName"
										type="text"
										className="input__field"
										{...register('userName')}
									/>
									<ErrorMessage
										errors={errors}
										name={'userName'}
										render={({ message }) => (
											<p className="text-red-500 text-base italic font-medium font-mulish">
												{message}
											</p>
										)}
									/>
								</div>
								<div className="input__group mt-3">
									<label
										htmlFor="email"
										className="input__label"
									>
										Email
									</label>
									<input
										id="email"
										type="email"
										className="input__field"
										{...register('email')}
									/>
									<ErrorMessage
										errors={errors}
										name={'email'}
										render={({ message }) => (
											<p className="text-red-500 text-base italic font-medium font-mulish">
												{message}
											</p>
										)}
									/>
								</div>
								<div className="input__group mt-3">
									<label
										className="input__label"
										htmlFor="role"
									>
										Role
									</label>
									<select
										id="role"
										{...register('role')}
										className="capitalize input__field"
									>
										<option value="user">User</option>
										<option value="admin">Admin</option>
									</select>
								</div>
								<div className="flex flex-col gap-2 mt-5">
									<label
										className="input__label"
										htmlFor="password"
									>
										Password
									</label>
									<div className="relative w-full">
										<input
											type={
												showPassword
													? 'text'
													: 'password'
											}
											className="input__field block w-full pr-[50px]"
											id={'password'}
											{...register('password')}
										/>
										<div className="absolute inset-y-0 right-4 flex items-center pl-3">
											<button
												type="button"
												onClick={() =>
													setShowPassword(
														!showPassword,
													)
												}
											>
												{showPassword ? (
													<HiEyeOff className="text-xl text-[#3a35418a]" />
												) : (
													<HiEye className="text-xl text-[#3a35418a]" />
												)}
											</button>
										</div>
									</div>
									<ErrorMessage
										errors={errors}
										name={'password'}
										render={({ message }) => (
											<p className="text-red-500 text-base italic font-medium font-mulish">
												{message}
											</p>
										)}
									/>
								</div>
								<button
									className="submit__btn w-full mt-6 h-[50px]"
									disabled={isCreating}
								>
									{isCreating ? <ButtonLoader /> : 'New User'}
								</button>
							</form>
						</div>
						<div className="bg-white p-10 rounded-lg col-span-2">
							{isLoading ? (
								<div className="flex h-[60vh] items-center justify-center">
									<Spinner />
								</div>
							) : userList.data.length > 0 ? (
								<>
									<table className="w-full border-collapse">
										<thead className="bg-[#F0F1FF] border border-[#F0F1FF]">
											<tr>
												<th className="text-left py-3 pl-3">
													Image
												</th>

												<th className="text-left py-3">
													Email
												</th>
												<th className="text-left py-3">
													Username
												</th>
												<th className="text-left py-3">
													Role
												</th>
												<th className="text-left py-3">
													Status
												</th>
												<th className="text-center py-3 pr-3">
													Action
												</th>
											</tr>
										</thead>
										<tbody>
											{userList.data.map(
												(item: any, index: number) => (
													<tr
														className="border border-[#F0F1FF] mb-2"
														style={{
															marginBottom:
																'10px',
														}}
														key={index}
													>
														<td className="py-2 pl-3">
															<Picture
																link={
																	item.thumbnail
																		? `/uploads/${item.thumbnail}`
																		: '/uploads/placeholder.png'
																}
																classList={
																	'h-[45px] w-[45px] rounded-full'
																}
																alt={
																	item.userName
																}
															/>
														</td>

														<td>{item.email}</td>
														<td className="capitalize">
															{item.userName}
														</td>
														<td className="capitalize">
															{item.role}
														</td>
														<td>
															{item.active
																? 'Active'
																: 'Inactive'}
														</td>
														<td className="pr-3">
															<div className="flex items-center gap-2 justify-center">
																<button
																	className="action__delete"
																	onClick={() =>
																		handleDeleteAccount(
																			item._id,
																		)
																	}
																>
																	<MdSyncDisabled className="text-[#000] text-base" />
																</button>
															</div>
														</td>
													</tr>
												),
											)}
										</tbody>
									</table>
									{userList.pages > 1 && (
										<div className="flex items-center justify-end pt-5">
											<CustomPagination
												currentpage={
													userList.currentPage
												}
												totalPage={userList.pages}
												handler={setPage}
											/>
										</div>
									)}
								</>
							) : (
								<Empty text={'No Category Exist'} />
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
Users.getLayout = function getLayout(page: ReactElement) {
	return <AdminAuthLayout>{page}</AdminAuthLayout>;
};
export default Users;