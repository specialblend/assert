const assert = require('./main');
const testArgs = ['hello', 12.34, false, null];
const expectedArgsString = '\'hello\', 12.34, false, null';
const assertMessage = 'test assert message';

function fooNamedFunction() {
    assert(true === false, assertMessage);
}

const fooConstNamedFunction = function() {
    assert(true === false, assertMessage);
};

const fooArrowFunction = () => {
    assert(true === false, assertMessage);
};

describe('assert', () => {
    test('is a function', () => {
        expect(assert).toBeFunction();
    });
    describe('when called', () => {
        describe('from named function', () => {
            test('throws traced error', () => {
                expect.assertions(1);
                try {
                    fooNamedFunction(...testArgs);
                } catch (err) {
                    expect(err.message).toMatch(`${assertMessage} at call: fooNamedFunction(${expectedArgsString})`);
                }
            });
        });
        describe('from named const function', () => {
            test('throws traced error', () => {
                expect.assertions(1);
                try {
                    fooConstNamedFunction(...testArgs);
                } catch (err) {
                    expect(err.message).toMatch(`${assertMessage} at call: fooConstNamedFunction(${expectedArgsString})`);
                }
            });
        });
        describe('from arrow function', () => {
            test('throws untraced error', () => {
                expect.assertions(1);
                try {
                    fooArrowFunction(...testArgs);
                } catch (err) {
                    expect(err.message).toBe(assertMessage);
                }
            });
        });
    });
});
