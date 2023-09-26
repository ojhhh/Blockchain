import React, { useEffect, useState } from "react";
import {
  HeaderWrap,
  NetworkArea,
  AcountArea,
  ConnectArea,
  Menu,
} from "./MainHeader.styled";
import Arrow from "../../../images/angle-down-solid.svg";
import MenuImg from "../../../images/ellipsis-vertical-solid.svg";

const MainHeader = () => {
  const [network, setNetwork] = useState(false);
  const [account, setAccount] = useState(false);
  const [connect, setConnect] = useState(false);
  return (
    <HeaderWrap>
      <div className="Container">
        {/* Network 버튼 */}
        <NetworkArea>
          <div className="NetworkDropdown">
            <div className="NetworkName">
              <span>G</span>
            </div>
            <div className="NetworkArrow">
              <img src={Arrow} />
            </div>
          </div>
        </NetworkArea>
        {/* 계정 버튼 */}
        <AcountArea>
          <div className="AccountWrap">
            <div className="AccountDropdown">
              <div className="AccountImg">
                <span>🟡</span>
              </div>
              <div className="AccountInfo">
                <span>Account 1</span>
              </div>
              <div className="AccountArrow">
                <img src={Arrow} />
              </div>
            </div>
          </div>
        </AcountArea>
        {/* 계정 상태 정보 버튼 */}
        <ConnectArea>
          <span>☻</span>
        </ConnectArea>
        {/* 메뉴 */}
        <Menu>
          <img src={MenuImg} />
        </Menu>
      </div>
    </HeaderWrap>
  );
};

export default MainHeader;
