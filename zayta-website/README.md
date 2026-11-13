# ZAYTA website

This is a static website: there is no build step or framework. Open `index.html`
directly, or use the VS Code Live Server extension while editing.

## Where to make changes

- `index.html` contains the home page, company introduction, all seven division
  links, the project process, and contact details.
- `about-us.html` is the dedicated company profile, including our approach,
  values, and links to each division.
- Each division has a matching page: `robotics.html`, `ai-solutions.html`,
  `academy.html`, `digital.html`, `automation.html`, `business-solutions.html`,
  and `agriculture.html`. Update its title, description, introduction, and
  services together when changing a division.
- `styles.css` contains shared layout, colors, typography, and responsive styles.
  The `--a` value on each page's `<body>` sets that page's accent color.
- `script.js` controls the mobile menu, animations, and contact form. The form
  opens WhatsApp with the submitted message prefilled; it does not send data to a
  website backend.
- `images/` contains page and service images. The header logo is
  `ZAYTA_Robotics_Logo-removebg-preview.png`; favicon files and the web manifest
  are in `favicon/`.

## Preview and deployment

Use VS Code Live Server to preview pages and follow their links locally. Deploy
this folder to a static host such as Vercel; no build command is needed.
