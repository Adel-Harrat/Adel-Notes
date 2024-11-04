import prisma from '$lib/prisma';
import { kindeAuthClient, type SessionManager } from '@kinde-oss/kinde-auth-sveltekit';
import type { RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ request }: RequestEvent) => {
	// Get Current LoggedIn User
	const loggedInUser = await kindeAuthClient.getUser(request as unknown as SessionManager);

	const notes = await prisma.note.findMany({
		where: {
			userId: loggedInUser.id,
			status: 'DELETED'
		},
		orderBy: {
			createdAt: 'desc'
		}
	});

	return { notes };
};
