import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "././Sidebar";
import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const Main = styled.div`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
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
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
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
          {isDemoVisitor && <DemoNotice>Demo mode · Sample data only · All changes are disabled</DemoNotice>}
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
