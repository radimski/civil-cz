# civil.cz

Plain static HTML + PHP — same layout as [otevru-cz](https://github.com/radimski/otevru-cz).

**GitHub:** [radimski/civil-cz](https://github.com/radimski/civil-cz)  
**On GitHub:** `index.html`, `styles.css`, `main.js`, `form.js`, `api/`, `img/` … at repo root.

**Local only (gitignored):** `build/`, `export/`, `_old_site/`, `package.json`

## Preview

```bash
npx --yes serve .
```

## FTP

```bash
node build/export.mjs
```

Upload contents of `export/`.

## Cloudflare Pages

Framework: **None** · Build: *(empty)* · Root: `/`  
No `package.json` in the repo — static files only.

Production: **https://www.civil.cz**

Forms need PHP on the host — `api/config.example.php` → `api/config.php` (injected from `build/config.php` at export).
