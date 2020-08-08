/** @format */

const Box = (x) => ({
  map: (f) => Box(f(x)),
  fold: (f) => f(x),
  inspect: `Box(${x})`,
});

// defining `compose` in terms of `Box`
const compose = (f, g) => (x) => Box(x).map(f).fold(g);

const Box = (x) => ({
  map: (f) => Box(f(x)),
  fold: (f) => f(x),
  toString: () => `Box(${x})`,
});

// Exercise: Box
// Goal: Refactor each example using Box
// Keep these tests passing!
// Bonus points: no curly braces

const _ = R;

// Ex1: Using Box, refactor moneyToFloat to be unnested.
// =========================
const moneyToFloat_ = (str) => parseFloat(str.replace(/\$/, ''));

const moneyToFloat = (str) =>
  Box(str)
    .map((str) => str.replace(/\$/, ''))
    .fold(parseFloat);

QUnit.test('Ex1: moneyToFloat', (assert) => {
  assert.equal(String(moneyToFloat('$5.00')), 5);
});

// Ex2: Using Box, refactor percentToFloat to remove assignment
// =========================
const percentToFloat_ = (str) => {
  const float = parseFloat(str.replace(/\%/, ''));
  return float * 0.01;
};

const percentToFloat = (str) =>
  Box(str).map(_.replace(/\%/, '')).map(parseFloat).fold(_.multiply(0.01));

QUnit.test('Ex2: percentToFloat', (assert) => {
  assert.equal(String(percentToFloat('20%')), 0.2);
});

// Ex3: Using Box, refactor applyDiscount (hint: each variable introduces a new Box)
// =========================
const applyDiscount_ = (price, discount) => {
  const cents = moneyToFloat(price);
  const savings = percentToFloat(discount);
  return cents - cents * savings;
};

const applyDiscount__ = (price, discount) =>
  Box(price).fold(moneyToFloat) -
  Box(price).fold(moneyToFloat) * Box(discount).fold(percentToFloat);

const applyDiscount = (price, discount) =>
  Box(moneyToFloat(price)).fold((cents) =>
    Box(percentToFloat(discount)).fold((savings) => cents - cents * savings)
  );

QUnit.test('Ex3: Apply discount', (assert) => {
  assert.equal(String(applyDiscount('$5.00', '20%')), 4);
});
