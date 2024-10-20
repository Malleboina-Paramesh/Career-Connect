/**
 * this is a list of routes that are public
 * @type {string[]}
 */
export const PublicRoutes = ["/", "/contact", "/contact", "/api/uploadthing"];

/**
 * this is a list of routes that require authentication
 * @type {string[]}
 */
export const AuthRoutes = ["/login"];

/**
 * after a user logs in, they will be redirected to this route
 * @type {string}
 */
export const DEFAULT_REDIRECT = "/dashboard";

/**
 *  the default login route
 * @type {string}
 */
export const DEFAULT_LOGIN = "/login";

/**
 * auth prefix
 * @type {string}
 */
export const AUTH_PREFIX = "/api/auth";
