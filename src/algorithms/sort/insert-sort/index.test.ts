/**
 * @author iWuzhi
 * @date 2021-02-02 23:05:33
 */

import insertSort from '.';

describe('InsertSort', () => {
  const source = [3, 2, 1];
  const target = insertSort([3, 2, 1]);
  test('[3, 2, 1] should be [1, 2, 3]', () => {
    expect(target).toEqual([1, 2, 3]);
  });
  test('source should equal target', () => {
    expect(source === target);
  });
  describe('Random test', () => {
    test('[10, 1, 20, 30, 7, 8, 6] => [1, 6, 7, 8, 10, 20, 30]', () => {
      expect(insertSort([10, 1, 20, 30, 7, 8, 6])).toEqual([1, 6, 7, 8, 10, 20, 30]);
    });
    test('[1, 2, 3, 4, 5] => [1, 2, 3, 4, 5]', () => {
      expect(insertSort([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
    });
    test('[7, 1, 2, 3, 4, 5] => [1, 2, 3, 4, 5, 7]', () => {
      expect(insertSort([7, 1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5, 7]);
    });
  });
});
