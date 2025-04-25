import React, { useState } from "react";
import { useUser } from "../../hooks/useUser";
import { Button, InputAdornment, TextField } from "@mui/material";
import { hostname } from "../../consts";
import "bootstrap-icons/font/bootstrap-icons.css";
import Launch from "../assets/Launch.png";

type LoginProps = {
  ws: WebSocket | undefined;
  setWs: (ws: WebSocket | undefined) => void;
  createWebSocket: (url: string) => WebSocket | undefined;
};

export const Login: React.FC<LoginProps> = ({ ws, setWs, createWebSocket }) => {
  const { login, setUser } = useUser();
  const [userName, setUsername] = useState(login);

  const handleChangeLogin = (event: any) => {
    setUsername(event.target.value);
  };

  // при авторизации регистрируем новое вебсокет соединеие
  const handleClickSignInBtn = () => {
    setUser({
      userInfo: {
        Data: {
          login: userName,
        },
      },
    });
    if (ws) {
      ws.close(1000, "User enter userName");
    } else {
      console.log("ws.close(1000, User enter userName); dont work");
    }
    setWs(
      createWebSocket(
        `ws://${hostname}:8010/?username=${encodeURIComponent(userName)}`
      )
    );
  };

  return (
    <>
      <div className="login">
        <div className="logo">
          <span>FTL</span>
          <img src={Launch} className="logo-image"></img>
          <span>TALK</span>
        </div>
        <TextField
          placeholder="Введите имя"
          variant="outlined"
          className="login-input"
          value={userName}
          onChange={handleChangeLogin}
          sx={{
            "& .MuiInputLabel-root": {
              textAlign: "center",
              width: "100%",
              transformOrigin: "center",
            },
            "& .MuiOutlinedInput-root": {
              justifyContent: "center",
              "& fieldset": {
                // Targeting the outline
                borderColor: "#181D33", // Replace 'red' with your desired border color
                borderWidth: "4px", // Replace '2px' with your desired border width
              },
              "&.Mui-focused fieldset": {
                // Focused state
                borderColor: "#B51E51",
                borderWidth: "4px", // Optional: Change border color when focused
              },
            },
            "& input": {
              textAlign: "center",
              fontSize: "24px",
            },
          }}
        />

        <Button
          variant="outlined"
          onClick={handleClickSignInBtn}
          sx={{
            borderRadius: "10px",
            borderColor: "#b51e51",
            borderWidth: "4px",
            color: "#181D33",
            fontSize: "24px",
            "&:hover": {
              backgroundColor: "rgb(115, 19, 51, 0.1)",
            },
          }}
        >
          ПОДКЛЮЧИТЬСЯ
        </Button>
      </div>
    </>
  );
};
