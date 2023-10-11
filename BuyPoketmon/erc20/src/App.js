import { useEffect, useState } from "react";
import useWeb3 from "./hooks/web3.hook";
import abi from "./abi/Poketmon.json";

const App = () => {
  const { user, web3 } = useWeb3();
  const [contract, setContract] = useState(null);
  const [token, setToken] = useState("0");

  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    if (web3) {
      if (contract) return;

      const poketmon = new web3.eth.Contract(
        abi,
        "0x989814FdA66Cf76E09c6cC85c2bfD74e0CB0F79c",
        { data: "" }
      );
      setContract(poketmon);
    }
  }, [web3]);

  // 해당 지갑에 있는 포켓몬 조회
  const getPoketmon = async (account) => {
    // console.log("contract : ", contract);
    const result = contract.methods.getPoketmon().call({
      from: account,
    });
    return result;
  };

  // 토큰량
  const getToken = async (account) => {
    if (!contract) return;

    let result = web3.utils
      .toBigInt(await contract.methods.balanceOf(account).call())
      .toString(10);

    result = await web3.utils.fromWei(result, "ether");

    return result;
  };

  // 계정 조회
  const getAccount = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    const _accounts = await Promise.all(
      accounts.map(async (account) => {
        const token = await getToken(account);
        // 해당 지갑에 있는 포켓몬 정보
        const poketmon = await getPoketmon(account);
        return { account, token, poketmon };
      })
    );

    setAccounts(_accounts);
  };

  // 1. 포켓몬 구매
  const buyPoketmon = async () => {
    await contract.methods.buyPoketmon().send({ from: user.account });
    getAccount();
  };

  // 2. 빵을 구매한적 있는 계정들 가져오기
  const butAccount = async () => {};

  useEffect(() => {
    if (!contract) return;
    getAccount();
  }, [contract]);

  if (!user.account) return "connect wallet";

  return (
    <>
      <div>Tokens : {token}</div>
      <button onClick={buyPoketmon}>Buy Poketmon</button>
      {accounts.map((item, index) => (
        <div key={index}>
          <span>account : {item.account}</span>
          <br />
          <span>token : {item.token}</span>
          {/* <span>poketmon : {item.poketmon}</span> */}
          <div style={{ display: "flex" }}>
            poketmons
            {item.poketmon.map((item, index) => (
              <div key={index}>
                {item.name} : <img src={item.url} alt="" width="50px" />
              </div>
            ))}
          </div>
        </div>
      ))}
      <div>
        <h2>빵을 구매한 적 있는 계정들 모임</h2>
      </div>
    </>
  );
};

export default App;

// 1. 포켓몬 랜덤으로 뽑을 수 있는 함수 버튼 만들기
// 2. 포켓몬 한번이라도 뽑은 계정들만 모아놓고 어떤 포켓몬을 가지고 있는지 보여주기
// 3. 포켓몬 소유권을 넘길 수 있는 함수 만들기
