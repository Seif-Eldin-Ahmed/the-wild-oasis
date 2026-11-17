import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineUser } from "react-icons/hi2";
import Logout from "../features/authentication/Logout";
import DarkModeToggle from "./DarkModeToggle";
import { useUser } from "../features/authentication/useUser";
import ButtonText from "./ButtonText";

const StyledHeaderMenu = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;
  list-style: none;

  & > li {
    display: flex;
    align-items: center;
  }
`;

function HeaderMenu() {
  const navigate = useNavigate();
  const { isDemoVisitor, isAuthenticated } = useUser();

  return (
    <StyledHeaderMenu>
      {isDemoVisitor && (
        <li>
          <ButtonText onClick={() => navigate("/login")}>
            Admin Login
          </ButtonText>
        </li>
      )}

      {isAuthenticated && (
        <li>
          <ButtonIcon onClick={() => navigate("/account")}>
            <HiOutlineUser />
          </ButtonIcon>
        </li>
      )}

      <li>
        <DarkModeToggle />
      </li>

      {isAuthenticated && (
        <li>
          <Logout />
        </li>
      )}
    </StyledHeaderMenu>
  );
}

export default HeaderMenu;
