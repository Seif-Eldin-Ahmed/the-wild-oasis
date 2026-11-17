import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "././Sidebar";
import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 25rem minmax(0, 1fr);
  grid-template-rows: 7.8rem minmax(0, 1fr);
  height: 100vh;

  & > aside { grid-column: 1; grid-row: 1 / -1; }
  & > header { grid-column: 2; grid-row: 1; }
  & > main { grid-column: 2; grid-row: 2; }

  @media (max-width: 850px) {
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: auto auto minmax(0, 1fr);
    min-height: 100vh;

    & > aside { grid-column: 1; grid-row: 1; }
    & > header { grid-column: 1; grid-row: 2; }
    & > main { grid-column: 1; grid-row: 3; }
  }
`;

const Main = styled.div`
  background-color: var(--color-grey-50);
  min-height: 0;
  padding: 3.8rem clamp(2rem, 4vw, 5.6rem) 5rem;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: #999;
    border-radius: 999px;
  }
`;

const Container = styled.div`
  max-width: 138rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2.8rem;

  & > div:has(> h1) {
    gap: 1.8rem;
    flex-wrap: wrap;
  }

  @media (max-width: 540px) {
    gap: 2.2rem;

    & > div:has(> h1) {
      align-items: flex-start;
      gap: 1.2rem;

      & > div { max-width: 100%; flex-wrap: wrap; }
    }
  }
`;

const DemoNotice = styled.div`
  padding: 1rem 1.6rem;
  border-radius: var(--border-radius-sm);
  background: var(--color-blue-100);
  color: var(--color-blue-700);
  font-size: 1.4rem;
`;

function AppLayout() {
  const { isDemoVisitor } = useUser();

  return (
    <StyledAppLayout>
      <Header />
      <Sidebar />
      <Main>
        <Container>
          {isDemoVisitor && <DemoNotice>Demo mode — Sample data only — All changes are disabled</DemoNotice>}
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
