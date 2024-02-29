import { Router, error, html, json } from 'itty-router';
import config from '../config.yml';
import { getNum, setNum } from './db.js';
import { getCountImage } from './utils.js';
import { validateId } from './middlewares.js';
import indexHtml from './index.html';
import themes from '../themes';

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

router.get('/record/:id', validateId, async (req, env) => {
  const { id } = req.params;

  const num = await getNum(env.DB, id);

  return json({ id, num });
});

router.get('/:id', validateId, async (req, env) => {
  const { id } = req.params;
  let { theme } = req.query;

  if (!theme || !themes[theme]) {
    theme = config.theme;
  }

  let count = 0,
    length = config.length;

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
