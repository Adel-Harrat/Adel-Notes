import prisma from '$lib/prisma';
import { kindeAuthClient, type SessionManager } from '@kinde-oss/kinde-auth-sveltekit';
import type { RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Actions } from './$types';

export const load: PageServerLoad = async ({ request }: RequestEvent) => {
	// Get Current LoggedIn User
	const loggedInUser = await kindeAuthClient.getUser(request as unknown as SessionManager);

	const notes = await prisma.note.findMany({
		where: {
			userId: loggedInUser.id,
			status: 'DELETED'
		},
		orderBy: {
			updatedAt: 'desc'
		}
	});

	return { notes };
};

export const actions = {
	clearTrash: async ({ request }) => {
		try {
			const loggedInUser = await kindeAuthClient.getUser(request as unknown as SessionManager);

			await prisma.note.deleteMany({
				where: {
					status: 'DELETED',
					userId: loggedInUser.id
				}
			});

			return {
				type: 'success',
				message: 'Trash Cleared!'
			};
		} catch {
			return {
				type: 'error',
				message: 'Something went wrong!'
			};
		}

		return {
			type: 'success',
			message: 'Trash Cleared!'
		};
	}
} satisfies Actions;
