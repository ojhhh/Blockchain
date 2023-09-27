import styled from "styled-components";

export const SendListWrap = styled.div`
  border: 1px solid red;
  position: absolute;
  top: 70px;
  width: 350px;
  height: 530px;
  box-sizing: border-box;
  color: white;
`;

export const HeaderBox = styled.div`
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  & .headerText {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
  }
  & .headerText span {
    font-size: 20px;
  }
  & .returnBtn {
    margin-left: auto;
    padding: 0 10px;
  }
  & .returnBtn:hover {
    cursor: pointer;
  }
  & .returnBtn span {
    color: rgb(71, 148, 253);
  }
`;

export const SearchBox = styled.div`
  & input {
    margin-top: 10px;
    width: 90%;
    height: 40px;
    border-radius: 5px;
    border: none;
    background-color: none;
  }
`;
