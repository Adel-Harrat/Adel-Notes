import { kindeAuthClient, type SessionManager } from '@kinde-oss/kinde-auth-sveltekit';
import type { Actions, PageServerLoad } from './$types';
import prisma from '$lib/prisma';

export const load: PageServerLoad = async ({ request }) => {
	const loggedInUser = await kindeAuthClient.getUser(request as unknown as SessionManager);

	try {
		const labels = await prisma.label.findMany({
			where: {
				userId: loggedInUser.id
			}
		});

		return {
			labels
		};
	} catch {
		return {
			type: 'error',
			message: 'Something Went Wrong!'
		};
	}
};

export const actions = {
	create: async ({ request }) => {
		const formData = await request.formData();
		const name = formData.get('name')?.toString() ?? '';

		if (name.length < 3) {
			return {
				type: 'error',
				message: 'Label name must be at least 3 characters long.',
				data: {
					name
				}
			};
		}

		const loggedInUser = await kindeAuthClient.getUser(request as unknown as SessionManager);

		try {
			const label = await prisma.label.create({
				data: {
					name,
					userId: loggedInUser.id
				}
			});

			return {
				action: 'create',
				type: 'success',
				message: `Added ${label.name}.`
			};
		} catch {
			return {
				type: 'error',
				message: 'Something went wrong'
			};
		}
	},

	delete: async ({ request }) => {
		const formData = await request.formData();
		const labelId = formData.get('id')?.toString() ?? '';
		const loggedInUser = await kindeAuthClient.getUser(request as unknown as SessionManager);

		try {
			const label = await prisma.label.findFirst({
				where: {
					id: labelId,
					userId: loggedInUser.id
				}
			});

			if (!label) {
				return {
					type: 'error',
					message: 'Label not found' // Or that the user does not own it
				};
			}

			await prisma.label.delete({
				where: {
					id: label.id
				}
			});

			return {
				action: 'delete',
				type: 'success',
				message: `Deleted ${label.name}.`
			};
		} catch {
			return {
				type: 'error',
				message: 'Something went wrong'
			};
		}
	},

	update: async ({ request }) => {
		const formData = await request.formData();
		const name = formData.get('name')?.toString() ?? '';
		const labelId = formData.get('id')?.toString() ?? '';
		const loggedInUser = await kindeAuthClient.getUser(request as unknown as SessionManager);

		if (name.length < 3) {
			return {
				type: 'error',
				message: 'Label name must be at least 3 characters long.'
			};
		}

		try {
			const label = await prisma.label.findFirst({
				where: {
					id: labelId,
					userId: loggedInUser.id
				}
			});

			if (!label) {
				return {
					type: 'error',
					message: 'Label not found' // Or that the user does not own it
				};
			}

			if (name === label.name) {
				return {
					type: 'success',
					message: 'Nothing to update.'
				};
			}

			const updatedLabel = await prisma.label.update({
				where: {
					id: label.id
				},
				data: {
					name
				}
			});

			return {
				type: 'success',
				message: `Updated from "${label.name}" to "${updatedLabel.name}".`
			};
		} catch {
			return {
				type: 'error',
				message: 'Something went wrong'
			};
		}
	}
} satisfies Actions;
