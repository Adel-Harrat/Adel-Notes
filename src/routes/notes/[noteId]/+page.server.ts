import type { PageServerLoad } from './$types';
import prisma from '$lib/prisma';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, locals }) => {
	let note = await prisma.note.findFirst({
		where: {
			userId: locals.userId,
			id: params.noteId
		}
	});

	const labels = await prisma.label.findMany({
		where: {
			userId: locals.userId,
			id: {
				in: note?.labels
			}
		}
	});

	if (note) {
		return {
			note: {
				...note,
				labels
			}
		};
	}

	error(404, 'Note not found');
};
