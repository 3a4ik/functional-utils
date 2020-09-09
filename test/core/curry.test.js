import { assert } from 'chai';

import { curry } from '../../src/core/curry';

describe('curry', function() {
  describe('Not curried functions', function() {
    const func = curry(number => number + 10);

    it('Should work with not curried function', function() {
      const result = func(10);
      assert.equal(result, 20);
    });
  });

  describe('2-curried functions', function() {
    const func = curry((number1, number2) => number1 + number2);

    it('Should work with sequential calling', function() {
      const result1 = func(10);
      assert.isFunction(result1);

      const result2 = result1(20);
      assert.equal(result2, 30);
    });

    it('Should work with normal calling', function() {
      const result = func(10, 20);
      assert.equal(result, 30);
    });
  });

  describe('N-curried functions', function() {
    const func = curry((number1, number2, number3) => number1 + number2 + number3);

    it('Should work with sequential calling', function() {
      const result1 = func(10);
      assert.isFunction(result1);

      const result2 = result1(20);
      assert.isFunction(result2);

      const result3 = result2(30);
      assert.equal(result3, 60);
    });

    it('Should work with normal and sequential calling', function() {
      const result1 = func(10, 20);
      assert.isFunction(result1);

      const result2 = result1(30);
      assert.equal(result2, 60);
    });

    it('Should work with sequential and normal calling', function() {
      const result1 = func(10);
      assert.isFunction(result1);

      const result2 = result1(20, 30);
      assert.equal(result2, 60);
    });

    it('Should work with normal calling', function() {
      const result = func(10, 20, 30);
      assert.equal(result, 60);
    });
  });
});
