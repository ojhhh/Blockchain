import Block from "@core/block/block";
import P2P from "./p2p";
// npm install -D @types/express express
import express, { Express, Request, Response } from "express";
import os from "os";
// npm install -D @types/cors cors
import cors from "cors";

const app: Express = express();
const ws: P2P = new P2P();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/chains", (req: Request, res: Response) => {
  // chain에 있는 get() 메소드를 가져와서 현재 체인 정보를 보여줌
  res.json(ws.get());
});

app.post("/block/mine", (req: Request, res: Response) => {
  // 블록에 기록할 내용을 받고
  const { data }: { data: Array<string> } = req.body;
  // 요청 들어온 블록을 가져오는데 정보가 없으면 새로 만듬
  const newBlock: Block | null = Block.generateBlock(
    ws.lastestBlock(),
    data,
    ws.getAdjustmentBlock()
  );

  if (newBlock == null) res.send("error");

  ws.addToChain(newBlock);
  res.json(newBlock);
});

app.get("/peer/add", (req: Request, res: Response) => {
  // ip를 가져옴
  const networkinterface = os.networkInterfaces();
  let v4: string;
  // for in은 객체의 key에 접근
  for (const key in networkinterface) {
    const Array = networkinterface[key];
    // for of은 객체의 value에 접근
    for (const value of Array) {
      if (!value.internal && value.family === "IPv4") v4 = value.address;
    }
  }

  ws.addToPeer(`ws://${v4}:7545`);
  res.end();
});

app.get("/peer", (req: Request, res: Response) => {
  const sockets = ws.getSockets();
  res.json(sockets);
});

app.listen(8080, () => {
  console.log("Server on");
  ws.listen(7545);
});
