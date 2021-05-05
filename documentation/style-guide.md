# Styling guidelines for the application

## Libraries used

- [Styled-components](https://styled-components.com/)

## Folder Structure

- Shared components placed in frontend/components/shared
- Component-specific styles go in the component's file or a separate file within it's folder, e.g. components/CoolComponent/ would have the following files:
  - index.jsx
  - styled.js

## Naming Conventions

- Styled components that contain styles only (no logic): ComponentWrapper/ComponentContainer
- Otherwise capitalized html tags, e.g. header -> Header

## HTML Tags

- Use semantic html tags when defining styled components in JSX just as when writing regular html
- Google the semantic meaning of tags when unsure

here: MUI+ styled components?
