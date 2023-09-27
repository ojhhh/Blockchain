import styled from "styled-components";

export const FooterWrap = styled.div`
  width: 100%;
  height: 100%;
`;

export const FooterTabs = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
`;

export const Tabs = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: ${(props) =>
    props.acitivecheck === "true" ? "2px solid rgb(70, 150, 250)" : "none"};
  &:hover {
    cursor: pointer;
  }
  & span {
    font-weight: 700;
    color: ${(props) =>
      props.acitivecheck === "true" ? "rgb(70, 150, 250)" : "white"};
  }
`;

export const TokensTab = styled(Tabs)``;
export const NFTTab = styled(Tabs)``;
export const ActiveTab = styled(Tabs)``;
