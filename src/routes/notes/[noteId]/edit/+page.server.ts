import prisma from '$lib/prisma';
import { error, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';
import { NoteStatus } from '@prisma/client';
import { kindeAuthClient, type SessionManager } from '@kinde-oss/kinde-auth-sveltekit';

export const load: PageServerLoad = async ({ params, request }) => {
	const loggedInUser = await kindeAuthClient.getUser(request as unknown as SessionManager);

	const note = await prisma.note.findFirst({
		where: {
			id: params.noteId
		}
	});

	const noteLabels = await prisma.label.findMany({
		where: {
			userId: loggedInUser.id,
			id: {
				in: note?.labels
			}
		}
	});

	const availableLabels = await prisma.label.findMany({
		where: {
			userId: loggedInUser.id
		},
		orderBy: { createdAt: 'desc' }
	});

	if (note) {
		return {
			note: {
				...note,
				labels: noteLabels
			},
			availableLabels
		};
	}

	error(404, 'Note not found');
};

export const actions = {
	default: async ({ params, request }) => {
		const loggedInUser = await kindeAuthClient.getUser(request as unknown as SessionManager);

		const data = await request.formData();
		const title = data.get('title')?.toString() ?? 'Untitled note';
		const content = data.get('content')?.toString();
		const status = data.get('status')?.toString() ?? 'NORMAL';
		const stringOfLabelsIds = data.get('selectedLabels')?.toString();
		const labels = stringOfLabelsIds?.split(',');

		// Make sure the note exists
		const note = await prisma.note.findFirst({
			where: {
				id: params.noteId,
				userId: loggedInUser.id
			}
		});

		if (!note) {
			return {
				type: 'error',
				message: 'Not Not Found!' // Or data the user is not the owner of this note
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
					status: status as NoteStatus,
					labels
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
