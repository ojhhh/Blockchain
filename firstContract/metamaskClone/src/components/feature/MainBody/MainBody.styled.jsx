import styled from "styled-components";

export const MainBodyWrap = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

export const BodyTop = styled.div`
  width: 100%;
  height: 60px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  & .AccountBox {
    width: 120px;
    height: 30px;
    background-color: rgb(40, 55, 74);
    border-radius: 15px;
    color: rgb(71, 146, 248);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 0;
    box-sizing: border-box;
  }
  & .AccountInfo {
    width: 70%;
  }

  & .AccountInfo span {
  }
  & .AccountCopy {
    width: 20%;
  }
  & .AccountCopy img {
    width: 12px;
    height: 12px;
  }
`;
export const BodyMiddle = styled.div`
  width: 100%;
  height: 60px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  & .BalanceBox span {
    font-size: 30px;
    font-weight: 600;
  }
`;
export const BodyBottom = styled.div`
  width: 100%;
  height: 80px;
  box-sizing: border-box;
  padding: 0 25px;
  display: flex;
  color: white;
  & .BuyBox,
  .SendBox,
  .SwapBox,
  .BridgeBox,
  .PortfolioBox {
    width: 20%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  & .BuyBox:hover,
  .BridgeBox:hover {
  }
  & .SendBox:hover,
  .SwapBox:hover,
  .PortfolioBox:hover {
    cursor: pointer;
  }

  & .BuyBtn,
  .SendBtn,
  .SwapBtn,
  .BridgeBtn,
  .PortfolioBtn {
    width: 70%;
    height: 50%;
    border-radius: 50%;
    background-color: rgb(71, 148, 253);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  & .BuyBtn img,
  .SendBtn img,
  .SwapBtn img,
  .BridgeBtn img,
  .PortfolioBtn img {
    width: 20px;
    height: 20px;
  }

  & .SendBtn img {
    transform: rotate(-45deg);
  }

  & .BuyText,
  .BuyText,
  .SendText,
  .SwapText,
  .BridgeText,
  .PortfolioText {
    margin-top: 5px;
  }
`;
