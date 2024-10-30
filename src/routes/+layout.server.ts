import { kindeAuthClient, type SessionManager } from '@kinde-oss/kinde-auth-sveltekit';
import type { RequestEvent } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

export async function load({ request }: RequestEvent) {
	const isAuthenticated = await kindeAuthClient.isAuthenticated(
		request as unknown as SessionManager
	);

	if (!isAuthenticated) {
		redirect(307, '/api/auth/login');
	}

	const user = await kindeAuthClient.getUser(request as unknown as SessionManager);

	return {
		isAuthenticated,
		user: {
			name: user.family_name || user.given_name || user.email,
			img: user.picture,
			id: user.id
		}
	};
}
