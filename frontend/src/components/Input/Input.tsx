import React, { useState } from "react";
import { Message } from "../../consts";
import { Button, IconButton, TextField } from "@mui/material";
import { useUser } from "../../hooks/useUser";

type InputProps = {
  ws: any;
  setMessageArray: any;
};

export const Input: React.FC<InputProps> = ({ ws, setMessageArray }) => {
  const { login } = useUser();
  const [message, setMessage] = useState<Message>({ data: "" });

  // в инпуте делаем обработчик на изменение состояния инпута
  const handleChangeMessage = (event: any) => {
    const newMsg: Message = {
      data: event.target.value,
      username: login,
      send_time: String(new Date()),
    };
    setMessage(newMsg);
  };

  // на кнопку Отправить мы должны посать сообщение по вебсокету
  const handleClickSendMessBtn = () => {
    if (login && ws) {
      message.send_time = "2024-02-23T13:45:41Z";
      const msgJSON = JSON.stringify(message);
      ws.send(msgJSON);
      // добавляем новое сообщение в массив
      setMessageArray((currentMsgArray: any) => [...currentMsgArray, message]);
    }
  };

  return (
    <>
      <div className="chat-input">
        <TextField
          id="outlined-multiline-flexible"
          placeholder="Написать сообщение"
          multiline
          variant="standard"
          maxRows={4}
          onChange={handleChangeMessage}
          margin={"normal"}
          style={{
            width: "100%",
            backgroundColor: "#181D33",
            borderRadius: "15px",
            border: "none",
          }}
          sx={{
            width: "100%",
            backgroundColor: "#181D33",
            borderRadius: "15px",
            "& .MuiInput-underline:before": {
              borderBottomColor: "transparent", // Неактивное состояние
            },
            "& .MuiInput-underline:after": {
              borderBottomColor: "transparent", // Активное состояние
            },
            "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
              borderBottomColor: "transparent", // Состояние при наведении (не заблокировано)
            },
            "& .MuiInputBase-input": {
              // Добавляем стили для текста
              color: "white",
              marginBottom: "5px",
            },
          }}
        />
        <IconButton
          size="large"
          onClick={handleClickSendMessBtn}
          style={{ color: "#B51E51" }}
          aria-label="delete"
        >
          <i className="bi bi-send"></i>
        </IconButton>
      </div>
    </>
  );
};
