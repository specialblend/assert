const assert = require('assert');
const { compose, join, map, values, path } = require('ramda');
const { inspect } = require('util');

const formatArgs = compose(join(', '), map(inspect), values);
const formatCaller = ({ name, arguments: argv }) => `${name}(${formatArgs(argv)})`;
const formatMessage = (message, trace) => `${message} at call: ${trace}`;

module.exports = function(expression, message) {
    try {
        const caller = path(['callee', 'caller'], arguments);
        const trace = formatCaller(caller);
        const payload = formatMessage(message, trace);
        return assert(expression, payload);
    } catch (err) {
        if (err instanceof TypeError && err.message === '\'caller\', \'callee\', and \'arguments\' properties may not be accessed on strict mode functions or the arguments objects for calls to them') {
            return assert(expression, message);
        }
        throw err;
    }
};
