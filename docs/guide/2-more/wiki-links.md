---
title: 双向链接（Wiki Links）
date: 2026-01-01
publish: True
---

# 双向链接（Wiki Links）

本项目已使用 `@portaljs/remark-wiki-link` 支持 Obsidian 风格的双向链接与嵌入。

## 语法

- `[[Page]]`
- `[[Page|别名]]`
- `[[Page#Heading]]`
- `[[Page#Heading|别名]]`
- `![[Image.png]]`
- `![[Document.pdf]]`

支持的图片格式：`jpg`, `jpeg`, `png`, `apng`, `webp`, `gif`, `svg`, `bmp`, `ico`。  
PDF 会以 `<iframe>` 形式嵌入；不支持的格式会原样显示 `[[...]]` 文本。

## 路径解析规则

- 默认采用 `pathFormat: "obsidian-short"`，可用 `[[folder/page]]` 或 `[[page]]`。
- 当存在同名文件时，优先匹配当前文档所在目录下的相对路径，再匹配其他位置。
- `![[image.png]]` 会自动补为 `./image.png`，确保 Vite 能解析同目录资源。
- 若需要根路径或上级路径，直接写 `/...` 或 `../...` 即可。
- `docs/public/` 下的资源请用绝对路径，如 `/logo.png`。

## 未命中链接样式

未命中时仍会生成链接，并附加 `a.internal.new` 类名，页面中会以虚线样式显示。

## 反向链接

页面默认展示 Backlinks（来自哪些页面的引用）。如需关闭，可在页面的 front matter 里设置：

```yaml
backlinks: false
```

## 相关配置位置

- 渲染插件：`docs/.vitepress/markdown/wikiLink.ts`
- 选项与链接模板：`docs/.vitepress/wiki-link.config.js`
- 反向链接索引：`docs/page/wiki-links.data.js`
