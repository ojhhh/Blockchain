import React, { useState, useEffect, useRef } from "react";
import {
  MainBodyWrap,
  BodyTop,
  BodyMiddle,
  BodyBottom,
} from "./MainBody.styled";

import { Copy, Add, Arrow, DArrow, Bridge, portFolio } from "../../../images";

import Web3 from "web3";

import SendList from "../SendBody/SendList";

const MainBody = ({ onChangePage }) => {
  const [account, setAccount] = useState("0xABD...ERFG");
  const [balance, setBalance] = useState(0);
  const [web3, setWeb3] = useState(null);
  const [sliceAccount, setSliceAccount] = useState(null);
  const [gasfee, setGasfee] = useState(0);
  const [sendpopup, setSendpopup] = useState(false);

  useEffect(() => {
    (async () => {
      const [data] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      // 메타마스크에 등록된 지갑 주소를 가져옴
      const ethAccount = await window.ethereum.request({
        method: "eth_accounts",
      });

      // 네트워크 ID 확인
      const netId = await window.ethereum.request({
        method: "net_version",
      });

      // ethereum 체인 ID 확인
      const chainId = await window.ethereum.request({
        method: "eth_chainId",
      });

      console.log("ethAccount : ", ethAccount);
      setWeb3(new Web3(window.ethereum));
      // 로그인한 계정 정보 가져오기
      setAccount(data);
      // 계정 잔액 가져오기
      // setBalance(web3.eth.getBalance(data));
    })();
  }, []);

  useEffect(() => {
    setSliceAccount(account.slice(0, 5) + "..." + account.slice(-4));
    if (web3) {
      (async () => {
        // 잔액 ETH 단위로 변경
        const changeETH = await web3.eth.getBalance(account);
        const _changeETH = await web3.utils.fromWei(changeETH, "ether");

        setBalance(_changeETH);

        // 가스비 ETH 단위로 변경
        const changeGasfee = await web3.eth.getGasPrice();
        // console.log("changeGasfee : ", changeGasfee);
        const _changeGasfee = await web3.utils.fromWei(changeGasfee, "ether");
        setGasfee(_changeGasfee);
      })();
    }
  }, [web3]);

  useEffect(() => {}, [balance]);

  // console.log("gasfee : ", gasfee);

  // 지갑 주소 복사
  const copyAccount = () => {
    navigator.clipboard.writeText(account);
  };

  // 보내기 버튼 누르면 계정 리스트 출력
  const sendBtnHandle = () => {
    console.log("hi");
  };

  return (
    <MainBodyWrap>
      {/* 계정 복사 부분 */}
      <BodyTop>
        <div className="AccountBox">
          <div className="AccountInfo">
            <span>{sliceAccount}</span>
          </div>
          <div className="AccountCopy" onClick={copyAccount}>
            <img src={Copy} />
          </div>
        </div>
      </BodyTop>
      {/* 잔액 출력 */}
      <BodyMiddle>
        <div className="BalanceBox">
          <span>{balance} ETH</span>
        </div>
      </BodyMiddle>
      {/* 기능 버튼  */}
      <BodyBottom>
        <div className="BuyBox">
          <div className="BuyBtn">
            <img src={Add} alt="" />
          </div>
          <div className="BuyText">
            <span>구매</span>
          </div>
        </div>
        <div className="SendBox" onClick={() => onChangePage("SendList")}>
          <div className="SendBtn">
            <img src={Arrow} alt="" />
          </div>
          <div className="SendText">
            <span>보내기</span>
          </div>
        </div>
        <div className="SwapBox">
          <div className="SwapBtn">
            <img src={DArrow} alt="" />
          </div>
          <div className="SwapText">
            <span>스왑</span>
          </div>
        </div>
        <div className="BridgeBox">
          <div className="BridgeBtn">
            <img src={Bridge} alt="" />
          </div>
          <div className="BridgeText">
            <span>Bridge</span>
          </div>
        </div>
        <div className="PortfolioBox">
          <div className="PortfolioBtn">
            <img src={portFolio} alt="" />
          </div>
          <div className="PortfolioText">
            <span>포트폴리오</span>
          </div>
        </div>
      </BodyBottom>
    </MainBodyWrap>
  );
};

export default MainBody;
