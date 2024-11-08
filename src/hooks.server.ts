import {
	kindeAuthClient,
	sessionHooks,
	type Handler,
	type SessionManager
} from '@kinde-oss/kinde-auth-sveltekit';

export const handle: Handler = async ({ event, resolve }) => {
	sessionHooks({ event });

	// Is user logged in?
	const isAuthenticated = await kindeAuthClient.isAuthenticated(
		event.request as unknown as SessionManager
	);

	// Yes
	if (isAuthenticated) {
		const loggedInUser = await kindeAuthClient.getUser(event.request as unknown as SessionManager);

		// assign user credentials to locals
		event.locals.userId = loggedInUser.id;
		event.locals.userName =
			`${loggedInUser?.given_name ?? ''} ${loggedInUser?.family_name ?? ''}`.trim() ||
			loggedInUser.email;
		event.locals.userImg = loggedInUser.picture ?? '/placeholder/fallback.png';
		event.locals.userNameFallback = `${(loggedInUser?.given_name?.[0] || '').toUpperCase()}${(loggedInUser?.family_name?.[0] || '').toUpperCase()}`;

		// No
	} else {
		event.locals.userId = undefined;
		event.locals.userName = undefined;
		event.locals.userImg = undefined;
		event.locals.userNameFallback = undefined;
	}

	const response = await resolve(event);
	return response;
};
