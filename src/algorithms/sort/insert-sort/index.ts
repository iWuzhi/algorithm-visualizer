/**
 * @author iWuzhi
 * @date 2021-02-02 22:19:06
 * @description Insert sort
 */

const insertSort = (source: number[]): typeof source => {
  for (let next = 1; next < source.length; next++) {
    for (let pre = next - 1; pre >= 0; pre--) {
      const cur = source[pre + 1];
      if (source[pre] > cur) {
        source[pre + 1] = source[pre];
        source[pre] = cur;
      } else {
        break;
      }
    }
  }
  return source;
};
export default insertSort;
