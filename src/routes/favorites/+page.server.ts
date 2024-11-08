import prisma from '$lib/prisma';
import type { RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }: RequestEvent) => {
	const notes = await prisma.note.findMany({
		where: {
			userId: locals.userId,
			status: 'FAVORITED'
		},
		orderBy: {
			updatedAt: 'desc'
		}
	});

	return { notes };
};
