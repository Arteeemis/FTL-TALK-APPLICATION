import express from "express";
import axios from "axios";
import http from "http";
import ws, { type WebSocket } from "ws";

const port: number = 8005;
const hostname = "172.20.10.4";
const transportLevelPort = 8080;
const transportLevelHostname = "172.20.10.2";

interface Message {
  id?: number;
  username: string;
  data?: string;
  send_time?: string;
  error?: string;
}

type Users = Record<
  string,
  Array<{
    id: number;
    ws: WebSocket;
  }>
>;

const app = express();
const server = http.createServer(app);
const messageHistory: Message[] = [];

app.use(express.json());

app.post(
  "/receive",
  (req: { body: Message }, res: { sendStatus: (arg0: number) => void }) => {
    const message: Message = req.body;
    console.log(
      `[TRANSPORT] Received from transport: ${message.username}: ${message.data}`
    );
    sendMessageToOtherUsers(message.username, message);
    res.sendStatus(200);
  }
);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});

const wss = new ws.WebSocketServer({ server });
const users: Users = {};

const sendMsgToTransportLevel = async (message: Message): Promise<void> => {
  try {
    const response = await axios.post(
      `http://${transportLevelHostname}:${transportLevelPort}/send`,
      message
    );
    console.log(
      `[TRANSPORT] Sent to transport level: ${message.username}: ${message.data}`
    );
    console.log(`[TRANSPORT] Response status: ${response.status}`);

    if (response.status !== 200) {
      message.error = "Transport level error";
      users[message.username]?.forEach((element) => {
        if (message.id === element.id) {
          element.ws.send(JSON.stringify(message));
        }
      });
    }
  } catch (error) {
    console.error(
      `[TRANSPORT] Error sending to transport level:`,
      error.message
    );
    message.error = "Transport level connection failed";
    users[message.username]?.forEach((element) => {
      if (message.id === element.id) {
        element.ws.send(JSON.stringify(message));
      }
    });
  }
};

function sendMessageToOtherUsers(username: string, message: Message): void {
  const msgString = JSON.stringify(message);
  console.log(
    `[BROADCAST] Sending from ${username} to others: ${message.data}`
  );

  for (const key in users) {
    if (key !== username) {
      users[key].forEach((element) => {
        try {
          element.ws.send(msgString);
        } catch (error) {
          console.error(`[BROADCAST] Error sending to ${key}:`, error.message);
        }
      });
    }
  }
}

wss.on("connection", (websocketConnection: WebSocket, req: Request) => {
  if (req.url.length === 0) {
    console.log(`[ERROR] Empty connection URL`);
    return;
  }

  // @ts-expect-error
  const url = new URL(req?.url, `http://${req.headers.host}`);
  const username = url.searchParams.get("username");

  if (username !== null) {
    console.log(`[CONNECT] New connection from: ${username}`);

    if (username in users) {
      users[username].push({
        id: users[username].length,
        ws: websocketConnection,
      });
    } else {
      users[username] = [{ id: 1, ws: websocketConnection }];
    }

    // Отправляем историю сообщений новому пользователю, если она не пустая
    if (messageHistory.length > 0) {
      // Отправляем каждое сообщение отдельно
      messageHistory.forEach((message) => {
        try {
          websocketConnection.send(JSON.stringify(message));
        } catch (error) {
          console.error(
            `[HISTORY] Error sending history to ${username}:`,
            error.message
          );
        }
      });
    }
  }

  websocketConnection.on("message", (messageString: string) => {
    const message: Message = JSON.parse(messageString);
    message.username = message.username ?? username;
    console.log(`[MESSAGE] Received from ${message.username}: ${message.data}`);
    if (
      !message.send_time ||
      !messageHistory.some(
        (m) => m.send_time === message.send_time && m.data === message.data
      )
    ) {
      messageHistory.push(message);
    }
    sendMessageToOtherUsers(message.username, message);
    void sendMsgToTransportLevel(message);
  });

  websocketConnection.on("close", () => {
    console.log(`[DISCONNECT] User disconnected: ${username}`);
    if (username && users[username]) {
      users[username] = users[username].filter(
        (user) => user.ws !== websocketConnection
      );
      if (users[username].length === 0) {
        delete users[username];
      }
    }
  });
});
