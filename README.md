# moe-counter

基于 [Cloudflare Workers](https://workers.cloudflare.com/) 的 [Moe-Counter](https://github.com/journey-ad/Moe-Counter) 萌萌计数器的分叉。

![Moe Counter](https://moe-counter.lxchapu.com/github@moe-counter)

<details>
<summary>More theme</summary>

**asoul**

![asoul](https://moe-counter.lxchapu.com/demo?theme=asoul)

**moebooru**

![moebooru](https://moe-counter.lxchapu.com/demo?theme=moebooru)

**rule34**

![rule34](https://moe-counter.lxchapu.com/demo?theme=rule34)

**gelbooru**

![gelbooru](https://moe-counter.lxchapu.com/demo?theme=gelbooru)

</details>

## Demo

<https://moe-counter.lxchapu.com>

## Usage

**自己部署**

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/lxchapu/moe-counter)

- 分叉这个仓库
- 在 [Cloudflare D1](https://developers.cloudflare.com/d1/) 创建一个数据库
- 在 `wrangler.toml` 中修改对应的数据库名称和数据库 ID

  ```toml
  database_name = "<your database name>"
  database_id = "<your database id>"
  ```

- 在 `wrangler.toml` 中修改成自己的域名

  ```toml
  [[routes]]
  pattern = "<your custom domain>"
  ```

- 使用 `npm run deploy` 编译并发布 worker

如果想在本地运行，需要先初始化本地数据库。

```sh
npm run initdb
```

## Configuration

`config.yml`

```yml
length: 7

theme: 'moebooru'
```

## Credits

- [A-SOUL](https://space.bilibili.com/703007996)
- [Moebooru](https://github.com/moebooru/moebooru)
- [Rule 34](https://rule34.xxx/) **❗NSFW❗**
- [Gelbooru](https://gelbooru.com/) **❗NSFW❗**

## License

MIT &copy; 柃夏chapu
