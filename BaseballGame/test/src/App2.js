import useWeb3 from "./hooks/web3.hook";
import { useEffect, useState } from "react";
import abi from "./abi/Baseball.json";

const App = () => {
  const { user, web3 } = useWeb3();
  const [ticket, setTicket] = useState("0");
  // 사용자 입력값 저장
  const [value, setValue] = useState("");
  // 총 상금
  const [reward, setReward] = useState("0");
  // 게임 진행도
  const [progress, setProgress] = useState("0");
  // 랜덤값
  const [random, setRandom] = useState("000");

  const [message, setMessage] = useState();

  const [baseballContract, setBaseballContract] = useState(null);

  const getTicket = async () => {
    if (baseballContract === null) return;

    const result = web3.utils
      .toBigInt(await baseballContract.methods.getTicket().call())
      .toString(10);
    setTicket(await web3.utils.fromWei(result, "ether"));
  };

  const getReward = async () => {
    if (baseballContract === null) return;
    const result = web3.utils
      .toBigInt(await baseballContract.methods.getReward().call())
      .toString(10);

    setReward(await web3.utils.fromWei(result, "ether"));
  };

  const getPlaying = async () => {
    const playing = web3.utils
      .toBigInt(await baseballContract.methods.getPlaying().call())
      .toString(10);
    setMessage(playing);
  };

  const getProgress = async () => {
    const progress = web3.utils
      .toBigInt(await baseballContract.methods.getProgress().call())
      .toString(10);
    setProgress(progress);
  };

  const getRandom = async () => {
    // const owner = await baseballContract.methods.getOwner().call();
    // const sender = await baseballContract.methods
    //   .getSender()
    //   .call({ from: user.account });

    // console.log("owner : ", owner);
    // console.log("sender : ", sender);
    // console.log("user.account : ", user.account);

    const random = await baseballContract.methods
      .getRandom()
      .call({ from: user.account });
    console.log("random : ", random);
  };

  const gameStart = async () => {
    if (value.length < 3) {
      alert("3자리 입력");
      return;
    }

    await baseballContract.methods.gameStart(Number(value)).send({
      from: user.account,
      value: web3.utils.toWei("5", "ether"),
    });

    render();
  };

  const gameRestart = async () => {
    await baseballContract.methods.gameRestart().send({
      from: user.account,
    });

    render();
  };

  const render = () => {
    getTicket();
    getReward();
    getPlaying();
    getProgress();
  };

  useEffect(() => {
    if (web3 !== null) {
      if (baseballContract === null) {
        // ?
        const Baseball = new web3.eth.Contract(
          abi,
          "0x1CdA1A15D39956D2d517245aac2D89821864DEeb",
          { data: "" }
        );
        setBaseballContract(Baseball);
      }
    }
  }, [web3]);

  useEffect(() => {
    if (baseballContract != null) {
      render();
    }
  }, [baseballContract]);

  if (user.account === null) return "connect wallet";

  return (
    <>
      <div>Ticket Price : {ticket}</div>
      <div>현재 게임 진행도 : {progress} / 5</div>
      <div>상금 : {reward}</div>
      <div>진행 상태 : {message == 0 ? "Playing" : "GameOver"}</div>
      <input
        onChange={(e) => {
          setValue(e.target.value);
        }}
      ></input>
      <div>정답 : {random}</div>
      <button onClick={gameStart}>Game Start</button>
      <button onClick={getRandom}>admin</button>
      <button onClick={gameRestart}>Restart</button>
    </>
  );
};

export default App;
