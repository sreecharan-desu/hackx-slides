# hackx

Classic, readable learning tracks — inspired by DailyCode’s old UI.

## Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Content

Add tracks under `content/tracks/<track-id>/`:

- `meta.json` — title + description
- `lessons/*.md` — markdown with frontmatter (`title`, `order`)

No Notion. Markdown is rendered to match the classic Notion-like look (inline code chips, blue-accent code blocks, clean typography).
