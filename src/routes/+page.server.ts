import prisma from '$lib/prisma';
import { kindeAuthClient, type SessionManager } from '@kinde-oss/kinde-auth-sveltekit';
import { type RequestEvent } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ request }) => {
	// Get Current LoggedIn User
	const loggedInUser = await kindeAuthClient.getUser(request as unknown as SessionManager);

	const notes = await prisma.note.findMany({
		where: {
			userId: loggedInUser.id,
			status: {
				in: ['NORMAL', 'FAVORITED']
			}
		},
		orderBy: {
			createdAt: 'desc'
		}
	});

	return { notes };
};

const placeholderImages = [
	'/placeholder/1.svg',
	'/placeholder/2.svg',
	'/placeholder/3.svg',
	'/placeholder/4.svg',
	'/placeholder/5.svg',
	'/placeholder/6.svg',
	'/placeholder/7.svg',
	'/placeholder/8.svg',
	'/placeholder/9.svg',
	'/placeholder/10.svg'
];

function getRandomPlaceholder() {
	const randomIndex = Math.floor(Math.random() * placeholderImages.length);
	return placeholderImages[randomIndex];
}

export const actions = {
	addNewNote: async ({ request }: RequestEvent) => {
		try {
			const randomImage = getRandomPlaceholder();

			// Get User Id
			const loggedInUser = await kindeAuthClient.getUser(request as unknown as SessionManager);

			await prisma.note.create({
				data: {
					title: 'Untitled Note',
					image: randomImage as string,
					userId: loggedInUser.id
				}
			});

			return {
				type: 'success',
				message: 'Note added successfully'
			};
		} catch {
			return {
				type: 'error',
				message: 'Failed to add note'
			};
		}
	}
} satisfies Actions;
