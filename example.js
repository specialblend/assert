const assert = require('./src/main');

function checkYoSelfFoo(first, second) {
    assert(first === second, `they say it dont be like ${first}, but ${second}!`);
}

checkYoSelfFoo('it is', 'it do', 'no doubt', 'no doubt', 'no doubt');
