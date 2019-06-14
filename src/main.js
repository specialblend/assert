const R = require('ramda');
const assert = require('assert');
const { compose, join, map, path, values } = R;
const { inspect } = require('util');

const formatArgs = compose(join(', '), map(inspect), values);
const formatCaller = ({ name, arguments: argv }) => `${name}(${formatArgs(argv)})`;
const formatMessage = (message, trace) => `${message} at call: ${trace}`;

const traceCaller = R.compose(formatCaller, path(['callee', 'caller']));

module.exports = function(expression, message) {
    let caller = null;
    try {
        caller = traceCaller(arguments);
    } catch (err) {
        return assert(expression, message);
    }
    const payload = formatMessage(message, caller);
    return assert(expression, payload);
};
