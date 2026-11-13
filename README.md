# João Felicíssimo | Portfolio

Personal portfolio site. Plain HTML, CSS and JavaScript, no build step, hosted on GitHub Pages.

## Structure

```
index.html              Page content and sections
assets/css/style.css    All styles (colours are set at the top as variables)
assets/js/projects.js   Project data: texts, findings, images and repository links
assets/js/i18n.js       Interface text in English and Portuguese, plus the Portuguese project texts
assets/js/main.js       Menu, project cards, project details and scroll effects
assets/img/             Logos, badges, project screenshots and card backgrounds
assets/cv/              Put the CV here as Joao_Felicissimo_CV.pdf
```

## Updating a project

All project content lives in `assets/js/projects.js`. Edit the text there, and put new screenshots in `assets/img/projects/<project id>/`. The cards and the details window are built from that file, so nothing else needs to change.

## Languages

The site is in English and European Portuguese. The EN | PT switch is in the header. The first visit follows the browser language, the choice is remembered, and `?lang=pt` or `?lang=en` in the link opens a specific language. English text lives in `projects.js` and in `index.html`; Portuguese text lives in `i18n.js`.

## CV

Add the file as `assets/cv/Joao_Felicissimo_CV.pdf`. The "Download CV" buttons appear on their own once the file is online. Until then, the hero shows a LinkedIn button instead.

## Publishing

1. Create a public repository named `JoaoFelicissimo03.github.io`.
2. Upload the contents of this folder to the root of the repository.
3. In *Settings > Pages*, set the source to the `main` branch and the root folder.

The site is then available at `https://joaofelicissimo03.github.io`.

## Run locally

Open `index.html` in a browser, or run `python -m http.server` in this folder and open `http://localhost:8000`.
