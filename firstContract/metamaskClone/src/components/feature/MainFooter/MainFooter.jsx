import React, { useEffect, useState } from "react";

import {
  FooterWrap,
  FooterTabs,
  TokensTab,
  NFTTab,
  ActiveTab,
  TokensTabSpan,
  NFTTabSpan,
  ActiveTabSpan,
} from "./MainFooter.styled";

const MainFooter = () => {
  const [tokenActive, setTokenActive] = useState(true);
  const [nftActive, setnftActive] = useState(false);
  const [ActiveActive, setActiveActive] = useState(false);

  const activeCheck = (tagName) => {
    switch (tagName) {
      case "TokensTab":
        setTokenActive(true);
        setnftActive(false);
        setActiveActive(false);
        break;
      case "NFTTab":
        setnftActive(true);
        setTokenActive(false);
        setActiveActive(false);
        break;
      case "ActiveTab":
        setActiveActive(true);
        setTokenActive(false);
        setnftActive(false);
        break;
    }
  };

  useEffect(() => {
    // console.log("hi");
  }, [tokenActive, nftActive, ActiveActive]);

  return (
    <FooterWrap>
      <FooterTabs>
        <TokensTab
          acitivecheck={tokenActive.toString()}
          onClick={() => activeCheck("TokensTab")}
        >
          <span>Tokens</span>
        </TokensTab>
        <NFTTab
          acitivecheck={nftActive.toString()}
          onClick={() => activeCheck("NFTTab")}
        >
          <span>NFT</span>
        </NFTTab>
        <ActiveTab
          acitivecheck={ActiveActive.toString()}
          onClick={() => activeCheck("ActiveTab")}
        >
          <span>활동</span>
        </ActiveTab>
      </FooterTabs>
    </FooterWrap>
  );
};

export default MainFooter;
