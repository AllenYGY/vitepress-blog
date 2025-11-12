# 内置组件用法

主题预置了三个常用 Vue 组件，默认在 `.vitepress/theme/index.js` 中注册为全局组件，可直接在 Markdown 中调用。

## Slides 幻灯片

`<Slides />` 基于 Reveal.js 渲染幻灯片，适合在一篇文章中嵌入多页演示。为避免 SSR 报错，推荐搭配 `<ClientOnly>` 使用。

<ClientOnly>
  <Slides>
    <section data-markdown>
      <textarea data-template>
      ## 示例 Slide 1
      - 支持 Markdown
      - 可渲染公式和代码块
      </textarea>
    </section>
    <section data-markdown>
      <textarea data-template>
      ## 示例 Slide 2
      点击左下角控制按钮切换
      </textarea>
    </section>
  </Slides>
</ClientOnly>

```md
<ClientOnly>
  <Slides>
    <section data-markdown>
      <textarea data-template>
      ## 示例 Slide 1
      - 支持 Markdown
      - 可渲染公式和代码块
      </textarea>
    </section>
    <section data-markdown>
      <textarea data-template>
      ## 示例 Slide 2
      点击左下角控制按钮切换
      </textarea>
    </section>
  </Slides>
</ClientOnly>
```

## Link 友链卡片

`<Link />` 用来批量渲染友链卡片，传入 `links` 数组即可。下方示例同时展示了实际效果和 Markdown 写法。

<ClientOnly>
  <Link :links="[
    { name: 'AllenYGY Blog', link: 'https://vitepress.open17.vip', avatar: '/logo.png', desc: '主题演示站' },
    { name: 'GitHub', link: 'https://github.com/AllenYGY', avatar: 'https://avatars.githubusercontent.com/u/121916671?v=4', desc: '个人仓库' }
  ]" />
</ClientOnly>

```md
<Link :links="[
  { name: 'AllenYGY Blog', link: 'https://vitepress.open17.vip', avatar: '/logo.png', desc: '主题演示站' },
  { name: 'GitHub', link: 'https://github.com/AllenYGY', avatar: 'https://avatars.githubusercontent.com/u/121916671?v=4', desc: '个人仓库' }
]" />
```

## BiliVideo 视频

`<BiliVideo />` 用 B 站 `bvid` 参数生成 iframe 播放器。组件已全局注册，可直接在文章中使用。

<ClientOnly>
  <BiliVideo bvid="BV1MM4y1t7Vt" />
</ClientOnly>

```md
<BiliVideo bvid="BV1MM4y1t7Vt" />
```

> 如果你只想给读者参考写法，也可以把上面的代码块复制粘贴到你的文章中。
