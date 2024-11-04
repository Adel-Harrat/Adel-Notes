import prisma from '$lib/prisma';
import { error, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';
import { NoteStatus } from '@prisma/client';

export const load: PageServerLoad = async ({ params }) => {
	const note = await prisma.note.findFirst({
		where: {
			id: params.noteId
		}
	});

	if (note) {
		return { note };
	}

	error(404, 'Note not found');
};

export const actions = {
	default: async ({ params, request }) => {
		const data = await request.formData();
		const title = data.get('title')?.toString() ?? 'Untitled note';
		const content = data.get('content')?.toString();
		const status = data.get('status')?.toString() ?? 'NORMAL';

		// Make sure the note exists
		const note = await prisma.note.findFirst({
			where: {
				id: params.noteId
			}
		});

		if (!note) {
			return {
				type: 'error',
				message: 'Not Not Found!'
			};
		}

		// Update the note
		try {
			await prisma.note.update({
				where: {
					id: params.noteId
				},
				data: {
					title,
					content,
					status: status as NoteStatus
				}
			});

			return {
				type: 'success',
				message: 'Your note has been successfully updated!'
			};
		} catch (error) {
			return {
				type: 'error',
				message: 'Something went wrong! We could not update your note.'
			};
		}
	}
} satisfies Actions;
