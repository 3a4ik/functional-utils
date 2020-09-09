import { assert } from 'chai';

import { uniq, uniqBy, uniqWith } from '../../src/functions/uniq';

describe('uniq.js', function() {
  describe('uniq', function() {
    describe('String primitives', function() {
      it('Should uniq unique array', function() {
        const array = ['a', 'b', 'c'];
        const result = uniq(array);

        assert.deepEqual(result, array);
      });

      it('Should uniq NOT unique array', function() {
        const array = ['a', 'b', 'c', 'a', 'd', 'd', 'a'];
        const result = uniq(array);

        assert.deepEqual(result, ['a', 'b', 'c', 'd']);
      });

      it('Should uniq NOT unique array with empty strings', function() {
        const array = ['a', 'b', 'c', 'a', '', 'd', 'a'];
        const result = uniq(array);

        assert.deepEqual(result, ['a', 'b', 'c', '', 'd']);
      });
    });

    describe('Number primitives', function() {
      it('Should uniq unique array', function() {
        const array = [1, 2, 3];
        const result = uniq(array);

        assert.deepEqual(result, array);
      });

      it('Should uniq NOT unique array', function() {
        const array = [1, 2, 3, 7, 1, 0, 2, 1, 2, 0, 8];
        const result = uniq(array);

        assert.deepEqual(result, [1, 2, 3, 7, 0, 8]);
      });
    });

    describe('Boolean primitives', function() {
      it('Should uniq unique array', function() {
        const array = [true, false];
        const result = uniq(array);

        assert.deepEqual(result, array);
      });

      it('Should uniq NOT unique array', function() {
        const array = [true, false, true, true, false];
        const result = uniq(array);

        assert.deepEqual(result, [true, false]);
      });
    });

    describe('Mixed primitives', function() {
      describe('Strings and numbers', function() {
        it('Should uniq unique array', function() {
          const array = ['a', 'b', 1, '5', 'aaa'];
          const result = uniq(array);

          assert.deepEqual(result, ['a', 'b', 1, '5', 'aaa']);
        });

        it('Should uniq NOT unique array', function() {
          const array = ['a', 'b', 1, '5', 1, 'a', 'a', 'aaa'];
          const result = uniq(array);

          assert.deepEqual(result, ['a', 'b', 1, '5', 'aaa']);
        });
      });

      describe('Numbers and booleans', function() {
        it('Should uniq unique array', function() {
          const array = [6, true, 4, false, 0, 1];
          const result = uniq(array);

          assert.deepEqual(result, [6, true, 4, false, 0, 1]);
        });

        it('Should uniq NOT unique array', function() {
          const array = [1, 1, false, 0, 3, 6];
          const result = uniq(array);

          assert.deepEqual(result, [1, false, 0, 3, 6]);
        });
      });

      describe('Strings and booleans', function() {
        it('Should uniq unique array', function() {
          const array = ['a', 'b', true, '5', 'aaa', false];
          const result = uniq(array);

          assert.deepEqual(result, ['a', 'b', true, '5', 'aaa', false]);
        });

        it('Should uniq NOT unique array', function() {
          const array = ['a', 'b', true, '5', true, false, 'a', true, 'a', 'aaa'];
          const result = uniq(array);

          assert.deepEqual(result, ['a', 'b', true, '5', false, 'aaa']);
        });
      });

      describe('Strings, numbers and booleans', function() {
        it('Should uniq unique array', function() {
          const array = ['a', 'b', 1, '5', true, 'aaa'];
          const result = uniq(array);

          assert.deepEqual(result, ['a', 'b', 1, '5', true, 'aaa']);
        });

        it('Should uniq NOT unique array', function() {
          const array = ['a', true, 'b', 1, '5', 1, 'a', 'a', true, 'aaa', false];
          const result = uniq(array);

          assert.deepEqual(result, ['a', true, 'b', 1, '5', 'aaa', false]);
        });
      });
    });
  });

  describe('uniqBy', function() {
    it('Should uniq unique array of objects by field name', function() {
      const array = [
        { id: 1, name: 'Denis' },
        { id: 2, name: 'Arthur' },
        { id: 3, name: 'Vadim' },
        { id: 4, name: 'Anna' }
      ];
      const result = uniqBy('name', array);

      assert.deepEqual(result, [
        { id: 1, name: 'Denis' },
        { id: 2, name: 'Arthur' },
        { id: 3, name: 'Vadim' },
        { id: 4, name: 'Anna' }
      ]);
    });

    it('Should uniq NOT unique array of objects by field name', function() {
      const array = [
        { id: 1, name: 'Denis' },
        { id: 2, name: 'Arthur' },
        { id: 3, name: 'Denis' },
        { id: 4, name: 'Anna' }
      ];
      const result = uniqBy('name', array);

      assert.deepEqual(result, [
        { id: 1, name: 'Denis' },
        { id: 2, name: 'Arthur' },
        { id: 4, name: 'Anna' }
      ]);
    });
  });

  describe('uniqWith', function() {
    it('Should uniq unique array of primitives using comparator', function() {
      const array = ['a', 'b', 1, '5', true, 'aaa'];
      const result = uniqWith((value, otherValue) => value === otherValue, array);

      assert.deepEqual(result, ['a', 'b', 1, '5', true, 'aaa']);
    });

    it('Should uniq NOT unique array of primitives using comparator', function() {
      const array = ['a', true, 'b', 1, '5', 1, 'a', 'a', true, 'aaa', false];
      const result = uniqWith((value, otherValue) => value === otherValue, array);

      assert.deepEqual(result, ['a', true, 'b', 1, '5', 'aaa', false]);
    });

    it('Should uniq unique array of objects using comparator', function() {
      const array = [
        { id: 1, name: 'Denis' },
        { id: 2, name: 'Arthur' },
        { id: 3, name: 'Vadim' },
        { id: 4, name: 'Anna' }
      ];
      const result = uniqWith((value, otherValue) => value.name === otherValue.name, array);

      assert.deepEqual(result, [
        { id: 1, name: 'Denis' },
        { id: 2, name: 'Arthur' },
        { id: 3, name: 'Vadim' },
        { id: 4, name: 'Anna' }
      ]);
    });

    it('Should uniq NOT unique array of objects using comparator', function() {
      const array = [
        { id: 1, name: 'Denis' },
        { id: 2, name: 'Arthur' },
        { id: 3, name: 'Denis' },
        { id: 4, name: 'Anna' }
      ];
      const result = uniqWith((value, otherValue) => value.name === otherValue.name, array);

      assert.deepEqual(result, [
        { id: 1, name: 'Denis' },
        { id: 2, name: 'Arthur' },
        { id: 4, name: 'Anna' }
      ]);
    });
  });
});
