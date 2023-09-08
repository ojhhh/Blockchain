import Block from "@core/block/block";
import Chain from "@core/chain/chain";
// npm install @types/ws ws
import { WebSocket, WebSocketServer } from "ws";

// ws
// 기본적인 연결 관련된것만 있는 모듈

// enum : 상태를 지정할 때 사용
enum MessageType {
  // 코드 가독성을 높히기 위해 사용
  // 마지막 블록을 요청할 때
  lastBlock = 0,
  // 전체 체인을 요청할 때
  allBlock = 1,
  // 블록이 추가됬을 때
  addBlock = 2,
}

interface IMessage {
  // Message type
  type: MessageType;
  // Message value
  payload: any;
}

class P2P extends Chain {
  // Chain을 상속받아서 Chain에 있는 메소드를 사용
  private sockets: Array<any>; // 연결된 소켓 확인

  constructor() {
    super();
    this.sockets = [];
  }

  // 연결된 소켓을 반환
  getSockets(): Array<WebSocket> {
    return this.sockets;
  }

  // void : 반환값이 없는 함수
  connectSocket(socket: WebSocket, type?: MessageType): void {
    // 연결된 소켓을 sockets에 추가
    // 서비스에 연결되면 충돌방지를 위해 고유의 포트번호 지정
    // 어떤 값으로 소켓이 들어올지 몰라서 any로 풀어둠
    this.sockets.push(
      `${(socket as any)._socket.remoteAddress} : ${
        (socket as any)._socket.remotePort
      }`
    );
    // socket.send() : 메소드를 호출하면 이벤트 실행
    socket.on("message", (_data: string) => {
      const data = JSON.parse(_data.toString());

      // data.type은 0, 1, 2의 숫자를 받음
      switch (data.type) {
        case MessageType.lastBlock:
          const message: IMessage = {
            // 모든블록 타입이 실행되는지 확인
            type: MessageType.lastBlock,
            // 마지막 블록은 payload에 담음
            payload: [this.lastestBlock()],
          };
          // 완성된 객체를 문자여롤 치환 후 내보냄
          socket.send(JSON.stringify(message));
          break;
        case MessageType.allBlock:
          break;
        case MessageType.addBlock:
          // 추가 될 수 있는지 검증
          const isValid = this.replaceChain(data.payload);
          // 문제가 있으면 종료
          if (isValid.isError) break;
          //
          const message2: IMessage = {
            type: MessageType.addBlock,
            payload: data.payload,
          };

          this.sockets.forEach((item) => {
            // 현재 접속한 유저에게 메시지 전송
            item.send(JSON.stringify(message2));
          });
          break;

        default:
          break;
      }
    });
  }

  listen(port: number): void {
    // 현재 로컬에서 서버 생성
    // websocket port listen
    const server: WebSocketServer = new WebSocket.Server({ port });

    server.on("connection", (socket: WebSocket) => {
      // 소켓 연결 시도
      console.log("new socket start");
      // 현재 소켓 배열에 저장 및 message 이벤트 등록
      this.connectSocket(socket);
    });
  }

  addToPeer(peer: string): void {
    // 상대방이 내 ip에 접속 했을때 소켓을 생성하고 연결
    // 상대 소켓 서버 주소를 받아서 연결 시도
    const socket: WebSocket = new WebSocket(peer);
    socket.on("open", () => {
      // 연결이 성공하면 open 이벤트 실행
      console.log("connect success");
      this.connectSocket(socket, MessageType.addBlock);
    });
  }
}

export default P2P;
// ip 주소 연결하여 data를 받음
