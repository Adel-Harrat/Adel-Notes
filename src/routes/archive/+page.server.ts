import prisma from '$lib/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const notes = await prisma.note.findMany({
		where: {
			userId: locals.userId,
			status: 'ARCHIVED'
		},
		orderBy: {
			updatedAt: 'desc'
		}
	});

	return { notes };
};
