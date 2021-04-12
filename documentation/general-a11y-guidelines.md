# General A11y guidelines

# What

Web accessibility means that **people with disabilities can use and understand the web.**

The goal of web accessibility is that all people can perceive, understand, navigate, interact with, and contribute to the Web.

> The power of the Web is in its universality. Access by everyone regardless of disability is an essential aspect. — Tim Berners-Lee

# Why bother

- **Inclusivity - a wider range of users can use the service**
  - it's good to be empathetic
  - often makes business sense since more users can = more business
  - gives a better reputation, consequently avoiding a reputation-damaging one
  - ensures compliance to regulation -> avoid fines, etc.
- **Cleaner HTML markup improves SEO**
  - search engine bots see and consume HTML mark up.
  - the better the mark up, the better the page ranking.
- **Cleaner code that is easier to maintain**
  - div soup can make reading code difficult
  - semantic structure has the opposite effect
  - it helps testing since changes to semantics = changes to functionality

# What it covers

The considerations can be broadly lumped into the following:

1. **Keyboard -** people use the Web without a mouse → make sure it works as such
2. **Contrast -** maintain a proper contrast ratio to make elements easier to look at, esp. for those who are visually impaired
3. **Alternatives -** captions for video, transcript for podcasts, alt texts for images. Some people can't see or hear.
4. **Sizing -** people should be able to use the site/app on whatever sized device.

See: [https://www.solidstart.info/](https://www.solidstart.info/)

---

# Tools

See: [https://madalyn.dev/blog/a11y-testing-coffee/](https://madalyn.dev/blog/a11y-testing-coffee/) for a good metaphor.

## Automated

Not entirely comprehensive — "Automated testing can only reliably identify a small subset of accessibility violations (I’ve heard numbers between 10% and 30%)."- [https://engineering.linkedin.com/blog/2020/automated-accessibility-testing](https://engineering.linkedin.com/blog/2020/automated-accessibility-testing)

However, teaches a lot about good practices - similar to a code linter

- [axe](https://www.deque.com/axe/) - this is what sits under *most* automated tooling. You can leverage it directly in your code using the [axe-core](https://github.com/dequelabs/axe-core) API or use their browser extensions to run on rendered pages.
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) includes accessibility auditing and runs axe. It’s shipped right in Chrome DevTools and **also has a [CI integration](https://github.com/GoogleChrome/lighthouse-ci/blob/master/docs/getting-started.md) you can add to your pipeline.**
- [Accessibility Insights](https://accessibilityinsights.io/)
  - built by Microsoft
  - has Chrome extension and desktop app
  - uses axe under the hood
- [WAVE Web Accessibility Evaluation Tool](https://wave.webaim.org/)
  - created by [WebAIM](https://webaim.org/)
  - provide an API → tool can either be run from their website or as a browser extension.

## Manual

Since automated testing doesn't guarantee accessibility. The application may/should be inspected manually.

This can be done by:

- navigating with your keyboard
- using a screen reader
- turning your screen magnification way up (300%+)using a site with audio muted
- verifying that the **[prefers reduced motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)** setting is respected

## Hybrid

- Web Accessibility insights - extension/desktop app: [https://accessibilityinsights.io/en/](https://accessibilityinsights.io/en/)
- Lighthouse audit in dev tools
  - runs automated check if accessibility checkbox is ticked
  - provides helpful suggestions for manual testing

## Integration/e2e tests

- Cypress-axe: [https://github.com/component-driven/cypress-axe](https://github.com/component-driven/cypress-axe)
- Pa11y - [https://github.com/pa11y/pa11y](https://github.com/pa11y/pa11y)

---

# Writing clean HTML

- HTML elements are either
  - **semantic**, e.g. `body`, `main`, `nav`, `hr`
  - **non-semantic**, e.g. `b`, `i` and `div`
- Semantic tags provide additional meaning to HTML markup, which is useful for crawlers, assistive technologies and code readability
- Non-semantic tags, on the other hand, are devoid of meaning. They are not inherently bad, they simply don't convey any meaning, e.g. `i` tag specifies that text should look **italic**
- Bottom line: semantic tags should be used whenever possible
  - read about semantics in HTML [https://developer.mozilla.org/en-US/docs/Glossary/Semantics](https://developer.mozilla.org/en-US/docs/Glossary/Semantics)
  - list of roles: [https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles)

---

# Resource & Further reading

- Bunch of good general info: [https://a11y.coffee/](https://a11y.coffee/)
- Simple advice to get up and going with a11y: [https://www.solidstart.info/](https://www.solidstart.info/)
- Checklist for WCAG compliance: [a11y project checklist](https://www.a11yproject.com/checklist)
  - clear and informative
  - provides checklists for three levels of support
- Generic resources: [a11y project resources](https://www.a11yproject.com/resources/)
  - software, books, blogs, online tools, etc.

## Specification

- **WAI at W3C** - brings together people from industry, disability organizations, government, and research labs from around the world to **develop guidelines and resources to help make the Web accessible to people with auditory, cognitive, neurological, physical, speech, and visual disabilities:** [https://www.w3.org/WAI/](https://www.w3.org/WAI/)
- **WAI** is the body responsible for the **WAI-ARIA specification** [https://www.w3.org/WAI/standards-guidelines/aria/](https://www.w3.org/WAI/standards-guidelines/aria/)

  - this spec provides developers with guidelines, e.g. on how to properly describe web elements, and how to provide keyboard navigation

-
