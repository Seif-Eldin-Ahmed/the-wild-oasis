import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  :root,
  :root.light-mode {
    color-scheme: light;
    --color-grey-0: #ffffff;
    --color-grey-50: #f5f7fa;
    --color-grey-100: #e9edf2;
    --color-grey-200: #d9e0e8;
    --color-grey-300: #c4ced9;
    --color-grey-400: #8996a5;
    --color-grey-500: #667487;
    --color-grey-600: #4b5a6c;
    --color-grey-700: #29384a;
    --color-grey-800: #172536;
    --color-grey-900: #101c2b;

    --color-blue-100: #e0f2fe;
    --color-blue-700: #0369a1;
    --color-green-100: #dcfce7;
    --color-green-700: #15803d;
    --color-yellow-100: #fef9c3;
    --color-yellow-700: #a16207;
    --color-silver-100: #e5e7eb;
    --color-silver-700: #374151;
    --color-indigo-100: #e0e7ff;
    --color-indigo-700: #4338ca;
    --color-red-100: #fee2e2;
    --color-red-700: #b91c1c;
    --color-red-800: #991b1b;

    --color-brand-50: #e9f3f2;
    --color-brand-100: #d7e9e7;
    --color-brand-200: #b7d6d2;
    --color-brand-500: #408c83;
    --color-brand-600: #337b73;
    --color-brand-700: #27665f;
    --color-brand-800: #205550;
    --color-brand-900: #17443f;

    --backdrop-color: rgba(255, 255, 255, 0.55);
    --shadow-sm: 0 2px 5px rgba(24, 38, 55, 0.04);
    --shadow-md: 0 12px 28px rgba(24, 38, 55, 0.06);
    --shadow-lg: 0 22px 48px rgba(24, 38, 55, 0.1);
    --image-grayscale: 0;
    --image-opacity: 100%;
    --logo-badge-bg: #e8f0e9;
    --logo-badge-border: rgba(41, 66, 46, 0.12);
  }

  :root.dark-mode {
    color-scheme: dark;
    --color-grey-0: #171c23;
    --color-grey-50: #11151b;
    --color-grey-100: #282f39;
    --color-grey-200: #39424e;
    --color-grey-300: #536070;
    --color-grey-400: #8995a4;
    --color-grey-500: #a5afbb;
    --color-grey-600: #bdc5ce;
    --color-grey-700: #d7dce2;
    --color-grey-800: #edf0f4;
    --color-grey-900: #f8fafc;

    --color-blue-100: #123a4f;
    --color-blue-700: #8bd8f4;
    --color-green-100: #173f32;
    --color-green-700: #8be0b0;
    --color-yellow-100: #493b1d;
    --color-yellow-700: #f3d478;
    --color-silver-100: #303843;
    --color-silver-700: #d1d7df;
    --color-indigo-100: #31345d;
    --color-indigo-700: #c1c9ff;
    --color-red-100: #4d252a;
    --color-red-700: #ffabb0;
    --color-red-800: #eb777e;

    --color-brand-50: #263547;
    --color-brand-100: #304960;
    --color-brand-200: #42627d;
    --color-brand-500: #70c7bb;
    --color-brand-600: #82d6c9;
    --color-brand-700: #a6e3d9;
    --color-brand-800: #c5eee7;
    --color-brand-900: #e1f7f3;

    --backdrop-color: rgba(0, 0, 0, 0.7);
    --shadow-sm: 0 2px 5px rgba(0, 0, 0, 0.22);
    --shadow-md: 0 12px 28px rgba(0, 0, 0, 0.25);
    --shadow-lg: 0 22px 48px rgba(0, 0, 0, 0.34);
    --image-grayscale: 10%;
    --image-opacity: 90%;
    --logo-badge-bg: #263d35;
    --logo-badge-border: rgba(202, 224, 192, 0.22);
  }

  :root {
    --border-radius-tiny: 3px;
    --border-radius-sm: 5px;
    --border-radius-md: 7px;
    --border-radius-lg: 9px;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    transition: background-color 0.3s, border 0.3s;
  }

  html { font-size: 62.5%; }

  body {
    font-family: "DM Sans", "Segoe UI", sans-serif;
    color: var(--color-grey-700);
    transition: color 0.3s, background-color 0.3s;
    min-height: 100vh;
    line-height: 1.5;
    font-size: 1.6rem;
  }

  input,
  button,
  textarea,
  select {
    font: inherit;
    color: inherit;
  }

  button { cursor: pointer; }
  *:disabled { cursor: not-allowed; }

  select:disabled,
  input:disabled {
    background-color: var(--color-grey-200);
    color: var(--color-grey-500);
  }

  input:focus,
  button:focus,
  textarea:focus,
  select:focus {
    outline: 2px solid var(--color-brand-600);
    outline-offset: -1px;
  }

  button:has(svg) { line-height: 0; }
  a { color: inherit; text-decoration: none; }
  ul { list-style: none; }

  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    overflow-wrap: break-word;
    hyphens: auto;
  }

  img {
    max-width: 100%;
    filter: grayscale(var(--image-grayscale)) opacity(var(--image-opacity));
  }

  .recharts-default-tooltip {
    background-color: var(--color-grey-0) !important;
    border: 1px solid var(--color-grey-200) !important;
    border-radius: 0.8rem;
  }

  .recharts-tooltip-label,
  .recharts-tooltip-item,
  .recharts-legend-item-text {
    color: var(--color-grey-600) !important;
  }
`;

export default GlobalStyles;
