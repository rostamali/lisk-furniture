import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
	const token = request.cookies.get('getrostam');
	// Admin Protection
	if (!request.nextUrl.pathname.startsWith('/admin')) {
		NextResponse.next();
	} else if (request.nextUrl.pathname.startsWith('/admin')) {
		if (!token) {
			return NextResponse.rewrite(new URL('/login', request.url));
		}
		try {
			const decodedData = await jwtVerify(
				token.value,
				new TextEncoder().encode(
					'this-is-our-super-authentication-methode-with-jwt-token',
				),
			);
			if (decodedData.payload.role !== 'admin') {
				return NextResponse.rewrite(new URL('/login', request.url));
			} else if (decodedData.payload.role === 'admin') {
				return NextResponse.next();
			}
		} catch (error) {
			return NextResponse.rewrite(new URL('/login', request.url));
		}
	}
	// User Protection
	if (!request.nextUrl.pathname.startsWith('/user')) {
		NextResponse.next();
	} else if (request.nextUrl.pathname.startsWith('/user')) {
		if (!token) {
			return NextResponse.rewrite(new URL('/login', request.url));
		}
		try {
			const decodedData = await jwtVerify(
				token.value,
				new TextEncoder().encode(
					'this-is-our-super-authentication-methode-with-jwt-token',
				),
			);
			if (decodedData.payload.role !== 'user') {
				return NextResponse.rewrite(new URL('/login', request.url));
			} else if (decodedData.payload.role === 'user') {
				return NextResponse.next();
			}
		} catch (error) {
			return NextResponse.rewrite(new URL('/login', request.url));
		}
	}
}

export const config = { matcher: ['/admin/:path*', '/login', '/user/:path*'] };
