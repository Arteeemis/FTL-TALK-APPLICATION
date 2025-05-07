# FTL-TALK - Распределенная информационная система обмена сообщениями в реальном времени
Проект создан в рамках курса "Сетевые технологии в АСОИУ" (МГТУ им. Н.Э. Баумана, ИУ5, 6 семестр). Включает в себя три уровня - прикладной, транспортный, канальный - и РПЗ.

### О проекте
Данный проект представляет собой трехуровневую систему обмена текстовыми сообщениями и файлами. Прикладной уровень – интерфейс чата с возможностью отправки и получения данных. Транспортный уровень – разбиение сообщений на сегменты и их сборка. Канальный уровень – эмуляция передачи данных по ненадежному каналу связи с помехами. Каждый уровень реализован в виде отдельного веб-сервиса, что обеспечивает модульность и масштабируемость системы. Подробнее о проекте можно узнать в РПЗ.

### В данном репозитории представлена реализация прикладного уровня.

### Перед запуском необходимо установить пакеты и зависимотстти:

- ``` npm install ``` менеджер пакетов (фронт)
- ```npm install @reduxjs/toolkit react-redux redux-persist``` redux (фронт)
- ``` npm install @mui/material @emotion/react @emotion/styled ``` стили (фронт)
- ``` npm install -g typescript ``` (ws)
- ``` npm install -g ts-node ``` (ws)

### Запуск:

Фронт: ```npm run start```
Вебсокет сервер: ```ts-node index.ts```

## Ссылки на репозитории проекта:
1. [Прикладной](https://github.com/Arteeemis/FTL-TALK-APPLICATION)
2. [Транспортный](https://github.com/KristinaBu/mars-chat-transport)
3. [Канальный](https://github.com/Kh-Inna/mars-chat-channel)



# FTL-TALK is a distributed real-time messaging information system
The project was created as part of the course "Network Technologies at ASOIU" (Bauman Moscow State Technical University, IU5, 6th semester). It includes three levels - application, transport, channel - and an explanatory note.

### About the project
This project is a three-level text message and file exchange system. The application layer is a chat interface with the ability to send and receive data. The transport layer is the division of messages into segments and their assembly. The channel layer is an emulation of data transmission over an unreliable communication channel with interference. Each level is implemented as a separate web service, which ensures the modularity and scalability of the system. More information about the project can be found in the explanatory note.

### This repository provides an implementation of the application layer.

### Before launching, you need to install packages and dependencies.:

- ``npm install`` package manager (front)
- ``npm install @reduxjs/toolkit react-redux redux-persist`` redux (front)
- ``npm install @mui/material @emotion/react @emotion/styled `` styles (front)
- `` npm install -g typescript `` (ws)
- `` npm install -g ts-node `` (ws)

### Launch:

Front: ``npm run start``
Websocket server: ``ts-node index.ts``

## Links to project repositories:
1. [Applied](https://github.com/Arteeemis/FTL-TALK-APPLICATION )
2. [Transport](https://github.com/KristinaBu/mars-chat-transport )
3. [Channel](https://github.com/Kh-Inna/mars-chat-channel )
