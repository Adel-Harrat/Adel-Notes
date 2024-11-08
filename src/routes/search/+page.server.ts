import prisma from '$lib/prisma';
import { kindeAuthClient, type SessionManager } from '@kinde-oss/kinde-auth-sveltekit';
import type { PageServerLoad } from '../$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ url, locals }) => {
	const searchQuery = url.searchParams.get('q') ?? '';

	if (searchQuery.trim() === '') {
		redirect(303, '/');
	}

	try {
		const searchResults = await prisma.note.findMany({
			where: {
				OR: [
					{
						title: {
							contains: searchQuery,
							mode: 'insensitive'
						},
						userId: locals.userId
					},
					{
						content: {
							contains: searchQuery,
							mode: 'insensitive'
						},
						userId: locals.userId
					}
				]
			},
			orderBy: {
				createdAt: 'desc'
			}
		});

		return {
			type: 'success',
			searchResults,
			searchQuery
		};
	} catch {
		return {
			type: 'error',
			message: 'Something went wrong!'
		};
	}
};
