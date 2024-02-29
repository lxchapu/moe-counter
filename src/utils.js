import themes from '../themes';

/**
 * @param {number} count 需要显示的数字
 * @param {string} theme 主题
 * @param {number} length 数字总长度
 * @param {boolean} pixelated 是否像素化
 * @returns
 */
const getCountImage = (count, theme, length, pixelated) => {
  const countArray = count.toString().padStart(length, '0').split('');

  const { width, height, images } = themes[theme];
  let x = 0;
  const parts = countArray.reduce((pre, cur) => {
    const uri = images[cur];
    const image = `<image x="${x}" y="0" width="${width}" height="${height}" href="${uri}"/>`;
    x += width;
    return pre + image;
  }, '');

  return (
    '<?xml version="1.0" encoding="UTF-8"?>' +
    `<svg width="${x}" height="${height}" version="1.1"` +
    ' xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"' +
    `${pixelated ? ' style="image-rendering: pixelated"' : ''}>` +
    `<title>Moe Counter</title><g>${parts}</g></svg>`
  );
};

export { getCountImage };
