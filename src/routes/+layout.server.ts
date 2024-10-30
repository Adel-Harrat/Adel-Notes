import prisma from '$lib/prisma';
import { kindeAuthClient, type SessionManager } from '@kinde-oss/kinde-auth-sveltekit';
import type { RequestEvent } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

export async function load({ request }: RequestEvent) {
	const isAuthenticated = await kindeAuthClient.isAuthenticated(
		request as unknown as SessionManager
	);

	if (!isAuthenticated) {
		redirect(307, '/api/auth/login');
	}

	const user = await kindeAuthClient.getUser(request as unknown as SessionManager);

	const response = await prisma.note.findMany();

	return {
		isAuthenticated,
		user: {
			name: user?.given_name + ' ' + user?.family_name || user.email,
			nameFallback:
				user.given_name.slice(0, 1).toUpperCase() + user.family_name.slice(0, 1).toUpperCase(),
			img: user.picture,
			id: user.id
		},
		notes: response
	};
}
