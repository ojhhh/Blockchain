import { randomBytes } from "crypto";
import elliptic from "elliptic";
import { SHA256 } from "crypto-js";
import fs from "fs";
import path from "path";

// 지갑 클래스 생성 후 브라우저에서 확인하기

// create elliptic instance
const ec = new elliptic.ec("secp256k1");

// 기본 지갑 정보 저장 경로
const dir = path.join(__dirname, "../../data");

// 지갑 클래서 정의
export class Wallet {
  public account: string;
  public privateKey: string;
  public publicKey: string;
  public balance: number;

  constructor(privateKey: string = "") {
    // 생성단계에서 개인키 값이 없으면 만듬
    // privateKey의 값이 빈문자열이기 때문에 this.getPrivateKey() 실행
    this.privateKey = privateKey || this.getPrivateKey();
    this.publicKey = this.getPublicKey();
    this.account = this.getAccount();
    this.balance = 0;
    // privateKey: string = "" 이기 때문에 Wallet.createWallet(this) 실행
    if (privateKey == "") Wallet.createWallet(this);
  }

  static createWallet(myWallet: Wallet) {
    // fs 모듈로 파일 생성
    // 지갑을 생성하면 주소를 저장
    // 주소 안에는 개인키를 넣음
    const filename = path.join(dir, myWallet.account);
    const filecontent = myWallet.privateKey;
    console.log("createWallet");
    fs.writeFileSync(filename, filecontent);
  }

  static getWalletList(): string[] {
    // readdirSync 폴더를 읽어서 안에 있는 파일 내용을 문자열로 가져옴
    const files: string[] = fs.readdirSync(dir);
    return files;
  }

  // data 폴더 안에 해당하는 지갑 주소를 찾아서 반환
  static getWalletPrivateKey(account: string): string {
    const filename = path.join(dir, account);
    const filecontent = fs.readFileSync(filename);
    return filecontent.toString();
  }

  public getPrivateKey(): string {
    console.log("getPrivateKey()");
    return randomBytes(32).toString("hex");
  }

  public getPublicKey(): string {
    // 개인키로 공개키를 만듬
    const keyPair = ec.keyFromPrivate(this.privateKey);
    return keyPair.getPublic().encode("hex", false);
  }

  public getAccount(): string {
    return `${this.publicKey.slice(26).toString()}`;
  }
}
