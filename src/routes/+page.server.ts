import prisma from '$lib/prisma';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const notes = await prisma.note.findMany({
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
	addNewNote: async () => {
		try {
			const randomImage = getRandomPlaceholder();

			await prisma.note.create({
				data: {
					title: 'Default Title',
					content: 'Default Content',
					image: randomImage as string
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
