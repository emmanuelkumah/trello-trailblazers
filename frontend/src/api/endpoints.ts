export const AUTH_ENDPOINTS = {
	LOGIN: 'auth/login',
	REGISTER: 'auth/register',
	LOGOUT: 'auth/logout',
	GET_OTP: 'auth/otp/request-reset-otp',
	VERIFY_OTP: 'auth/otp/verify-reset-otp',
	RESET_PASSWORD: 'auth//otp/reset-password',
}

export const USER_ENDPOINTS = {
	GET_USER_BY_ID: (id: string) => `users/${id}`,
	UPDATE_USER: (id: string) => `users/${id}`,
	DELETE_USER: (id: string) => `users/${id}`,
}

export const GROUP_ENDPOINTS = {
	CREATE_GROUP: 'groups',
	GET_ALL_GROUPS: 'groups',
	JOIN_GROUP_BY_CODE: 'groups/join',
	GET_GROUP_BY_ID: (id: string) => `groups/${id}`,
	GET_GROUP_BY_CODE: (code: string) => `API/groups/code/${code}`,
	GET_GROUP_BY_SLUG: (slug: string) => `API/groups/slug/${slug}`,
	DELETE_GROUP: (id: string) => `groups/${id}`, //DELETE
	UPDATE_GROUP: (id: string) => `groups/${id}`, //PATCH
}

export const EXPENSES_ENDPOINTS = {
	CREATE_EXPENSE: (id: string) =>`expenses/${id}`,
	GET_EXPENSE_BY_GROUP: (id: string) => `expenses/group/${id}`,
	DELETE_EXPENSE: (id: string) => `expenses/${id}`,
	GET_EXPENSE_BY_ID: (groupId: string, expenseId: string) => `expenses/${groupId}/expenses/${expenseId}`,
}

export const COMMENT_ENDPOINTS = {
	CREATE_EXPENSE_COMMENT: (groupId: string, expenseId: string) => `expenses/${groupId}/expenses/${expenseId}/comments`,
	// GET_COMMENTS_BY_EXPENSE: (id: string) => `comments/expense/${id}`,
	// DELETE_COMMENT: (id: string) => `comments/${id}`,
}