import { kindeAuthClient, type SessionManager } from '@kinde-oss/kinde-auth-sveltekit';
import type { Actions, PageServerLoad } from './$types';
import prisma from '$lib/prisma';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ request, params }) => {
	const loggedInUser = await kindeAuthClient.getUser(request as unknown as SessionManager);

	const note = await prisma.note.findFirst({
		where: {
			userId: loggedInUser.id,
			id: params.noteId
		}
	});

	if (note) {
		return { note };
	}

	error(404, 'Note not found');
};

export const actions = {
	setStatusToNormal: async ({ params }) => {
		try {
			await prisma.note.update({
				where: {
					id: params.noteId
				},
				data: {
					status: 'NORMAL'
				}
			});

			return {
				type: 'success'
			};
		} catch {
			return {
				type: 'error',
				message: 'Something Went Wrong!'
			};
		}
	},
	setStatusToFavorited: async ({ params }) => {
		try {
			await prisma.note.update({
				where: {
					id: params.noteId
				},
				data: {
					status: 'FAVORITED'
				}
			});

			return {
				type: 'success'
			};
		} catch {
			return {
				type: 'error',
				message: 'Something Went Wrong!'
			};
		}
	},
	setStatusToArchived: async ({ params }) => {
		try {
			await prisma.note.update({
				where: {
					id: params.noteId
				},
				data: {
					status: 'ARCHIVED'
				}
			});

			return {
				type: 'success'
			};
		} catch {
			return {
				type: 'error',
				message: 'Something Went Wrong!'
			};
		}
	},
	setStatusToDeleted: async ({ params }) => {
		try {
			await prisma.note.update({
				where: {
					id: params.noteId
				},
				data: {
					status: 'DELETED'
				}
			});

			return {
				type: 'success'
			};
		} catch {
			return {
				type: 'error',
				message: 'Something Went Wrong!'
			};
		}
	}
} satisfies Actions;
