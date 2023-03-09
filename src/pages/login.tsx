import AuthFooter from 'src/components/auth/AuthFooter';
import AuthHeader from 'src/components/auth/AuthHeader';
import AuthInput from 'src/components/auth/AuthInput';
import ButtonLoader from 'src/components/common/shared/ButtonLoader';
import Logo from 'src/components/common/shared/Logo';
import { useCreateData } from 'src/hooks/useApi';
import { signinValidation } from 'src/utils/validators';
import { yupResolver } from '@hookform/resolvers/yup';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

const Login = () => {
	const signupTemplate = [
		{
			title: 'Email',
			name: 'email',
			type: 'email',
		},
		{
			title: 'Password',
			name: 'password',
			type: 'password',
		},
	];

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(signinValidation),
	});
	const { mutate: signin, isLoading } = useCreateData(
		'/api/auth/signin',
		'auth',
	);
	const router = useRouter();
	const onSubmit = handleSubmit(async (user) => {
		signin(user, {
			onSuccess: (res) => {
				if (router.asPath === '/login') {
					if (res.role === 'admin') {
						router.push('/admin');
					} else {
						router.push('/user');
					}
				} else {
					if (
						router.asPath.startsWith('/admin') &&
						res.role === 'admin'
					) {
						router.push(router.asPath);
					} else if (
						router.asPath.startsWith('/user') &&
						res.role === 'user'
					) {
						router.push(router.asPath);
					} else if (
						router.asPath.startsWith('/user') &&
						res.role === 'admin'
					) {
						router.push('/admin');
					} else if (
						router.asPath.startsWith('/admin') &&
						res.role === 'user'
					) {
						router.push('/user');
					} else {
						router.push('/');
					}
				}
				reset();
			},
		});
	});

	return (
		<>
			<Head>
				<title>Login to your account</title>
				<meta
					name="description"
					content="Generated by create next app"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div id="auth" className="bg-[#EAEDF7]">
				<div className="container mx-auto font-mulish">
					<div className="h-screen flex items-center">
						<div className="lg:w-2/4 md:w-2/3 mx-auto bg-white md:p-12 p-8">
							<div className="flex items-center justify-center pb-6">
								<Link href="/">
									<Logo color={'#000'} />
								</Link>
							</div>
							<AuthHeader title="Login to your account!" />
							<form onSubmit={onSubmit}>
								<AuthInput
									register={register}
									template={signupTemplate}
									errors={errors}
								/>
								<button
									className="btn-shadow w-full bg-orange-dark text-white uppercase text-base tracking-wider py-3 rounded h-[45px]"
									type="submit"
									disabled={isLoading}
								>
									{isLoading ? <ButtonLoader /> : 'Sign In'}
								</button>
							</form>
							<AuthFooter
								text={`Don't have an account`}
								link={'/register'}
								linkText={'Sign Up'}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Login;