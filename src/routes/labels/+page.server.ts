import { kindeAuthClient, type SessionManager } from '@kinde-oss/kinde-auth-sveltekit';
import type { Actions, PageServerLoad } from './$types';
import prisma from '$lib/prisma';

export const load: PageServerLoad = async ({ locals }) => {
	try {
		const labels = await prisma.label.findMany({
			where: {
				userId: locals.userId
			},
			orderBy: { createdAt: 'desc' }
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
	create: async ({ locals, request }) => {
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

		try {
			const isLabelUnique = !(await prisma.label.findFirst({
				where: {
					name: {
						equals: name,
						mode: 'insensitive'
					},
					userId: locals.userId
				}
			}));

			if (!isLabelUnique) {
				return {
					action: 'create',
					type: 'error',
					message: `Label ${name} already exists`,
					name
				};
			}

			const label = await prisma.label.create({
				data: {
					name,
					userId: locals.userId!
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

	delete: async ({ request, locals }) => {
		const formData = await request.formData();
		const labelId = formData.get('id')?.toString() ?? '';

		try {
			const label = await prisma.label.findFirst({
				where: {
					id: labelId,
					userId: locals.userId
				}
			});

			if (!label) {
				return {
					type: 'error',
					message: 'Label not found' // Or that the user does not own it
				};
			}

			const notes = await prisma.note.findMany({
				where: {
					userId: locals.userId,
					labels: {
						has: labelId
					}
				}
			});

			if (notes.length > 0) {
				return {
					action: 'delete',
					type: 'error',
					message: 'Cannot delete label with notes.'
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

	update: async ({ request, locals }) => {
		const formData = await request.formData();
		const name = formData.get('name')?.toString() ?? '';
		const labelId = formData.get('id')?.toString() ?? '';

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
					userId: locals.userId
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
				message: `Renamed to "${updatedLabel.name}".`
			};
		} catch {
			return {
				type: 'error',
				message: 'Something went wrong'
			};
		}
	}
} satisfies Actions;
