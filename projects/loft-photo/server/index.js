import { type } from 'node:os';
import pages from './pages';
import { listeners } from 'node:process';
import('./styles.css');

const pageNames = ['login', 'main', 'profile'];

document.addEventListener( type: 'click', listener () => {
  const pageName = model.getRandomElement(pageNames);
  pages.openPage(pageName);
  });







  

const http = require('node:http');
const https = require('node:https');
const url = require('node:url');

const DB = {
  tokens: new Map(),
  likes: new Map(),
  comments: new Map(),
};

const methods = {
  like(req, res, url, vkUser) {
    // todo
  },
  photoStats(req, res, url, vkUser) {
    // todo
  },
  postComment(req, res, url, vkUser, body) {
    // todo
  },
  getComments(req, res, url) {
    // todo
  },
};

http
  .createServer(async (req, res) => {
    console.log('➡️ Поступил запрос:', req.method, req.url);
    const token = req.headers['vk_token'];
    const parsed = new url.URL(req.url, 'http://localhost');
    const vkUser = await getMe(token);
    const body = await readBody(req);
    const method = parsed.searchParams.get('method');
    const responseData = await methods[method]?.(req, res, parsed, vkUser, body);

    res.end(JSON.stringify(responseData ?? null));
  })
  .listen('8888', () => {
    console.log('🚀 Сервер запущен');
  });

async function readBody(req) {
  if (req.method === 'GET') {
    return null;
  }

  return new Promise((resolve) => {
    let body = '';
    req
      .on('data', (chunk) => {
        body += chunk;
      })
      .on('end', () => resolve(JSON.parse(body)));
  });
}

async function getVKUser(token) {
  const body = await new Promise((resolve, reject) =>
    https
      .get(
        `https://api.vk.com/method/users.get?access_token=${token}&fields=photo_50&v=5.120`
      )
      .on('response', (res) => {
        let body = '';

        res.setEncoding('utf8');
        res
          .on('data', (chunk) => {
            body += chunk;
          })
          .on('end', () => resolve(JSON.parse(body)));
      })
      .on('error', reject)
  );

  return body.response[0];
}

async function getMe(token) {
  const existing = DB.tokens.get(token);

  if (existing) {
    return existing;
  }

  const user = getVKUser(token);

  DB.tokens.set(token, user);

  return user;
}
