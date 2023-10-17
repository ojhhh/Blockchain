import { useEffect, useState } from "react";
import axios from "axios";
import useWeb3 from "./hooks/web3.hook";
import abi from "./abi/myNFT.json";

const resp_url = process.env.REACT_APP_RESP_URL;
const pinata_api_key = process.env.REACT_APP_PINATA_API_KEY;
const pinata_secret_api_key = process.env.REACT_APP_PINATA_SECRET_API_KEY;
const json_url = process.env.REACT_APP_JSON_URL;

const App = () => {
  const { user, web3 } = useWeb3();
  const [contract, setContract] = useState(null);

  const [file, setFile] = useState(null);
  const [ipfshash, setIpfshash] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [filehash, setFilehash] = useState("");
  const [jsonhash, setJsonhash] = useState("");
  const [jsonName, setJsonName] = useState("");

  const [tokenId, setTokenId] = useState("");

  const [count, setCount] = useState();

  useEffect(() => {
    if (web3) {
      if (contract) return;

      const myNFT = new web3.eth.Contract(
        abi,
        "0x7eF97EE5d3FC0183c34Ae875e4dA7BeBd0dA0fE8",
        { data: "" }
      );
      setContract(myNFT);
    }
  }, [web3]);

  const upload = async () => {
    try {
      const fileData = new FormData();
      fileData.append("file", file);
      const resp = await axios.post(resp_url, fileData, {
        headers: {
          "Content-Type": "multipart/form-data",
          pinata_api_key,
          pinata_secret_api_key,
        },
      });

      console.log("resp : ", resp);

      if (resp) {
        const { data } = resp;
        setFilehash(data.IpfsHash);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const jsonUpload = async () => {
    try {
      const data = {
        pinataContent: {
          name,
          description,
          image: "https://lime-rear-fowl-220.mypinata.cloud/ipfs/" + filehash,
        },
        pinataMetadata: {
          name: jsonName,
        },
      };

      const result = await axios.post(json_url, data, {
        headers: {
          "Content-Type": "application/json",
          pinata_api_key,
          pinata_secret_api_key,
        },
      });

      console.log("result : ", result);

      if (result) {
        await getTokenIdLength();
        const { data } = result;
        setJsonhash(data.IpfsHash);
      }
    } catch (error) {
      console.error("result error :", error);
    }
  };

  useEffect(() => {
    // console.log("file : ", file);
  }, [file]);

  useEffect(() => {}, [jsonhash]);

  const getTokenIdLength = async () => {
    const result = await contract.methods.getTokenIdLength().call();

    setTokenId(parseInt(result));
  };

  const minting = async () => {
    // await contract.methods.minting(count).send({ from: user.account });
    await contract.methods
      .minting(tokenId, jsonhash)
      .send({ from: user.account });
  };

  const getMyNFT = async () => {
    const myNFT = await contract.methods.getMyNFT().call();

    console.log("myNFT : ", myNFT);
  };

  return (
    <>
      <h2>이미지 업로드</h2>
      <label>IPFS FILE UPLOAD</label>
      <br />
      <input
        type="file"
        onChange={(e) => {
          setFile(e.target.files[0]);
        }}
      />
      <br />
      <button onClick={upload}>FILE upload</button>
      <h2>배포용 json 만들기</h2>
      <div>
        <span>JSON FILE NAME : </span>
        <input type="text" onChange={(e) => setJsonName(e.target.value)} />
        <br />
        <span>NFT NAME : </span>
        <input type="text" onChange={(e) => setName(e.target.value)} />
        <br />
        <span>NFT DESCRIPTION : </span>
        <input type="text" onChange={(e) => setDescription(e.target.value)} />
        <br />
        <span>NFT URL : </span>
        <input type="text" readOnly placeholder={filehash} />
        <br />
        <button onClick={jsonUpload}>JSON upload</button>
      </div>
      <h2>MINTING</h2>
      <span>TOKEN ID : </span>
      <input type="text" readOnly placeholder={tokenId} />
      <br />
      <span>JSON HASH : </span>
      <input type="text" readOnly placeholder={jsonhash} /> <br />
      <button onClick={minting}>MINTING</button>
      <h2>MY NFT</h2>
    </>
  );
};

export default App;
