import prisma from '$lib/prisma';
import { kindeAuthClient, type SessionManager } from '@kinde-oss/kinde-auth-sveltekit';
import type { RequestEvent } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

export async function load({ request, locals }: RequestEvent) {
	const isAuthenticated = await kindeAuthClient.isAuthenticated(
		request as unknown as SessionManager
	);

	if (!isAuthenticated) {
		redirect(307, '/api/auth/register');
	}

	const labels = await prisma.label.findMany({
		where: {
			userId: locals.userId
		},
		orderBy: {
			createdAt: 'desc'
		}
	});

	return {
		user: {
			id: locals.userId,
			name: locals.userName,
			nameFallback: locals.userNameFallback,
			img: locals.userImg
		},
		labels
	};
}
