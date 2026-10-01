# Small World Nursery — Homepage Redesign Concept

A homepage redesign concept for [Small World Nursery](https://smallworldnurserywatford.co.uk/), Watford, prepared by AQ Digital.

This is a design concept, not the official Small World Nursery website. Nursery details, parent reviews, Ofsted quotes and photography are taken from their current public website. The enquiry form is a demo and does not send anything.

## Structure

```
index.html        Single landing page
css/styles.css    All styles
js/main.js        Mobile menu, header state, reveals, review carousel, demo form
assets/           Logo, favicons and photography
.nojekyll         Tells GitHub Pages to serve files as-is
```

No build step, dependencies or framework. Fonts load from Google Fonts.

## Run locally

Open `index.html` in a browser, or serve the folder:

```
python3 -m http.server 8000
```

then visit http://localhost:8000.

## Deploy to GitHub Pages

1. Push this repository to GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**, then choose `main` and `/ (root)`.
4. Save. The site will be published at `https://<username>.github.io/<repository>/` within a minute or two.

All paths are relative, so the page works from a repository subpath without changes. The page includes `noindex, nofollow` so search engines don't index the concept.
