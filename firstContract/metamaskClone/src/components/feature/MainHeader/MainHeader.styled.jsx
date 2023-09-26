import styled from "styled-components";

export const HeaderWrap = styled.div`
  width: 100%;
  height: 100%;
  color: white;
  display: flex;
  align-items: center;
  & .Container {
    height: 30px;
    width: 100%;
    margin: 0 10px;
    display: flex;
  }
`;

export const NetworkArea = styled.div`
  width: 60px;
  border-radius: 20px;
  display: flex;
  background-color: rgb(20, 22, 24);
  align-items: center;
  &:hover {
    cursor: pointer;
  }
  & .NetworkDropdown {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  & .NetworkName,
  .NetworkArrow {
    width: 40%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  & .NetworkArrow img {
    width: 10px;
    height: 10px;
  }
`;

export const AcountArea = styled.div`
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;

  & .AccountWrap {
    width: 150px;
    height: 100%;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  & .AccountWrap:hover {
    background-color: rgb(41, 43, 46);
    cursor: pointer;
  }

  & .AccountDropdown {
    display: flex;
    align-items: center;
  }
  & .AccountImg {
    margin-right: 10px;
  }
  & .AccountInfo {
    font-weight: 800;
    margin-right: 10px;
  }
  & .AccountArrow {
  }
  & .AccountArrow img {
    width: 14px;
    height: 14px;
  }
`;

export const ConnectArea = styled.div`
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
  & span {
    font-size: 18px;
  }
`;

export const Menu = styled.div`
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
  & img {
    width: 15px;
    height: 15px;
  }
`;
