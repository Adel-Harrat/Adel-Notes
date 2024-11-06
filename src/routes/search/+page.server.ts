import prisma from '$lib/prisma';
import { kindeAuthClient, type SessionManager } from '@kinde-oss/kinde-auth-sveltekit';
import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async ({ url, request }) => {
	const searchQuery = url.searchParams.get('q') ?? '';
	const loggedInUser = await kindeAuthClient.getUser(request as unknown as SessionManager);

	try {
		const searchResults = await prisma.note.findMany({
			where: {
				OR: [
					{
						title: {
							contains: searchQuery,
							mode: 'insensitive'
						},
						userId: loggedInUser.id
					},
					{
						content: {
							contains: searchQuery,
							mode: 'insensitive'
						},
						userId: loggedInUser.id
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
