# General A11y guidelines

# What

Web accessibility means that **people with disabilities can use and understand the web.**

The goal of web accessibility is that all people can perceive, understand, navigate, interact with, and contribute to the Web.

> The power of the Web is in its universality. Access by everyone regardless of disability is an essential aspect. — Tim Berners-Lee

# Why bother

- **Inclusivity - a wider range of users can use the service**
  - it's good to be empathetic
  - often makes business sense since more users and happier users often means better business
  - improves brand reputation, consequently preventing potential damage to reputation
  - ensures compliance to regulation - avoid fines, etc.
- **Cleaner HTML markup improves SEO**
  - Search Engine Optimisation (SEO) refers to the quality and quantity of website traffic to a website or a web page from search engines. The better the SEO, the better the site ranks in search engines, such as Googles.
  - this is because search engine crawler bots consume HTML mark up and feed that to the algorithms
  - consequently, the better the mark up, the better the page ranking
- **Cleaner code that is easier to maintain**
  - poorly written HTML (e.g. poorly structured, and non-semantic) can make reading and reasoning through code more difficult
  - a clean, semantic structure has the opposite effect
  - in addition, it helps testing
    - changes to semantics should be considered changes to functionality
    - as such, when the semantics of the mark up are changed, tests should be updated

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

Not entirely comprehensive — "Automated testing can only reliably identify a small subset of accessibility violations (~ 10% - 30%)."- [https://engineering.linkedin.com/blog/2020/automated-accessibility-testing](https://engineering.linkedin.com/blog/2020/automated-accessibility-testing)

However, it can teach a lot about good practices, similar to a code linter.

Covers:

- HTML/ARIA validation
  - see the WAI-ARIA specification for more information on WAI-ARIA
- Form labels
- Color contrast
- Accessible names
  - ensures that HTML elements have accessible names
  - mostly guaranteed by writing semantic HTML
- Focus management
  - sometimes necessary for complex user interactions, e.g. returning focus to where it was after a user was shown a modal
- Specifying a language

* more

List of tools:

- [axe](https://www.deque.com/axe/) - this is what sits under *most* automated tooling. You can leverage it directly in your code using the [axe-core](https://github.com/dequelabs/axe-core) API or use their browser extensions to run on rendered pages.
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) includes accessibility auditing and runs axe. It’s shipped right in Chrome DevTools and **also has a [CI integration](https://github.com/GoogleChrome/lighthouse-ci/blob/master/docs/getting-started.md) you can add to your pipeline.**
- [Accessibility Insights](https://accessibilityinsights.io/)
  - built by Microsoft
  - has Chrome extension and desktop app
  - also uses axe under the hood
- [WAVE Web Accessibility Evaluation Tool](https://wave.webaim.org/)
  - created by [WebAIM](https://webaim.org/)
  - provides an API, which means that the tool can either be run from their website or as a browser extension.

## Manual

Since automated testing doesn't guarantee accessibility, the application should be inspected manually to ensure accessibility.

Manual testing covers the following:

- Focus order
  - when navigating with a keyboard, users need to know which component currently has the input focus
  - browsers indicate this visually by default, but it can be disrupted through programming choices (e.g. not using semantically correct elements) and scripts
  - the goal is for the user to be able to navigate a page with a keyboard in an order that preserves its meaning (i.e. tabbing should not result in the user jumping to a random section of the page they're on) and allows them to perform all the necessary functions, e.g. submit form.
- Text alternative quality
  - i.e, the alt text on images should be of of good quality by textually conveying a representation of whatever the text is an alternative for, e.g. an image
  - e.g. images that are purely for decorative purposes have their alt text set to "",
- Screen reader testing
  - done by using an actual screen reader, if available, such as NVDA for Windows or Voiceover for Mac.
- Keyboard support
  - tested by navigating the application with a keyboard only.
- Contrast over images/gradients
- Error identification
  - input errors are detected, identified, and reported to the user in clear text
- turning your screen magnification way up (300%+)
- using a site with audio muted
- verifying that the **[prefers reduced motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)** setting is respected

**See Lighthouse accessibility audit suggestions in DevTools & Accessibility insights browser extension for further suggestions for manual testing.**

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
