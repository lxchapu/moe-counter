import { Router, error, html, json } from 'itty-router';
import themes from '../themes';
import indexHtml from './index.html';
import { getNum, setNum } from './d1.js';

const vaildateId = (req) => {
  const { id } = req.params;
  if (!/^[a-z0-9:.@_-]{1,256}$/i.test(id)) {
    return error(400, 'Invalid Counter ID');
  }
};

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

const router = Router();

router.get('/', () => html(indexHtml));
router.get('/favicon.ico', () => error(404));

router.get('/heart-beat', () => {
  return new Response('alive', {
    headers: {
      'Cache-Control': 'max-age=0, no-cache, no-store, must-revalidate',
    },
  });
});

router.get('/record/:id', vaildateId, async (req, env) => {
  const { id } = req.params;

  const num = await getNum(env.DB, id);

  return json({ id, num });
});

router.get('/:id', vaildateId, async (req, env) => {
  const { id } = req.params;
  let { theme } = req.query;

  if (!theme || !themes[theme]) {
    theme = env.DEFAULT_THEME;
  }

  let count = 0,
    length = env.DEFAULT_LENGTH;

  if (id === 'demo') {
    count = 123456789;
    length = 10;
  } else {
    count = await getNum(env.DB, id);
    count += 1;
    await setNum(env.DB, id, count);
  }
  const image = getCountImage(count, theme, length, true);

  return new Response(image, {
    headers: {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Cache-Control': id === 'demo' ? 'public, max-age=31536000' : 'max-age=0, no-cache, no-store, must-revalidate',
    },
  });
});

router.all('*', () => error(404));

export default {
  fetch: (req, ...args) =>
    router
      .handle(req, ...args)
      .then(json)
      .catch(error),
};
