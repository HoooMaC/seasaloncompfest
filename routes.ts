/**
 * Array of routes that specifies the routes doesn't need authentication
 * Everyone can access it
 * @type {string[]}
 */
export const publicRoutes = ['/', '/book'];

/**
 * Array of routes that specifies the routes for authentication
 * Logged in user will be redirected
 * @type {string[]}
 */
export const authRoutes = ['/register', '/login'];

/**
 *
 *
 * @type {string}
 */
export const apiAuthPrefix = '/api/auth';

/**
 * The routes that can only accessed by admin
 *
 * @type {string}
 */
export const adminPrefix = '/admin';

/**
 *
 *
 */
export const DEFAULT_LOGIN_REDIRECT = '/';
