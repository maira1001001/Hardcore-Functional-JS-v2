<!-- @format -->

# Hardcore Functional JS v2

* Course: [Hardcore Functional JS v2](https://frontendmasters.com/courses/hardcore-js-v2/)
* Duration: 3 hours, 44 minutes
* Teacher: [Brian Lonsdorf](https://twitter.com/drboolean?lang=es), Salesforce
* Content:
	- Currying
	- Composition
	- Functors
	- Either Monad
	- Task

# JS functional programming

## function properties

### definitions

1. `total`: every element has an output
2. `deterministic`: same input, same output
3. `no observable side-effects`: besides computing values

### examples

1. `with side effects`: i am reassigning the array `x`

```
x=[1,2,3,4]
x.splice(0,3) // [1,2,3]
x.splice(0,3) // [4]
x.splice(0,3) // []
```

1. `with side-effects`: I am reassigning the user object, we are muttating the user age

```
user = { name: 'mai', age: 32 }
const birthday = user => {
    user.age += 1;
    return user;
}
birthday(user) // { name: 'mai', age: 33 }
birthday(user) // { name: 'mai', age: 34 }
birthday(user) // { name: 'mai', age: 35 }
birthday(user) // { name: 'mai', age: 36 }
```

3. `pure function` : same input, same output and works for every string

```
const shout = (word) => word.toUpperCase().concat("!");
shout('maira') // MAIRA!
shout('maira') // MAIRA!
shout('maira') // MAIRA!
```

4. `non-deterministic` : `querySelector` is an function from outside, it a DOM interaction, it might return a value or might not.

```
const headerText = header_selector =>
    querySelector(header_selector).text()
```

5. `non-deterministic`: no input, any returned value. `location.search` might find or might not.

```
const parseQuery = () =>
    location.search.substring(1).split('&').map(x => x.split('='))
```

We can turn this function into a pure-function:

```
const parseQuery = (locationSearch) =>
    locationSearch.substring(1).split('&').map(x => x.split('='))
```

## properties of pure-functions

1. _reliable_: you can trust -> same input, same output! there is not a surprise and you can trust in the function behaviour and it is not chaging the outisde state
2. _portable_: you can grab your function and paste it anywhere. It is not stuck (TODO: review this definition!)
3. _reusable_: you can reuse your function anywhere!
4. _testable_: because of the test definition: for an input, you "expect" some output!
5. _composable_: you can compose functions: f(g(x))
6. _properties/contract_ TODO: i don't know what that means

# currying

```
const add = (x, y) => x + y;
const curry = x => y => f(x,y);
const uncurry = (x, y) => f(x)(y)
const curryAdd = curry(add)
const add5 = curryAdd(5)
add5(8) // 13
```

> When do I use curry?

When I wan to remember an argument. For example,

```
var eq = curry((x,y) => x == y);
var mod = curry((x,y) => y % x);
var isOdd = compose(eq(1), mod(2)) // compose is a function
var filter = curry((fn,xs) => xs.filter(fn));
var getOdds = filter(isOdd);
getOdds([1,2,3,4,5]); // 1,3,5
```

`filterOdds` remember (closure) the function `isOdd`. There is one _rule_:

> the data (xs) goes at the end

This follow the rule:

```
var filter = curry((fn,xs) => xs.filter(fn));
```

This doesn't follow the rule:

```
var filter = curry((xs,fn) => xs.filter(fn));
```

Because we define the operation and then we use the data to apply this operations! In this case, we define a function `getOdds` that filters all the odds number and returns it. The next step is to take the data (the numbers), `xs`, and just process it.

# importing curry

[Rambda, libs with a functional flavor](https://ramdajs.com/)

```
const { curry } = require('ramda');
const replace = curry((regex, replacement, str) => str.replace(regex, str));
const replaceVowels = replace(/[AEIOU]/ig, "*")
replaceVowels("Hey, I am using ramdajs"); // "H*y, * *m *s*ng r*md*ajs"
```

# functors

Defining a `Box`. it is a functor because it has a map method.

```
const Box = (x) => ({
  map: (f) => Box(f(x)),
  fold: (f) => f(x),
  inspect: `Box(${x})`,
});
```

# either monad

problem: call a function with undefined
