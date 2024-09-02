/**
 * Creates a standard response for successful operations.
 *
 * This function wraps the provided data in an array with a `null` error value, indicating a successful operation.
 *
 * @param {*} data - The data to be returned in the response.
 * @returns {Array} An array with a `null` error value and the provided data.
 *
 * @example
 * // Example of creating a success response with user information:
 * const userData = { id: 1, name: "John Doe", email: "john@example.com" };
 * const successResponse = success(userData);
 * console.log(successResponse);
 * // Output: [null, { id: 1, name: "John Doe", email: "john@example.com" }]
 */
export function success(data) {
  return [null, data];
}

/**
 * Creates a standard response for failed operations.
 *
 * This function wraps an error message, stack trace, and name in an object, indicating a failed operation.
 *
 * @param {string} message - The error message to be returned in the response.
 * @param {string} stack - The stack trace associated with the error.
 * @param {string} name - The name of the error.
 * @returns {Array} An array with an error object containing the provided error message, stack trace, and name, and a `null` data value.
 *
 * @example
 * // Example of creating an error response:
 * const errorMessage = "An unexpected error occurred.";
 * const errorStack = "Error: at Object.<anonymous> (path/to/file.js:1:23)";
 * const errorResponse = err(errorMessage, errorStack, "SomeErrorName");
 * console.log(errorResponse);
 * // Output: [{ message: "An unexpected error occurred.", stack: "Error: at Object.<anonymous> (path/to/file.js:1:23)", name: "SomeErrorName" }, null]
 */
export function err(message, stack, name) {
  return [
    {
      message,
      stack,
      name,
    },
    null,
  ];
}
