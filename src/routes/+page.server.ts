import prisma from '$lib/prisma';
import { type RequestEvent } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const notes = await prisma.note.findMany({
		where: {
			userId: locals.userId,
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
	addNewNote: async ({ request, locals }: RequestEvent) => {
		try {
			const randomImage = getRandomPlaceholder();

			const notesCount = await prisma.note.count({
				where: {
					userId: locals.userId
				}
			});

			if (notesCount > 10) {
				return {
					type: 'error',
					message:
						'You have reached the maximum number of notes (10). Please delete some notes if you want to add a new one.'
				};
			}

			await prisma.note.create({
				data: {
					title: 'Untitled Note',
					image: randomImage as string,
					userId: locals.userId!
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
