const R = require('ramda');
const assert = require('assert');
const util = require('util');

const { join, insert, split, map, compose, converge, always, tap, tryCatch, path, concat, curry, prop } = R;

/**
 * Reconstruct caller function arguments
 */
const reconstructArguments = compose(
    join(', '),
    map(util.inspect),
    prop('arguments')
);

/**
 * Reconstruct caller function
 */
const reconstructCaller = converge(
    (name, argv) => `${name}(${argv})`,
    [prop('name'), reconstructArguments]
);

/**
 * Format stack trace message for caller
 */
const formatStackTraceLine = concat('    at ');

/**
 * Access caller function from arguments
 */
const getCaller = path(['callee', 'caller']);

/**
 * Reconstruct caller function or return null
 */
const resolveCaller = tryCatch(
    compose(
        reconstructCaller,
        getCaller,
    ),
    always(null)
);

/**
 * Inject caller into stack trace
 */
const injectCaller = curry(
    (message, stack) =>
        compose(
            join('\n'),
            insert(1, formatStackTraceLine(message)),
            tap(console.log),
            split('\n')
        )(stack)
);

/**
 * Assert and inject reconstructed caller into stack trace
 * @param {*} expression expression
 * @param {string} message message
 * @returns {void}
 */
module.exports = function assertTrace(expression, message) {
    try {
        assert(expression, message);
    } catch (err) {
        const caller = resolveCaller(arguments);
        if (caller) {
            err.stack = injectCaller(caller, err.stack);
        }
        throw err;
    }
};
