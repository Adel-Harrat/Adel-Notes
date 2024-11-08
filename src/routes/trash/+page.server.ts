import prisma from '$lib/prisma';
import { kindeAuthClient, type SessionManager } from '@kinde-oss/kinde-auth-sveltekit';
import type { PageServerLoad } from './$types';
import type { Actions } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const notes = await prisma.note.findMany({
		where: {
			userId: locals.userId,
			status: 'DELETED'
		},
		orderBy: {
			updatedAt: 'desc'
		}
	});

	return { notes };
};

export const actions = {
	clearTrash: async ({ locals }) => {
		try {
			await prisma.note.deleteMany({
				where: {
					status: 'DELETED',
					userId: locals.userId
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
	}
} satisfies Actions;
