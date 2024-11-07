import prisma from '$lib/prisma';
import { kindeAuthClient, type SessionManager } from '@kinde-oss/kinde-auth-sveltekit';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, request }) => {
	const loggedInUser = await kindeAuthClient.getUser(request as unknown as SessionManager);
	const labelId = params.labelId;

	try {
		const label = await prisma.label.findFirst({
			where: {
				id: labelId,
				userId: loggedInUser.id
			}
		});

		if (!label) {
			error(404, 'Label not found');
		}

		const notes = await prisma.note.findMany({
			where: {
				userId: loggedInUser.id,
				labels: {
					has: labelId
				}
			},
			orderBy: {
				updatedAt: 'desc'
			}
		});

		return {
			notes,
			label
		};
	} catch {
		error(404, 'Label not found!');
	}
};
