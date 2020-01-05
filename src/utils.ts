import crypto from "crypto";

/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 */
export function getRandomString(length: number): string {
   return crypto.randomBytes(Math.ceil(length / 2))
           .toString('hex') /** convert to hexadecimal format */
           .slice(0, length);   /** return required number of characters */
}

/**
 * hash password with sha512.
 * @function
 * @param {string} password - List of required fields.
 * @param {string} salt - Data to be validated.
 */
export function sha512(password: string, salt: string): string {
    const hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    return hash.digest('hex');
}
