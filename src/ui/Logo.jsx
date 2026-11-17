import styled from "styled-components";

const StyledLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 1.3rem;
  padding: 0 1rem;
`;

const Mark = styled.div`
  width: 4.5rem;
  height: 4.5rem;
  display: grid;
  place-items: center;
  overflow: hidden;
  flex: none;
  border-radius: 1.25rem;
  background: var(--logo-badge-bg);
  box-shadow: inset 0 0 0 1px var(--logo-badge-border);

  svg {
    display: block;
    width: 3.5rem;
    height: 3.5rem;
  }

  @media (max-width: 850px) {
    width: 3.5rem;
    height: 3.5rem;
  }
`;

const BrandName = styled.div`
  color: var(--color-grey-800);
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.1;

  span {
    display: block;
    margin-top: 0.45rem;
    color: var(--color-grey-500);
    font: 600 1rem/1 "DM Sans", "Segoe UI", sans-serif;
    letter-spacing: 0.15em;
    text-transform: uppercase;
  }
`;

function Logo() {
  return (
    <StyledLogo aria-label="The Wild Oasis">
      <Mark>
        <svg viewBox="0 0 48 48" role="img" aria-label="Mountain cabin logo">
          <path d="M3 35 14 12l6 10L29 5l16 30v7H3z" fill="#294235" />
          <path d="m7 34 7-15 4 7 6-10 8 18z" fill="#55704d" />
          <path d="m22 20 7-12 12 23H28z" fill="#3d5942" />
          <path d="m26 15 3-7 4 8-3-2-2 3z" fill="#d1bc7f" opacity=".9" />
          <path d="M5 35c7-4 12-4 19-2 7-3 13-2 19 2v7H5z" fill="#20382d" />
          <path d="m15 35 9-9 10 9v7H15z" fill="#d1aa61" />
          <path d="M19 35v-4l5-4 5 4v4" fill="#f1ddb0" />
          <path d="M17 36h14v6H17z" fill="#b88b48" />
          <path d="M22 37h4v5h-4z" fill="#394437" />
          <path d="M10 32 7 25l-3 7zm28 0 4-9 4 9z" fill="#c8aa67" />
          <path d="M8 32h4v7H8zm29 0h4v7h-4z" fill="#d6bd7c" />
          <path d="M2 43c12-2 29-2 44 0" fill="none" stroke="#c1a05f" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </Mark>
      <BrandName>
        The Wild Oasis
        <span>Hotel operations</span>
      </BrandName>
    </StyledLogo>
  );
}

export default Logo;
