import prisma from '$lib/prisma';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const notes = await prisma.note.findMany();
	return { notes };
};

export const actions = {
	addNewNote: async () => {
		try {
			await prisma.note.create({
				data: {
					title: 'Default Title',
					content: 'Default Content'
				}
			});

			return {
				success: true,
				message: 'Note added successfully'
			};
		} catch {
			return {
				success: false,
				message: 'Failed to add note'
			};
		}
	}
} satisfies Actions;
