import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 2.8rem 1.8rem;
  border-right: 1px solid var(--color-grey-100);

  display: flex;
  flex-direction: column;
  gap: 3.4rem;

  @media (max-width: 850px) {
    padding: 1.2rem 1.6rem;
    gap: 1.3rem;
    border-right: 0;
    border-bottom: 1px solid var(--color-grey-100);

    nav ul {
      flex-direction: row;
      overflow-x: auto;
      padding-bottom: 0.2rem;
    }

    nav a {
      min-height: 4rem;
      padding: 0 1.1rem;
      white-space: nowrap;
    }
  }
`;

function SideBar() {
  return (
    <StyledSidebar>
      <Logo />
      <MainNav />
    </StyledSidebar>
  );
}

export default SideBar;
