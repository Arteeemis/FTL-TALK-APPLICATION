import React from "react";
import { useUser } from "../../hooks/useUser";
import { Message } from "../../consts";
import { Card, CardContent, Typography, Box, Icon } from "@mui/material";
import Earth from "../assets/EarthPlanet.png";

type MessageProps = {
  msg: Message;
};

export const MessageCard: React.FC<MessageProps> = ({ msg }) => {
  const { login } = useUser();

  // функция для форматирования времени, чтобы оно красиво отображалось
  function formatTime(isoDateTime: string | number | Date) {
    const dateTime = new Date(isoDateTime);
    return dateTime.toLocaleString("en-US", {
      timeZone: "UTC",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
    });
  }

  const isOwnMessage = msg.username === login;
  const messageBackgroundColor = isOwnMessage ? "#181D33" : "#34495e"; // Темно-синий фон
  const headerBackgroundColor = "#B51E51"; // Темно-красный фон для верхней части
  const textColor = "white";

  const borderRadiusStyle = isOwnMessage
    ? "15px 15px 0px 15px"
    : "15px 15px 15px 0px";

  return (
    <div
      className={`${
        msg.username === login ? "msg--own" : "msg--alien"
      } msg--container`}
    >
      {msg.username !== login ? (
        <img src={Earth} className="msg-logo"></img>
      ) : (
        <></>
      )}

      <Card
        style={{
          backgroundColor: messageBackgroundColor,
          color: textColor,
          borderRadius: borderRadiusStyle,
          margin: "20px",
          minWidth: "80%",
          alignSelf: isOwnMessage ? "flex-end" : "flex-start",
        }}
      >
        <>
          <Box
            component="div"
            sx={{
              bgcolor: headerBackgroundColor,
              color: textColor,
              padding: "8px",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
              display: "flex",
            }}
          >
            <Typography
              variant="subtitle2"
              align="left"
              style={{ flexGrow: 1 }}
            >
              {msg.username ?? "Аноним"}
            </Typography>
            <Typography
              variant="caption"
              style={{ color: "rgba(255, 255, 255, 0.7)", marginRight: "10px" }}
            >
              {formatTime(msg.send_time ?? String(new Date()))}
            </Typography>
          </Box>
          <CardContent style={{ padding: "12px" }}>
            <Typography variant="body1" align="left">
              {msg.data}
            </Typography>
          </CardContent>
        </>
      </Card>
      {msg.username === login ? (
        <img src={Earth} className="msg-logo"></img>
      ) : (
        <></>
      )}
    </div>
  );
};
