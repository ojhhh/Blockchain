import { useState, useEffect } from "react";
import useWeb3 from "./hooks/web3.hook";
import abi from "./abi/ERC20.json";

const App = () => {
  const { user, web3 } = useWeb3();
  const [ERC20Contract, setERC20Contract] = useState(null);
  const [network, setNetwork] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [token, setToken] = useState("0");

  const [value, setValue] = useState("");
  const [value2, setValue2] = useState("");

  useEffect(() => {
    if (web3 !== null) {
      if (ERC20Contract) return;
      const ERC20 = new web3.eth.Contract(
        abi,
        "0xcc23C0F719668c3B3f011378d135B1fDFA9378Dd",
        { data: "" }
      );
      setERC20Contract(ERC20);

      setInterval(() => {
        web3.eth.getBlockNumber().then((latestBlockNumber) => {
          console.log("Latest Block Number:", latestBlockNumber);

          web3.eth.getBlock(latestBlockNumber).then((block) => {
            console.log("Block Details:", block);
            console.log(block.hash);
            web3.eth.getTransactionReceipt(block.hash).then(console.log);
          });
        });
      }, 5000);
    }
  }, [web3]);

  useEffect(() => {
    // 네트워크가 변경되면 발생하는 이벤트
    window.ethereum.on("ChainChanged", (chainId) => {
      console.log("change network ", chainId);
      if (chainId == "0x539") {
        console.log("Ganache");
        getAccounts();
      }
    });

    // 지갑이 변경되면 실행할 이벤트
    window.ethereum.on("accountsChanged", (account) => {
      console.log("change wallet", account);
      getAccounts();
    });

    if (!network) return;
    getAccounts();
    // 컨트랙트 인스턴스가 있으면 실행하지 말고
    // 네트워크가 정상적일때 실행
  }, [network]);

  // 토큰을 가져오는 함수
  // 전달 받은 매개변수(지갑주소)의 잔액을 보여줌
  const getToken = async (account) => {
    if (!ERC20Contract) return;
    let result = web3.utils
      .toBigInt(await ERC20Contract.methods.balanceOf(account).call())
      .toString(10);

    result = await web3.utils.fromWei(result, "ether");

    return result;
  };

  // 계정의 총 이더량을 가져옴
  const getEther = async (account) => {
    let getETH = await web3.eth.getBalance(account);
    getETH = await web3.utils.fromWei(getETH, "ether");
    return getETH;
  };

  // 메타마스크에 모든 지갑을 보여줄 함수
  const getAccounts = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    // Promise.all : 반환 받은 배열을 map을 돌리는데 promise 반환값을 다 처리하고 넘어감
    const accountsCom = await Promise.all(
      accounts.map(async (account) => {
        const token = await getToken(account);
        const ETH = await getEther(account);
        return { account, token, ETH };
      })
    );

    setToken(await getToken(accounts[0]));

    setAccounts(accountsCom);
  };

  // 지갑에서 다른 지갑으로 토큰을 전송하는 함수
  const transfer = async () => {
    await ERC20Contract.methods
      .transfer(
        value.replaceAll(" ", ""),
        await web3.utils.toWei(value2, "ether")
      )
      .send({
        from: user.account,
      });
    getAccounts();
  };

  const switchNet = async () => {
    // 메타마스크에 해당 네트워크가 맞는지 요청
    // wallet_switchEthereumChain == chainid가 맞는지 검사
    // sepolia chainId : 0xaa36a7
    const net = await window.ethereum.request({
      jsonrpc: "2.0",
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x539" }],
    });
    // net 값이 null이면 해당 네트워크에 있다는 뜻
    setNetwork(net || true);
  };

  if (user.account === null) return "please connect wallet";

  return (
    <>
      <button onClick={switchNet}>switchNet</button>
      <div>wallet address : {user.account}</div>
      <h2>tokens : {token}</h2>
      {accounts.map((item, index) => (
        <div key={index}>
          account : {item.account}, tokens : {item.token}, ETH : {item.ETH}
        </div>
      ))}
      <div>
        <label>to. </label>
        <input onChange={(e) => setValue(e.target.value)}></input>
        <label>tokens </label>
        <input onChange={(e) => setValue2(e.target.value)}></input>
      </div>
      <button onClick={transfer}>transfer</button>
    </>
  );
};

export default App;

// 계정들의 이더리움 잔액을 보여주는 함수 작성
// 가나쉬 네트워크로 배포한거 세폴리아 테스트 네트워크에 배포하고
// 네트워크 아이디 부분 세폴리아 네트워크에 연결할 수 있게 수정
