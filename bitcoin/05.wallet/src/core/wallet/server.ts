import express, { Request, Response } from "express";
import { Wallet } from "./index";
import path from "path";
import fs from "fs";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 지갑 페이지 접속
app.get("/", (req: Request, res: Response) => {
  const page = fs.readFileSync(
    path.join(__dirname, "/view/index.html"),
    "utf8"
  );
  res.send(page);
});

// 지갑 생성 요청
app.post("/newWallet", (req: Request, res: Response) => {
  res.json(new Wallet());
});

// 지갑 정보 불러오기
app.post("/walletList", (req: Request, res: Response) => {
  const list = Wallet.getWalletList();
  res.json(list);
});

// 지갑 주소 찾기
app.post("/walletSelect", (req: Request, res: Response) => {
  const { account } = req.body;
  const privateKey = Wallet.getWalletPrivateKey(account);
  res.json(new Wallet(privateKey));
});

app.listen(4000, () => {
  console.log("Server On");
});
