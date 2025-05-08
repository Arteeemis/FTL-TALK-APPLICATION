import { useUser } from "../../hooks/useUser";
import { Message } from "../../consts";
import { Input } from "../Input/Input";
import { MessageCard } from "../MessageCard/MessageCard";
import { Header } from "./components/Header/Header";
import React from "react";
import Alert from "@mui/material/Alert";

type ChatProps = {
  messages: Message[];
  ws: WebSocket | undefined;
  messageArray: Message[];
  setMessageArray: (msg: Message[]) => void;
};

export const Chat: React.FC<ChatProps> = ({
  messages,
  ws,
  messageArray,
  setMessageArray,
}) => {
  const { login, resetUser } = useUser();

  // при логауте закрываем соединение
  const handleClickLogoutBtn = () => {
    setMessageArray([]);
    resetUser();
    if (ws) {
      ws.close(4000, login);
    } else {
      console.log("ws.close(4000, 'User logout'); don't work");
    }
  };

  return (
    <>
      <div className="chat">
        <Header onClick={handleClickLogoutBtn}></Header>

        <div className="chat--body">
          {messageArray.length > 0 ? (
            <div>
              {messageArray.map((msg: Message, index: number) => (
                <div key={index}>
                  <MessageCard msg={msg} />
                </div>
              ))}
            </div>
          ) : (
            <div style={{ fontSize: "2em", color: "gray" }}>
              Здесь будут сообщения
            </div>
          )}
        </div>

        {/* <Input ws={ws} setMessageArray={setMessageArray} /> */}
        <Alert
          icon={<i className="bi bi-cloud-check"></i>}
          severity="success"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "5px 10px",
            borderRadius: "15px",
            position: "fixed",
            bottom: "1em",
            backgroundColor: "#181D33",
            color: "#B51E51",
            "& .MuiAlert-icon": {
              color: "#B51E51",
            },
          }}
        >
          Подключение установлено - принимаем сообщения от Земли
        </Alert>
      </div>
    </>
  );
};
