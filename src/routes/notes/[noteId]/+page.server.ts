import { kindeAuthClient, type SessionManager } from '@kinde-oss/kinde-auth-sveltekit';
import type { PageServerLoad } from './$types';
import prisma from '$lib/prisma';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ request, params }) => {
	const loggedInUser = await kindeAuthClient.getUser(request as unknown as SessionManager);

	let note = await prisma.note.findFirst({
		where: {
			userId: loggedInUser.id,
			id: params.noteId
		}
	});

	const labels = await prisma.label.findMany({
		where: {
			userId: loggedInUser.id,
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
