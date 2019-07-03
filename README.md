# @specialblend/assert

assert utility that prints its calling function (name and arguments) to the exception stacktrace

## Install

`npm i @specialblend/assert`

## Example

```javascript
const assert = require('@specialblend/assert');

function checkYoSelfFoo(first, second) {
    assert(first === second, `they say it dont be like ${first}, but ${second}!`);
}

checkYoSelfFoo('it is', 'it do', 'no doubt', 'no doubt', 'no doubt');
```

will throw with this stacktrace:
```
AssertionError [ERR_ASSERTION]: they say it dont be like it is, but it do!
    at checkYoSelfFoo('it is', 'it do', 'no doubt', 'no doubt', 'no doubt')
    at checkYoSelfFoo (/Users/specialblend/workspace/assert/example.js:4:5)
    at Object.<anonymous> (/Users/specialblend/workspace/assert/example.js:7:1)
    at Module._compile (internal/modules/cjs/loader.js:776:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:787:10)
    at Module.load (internal/modules/cjs/loader.js:653:32)
    at tryModuleLoad (internal/modules/cjs/loader.js:593:12)
    at Function.Module._load (internal/modules/cjs/loader.js:585:3)
    at Function.Module.runMain (internal/modules/cjs/loader.js:829:12)
    at startup (internal/bootstrap/node.js:283:19)

```

## Javascript Language Limitations

1. Cannot trace arrow functions
2. Undesirable behavior under strict mode (`use strict`)
