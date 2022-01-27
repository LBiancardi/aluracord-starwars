import { Box, Text, TextField, Image, Button } from "@skynexui/components";
import React from "react";
import appConfig from "../config.json";

export default function ChatPage() {
  const [mensagem, setMessagem] = React.useState("");
  const [listaDeMensagens, setListaDeMensagens] = React.useState([]);
  // Sua lógica vai aqui
  /*
  // USUARIO
  - User digita no campo textarea
  - Aperta enter para enviar
  - Adicionar o text na listagem -> Array

  // Dev
  - [x] Campo criado
  - [x] Usar o onChange, usar o useState( ter if para caso seja enter para limpar a variavel)
  - [x] Lista de mensagens
  */

  // ./Sua lógica vai aqui
  function handleDeleteMessage(id) {
    setListaDeMensagens((old) => {
      return old.filter((item) => item.id !== id);
    });
  }

  function handleNovaMensage(novaMensagem) {
    const mensagem = {
      id: listaDeMensagens.length + 1,
      from: sessionStorage.getItem("user"),
      texto: novaMensagem,
    };
    if (novaMensagem.length > 0) {
      setListaDeMensagens([mensagem, ...listaDeMensagens]);
      setMessagem("");
    }
  }

  return (
    <Box
      styleSheet={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: appConfig.theme.colors.primary[500],
        backgroundImage: {
          xs: `url(${appConfig.backgroundMobile})`,
          lg: `url(${appConfig.backgroundDesk})`,
        },
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundBlendMode: "multiply",
        color: appConfig.theme.colors.neutrals["100"],
      }}
    >
      <Box
        styleSheet={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
          borderRadius: "5px",
          backgroundColor: appConfig.theme.colors.primary["000"],
          height: "100%",
          maxWidth: "95%",
          maxHeight: "95vh",
          padding: "32px",
        }}
      >
        <Header />
        <Box
          styleSheet={{
            position: "relative",
            display: "flex",
            flex: 1,
            height: "80%",
            backgroundColor: appConfig.theme.colors.neutrals["000"],
            flexDirection: "column",
            borderRadius: "5px",
            padding: "16px",
          }}
        >
          <MessageList
            mensagem={listaDeMensagens}
            onDelete={handleDeleteMessage}
          />
          <Box
            as="form"
            styleSheet={{
              display: "flex",
              alignItems: "stretch",
            }}
          >
            <TextField
              value={mensagem}
              onChange={(event) => {
                const valor = event.target.value;
                setMessagem(valor);
              }}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  handleNovaMensage(mensagem);
                }
              }}
              placeholder="Message..."
              type="textarea"
              styleSheet={{
                width: "100%",
                border: "0",
                resize: "none",
                borderRadius: "5px",
                padding: "6px 8px",
                backgroundColor: appConfig.theme.colors.neutrals[800],
                marginRight: "12px",
                color: appConfig.theme.colors.neutrals[200],
                hover: {
                  backgroundColor: appConfig.theme.colors.neutrals[900],
                },
              }}
            />
            <Button
              type="submit"
              onClick={(event) => {
                event.preventDefault();
                handleNovaMensage(mensagem);
              }}
              label={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-send"
                >
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              }
              styleSheet={{
                backgroundColor: appConfig.theme.colors.neutrals[800],
                color: appConfig.theme.colors.neutrals[100],
                transition: "0.5s",
                marginBottom: "6px",
                hover: {
                  backgroundColor: appConfig.theme.colors.neutrals[900],
                },
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function Header() {
  return (
    <>
      <Box
        styleSheet={{
          width: "100%",
          marginBottom: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text variant="heading5">Chat</Text>
        <Button
          variant="tertiary"
          colorVariant="light"
          label="Logout"
          href="/"
        />
      </Box>
    </>
  );
}

function MessageList(props) {
  return (
    <Box
      tag="ul"
      styleSheet={{
        overflow: "auto",
        display: "flex",
        flexDirection: "column-reverse",
        flex: 1,
        color: appConfig.theme.colors.neutrals["200"],
        marginBottom: "16px",
      }}
    >
      {props.mensagem.map((mensagem) => {
        return (
          <Text
            key={mensagem.id}
            tag="li"
            styleSheet={{
              borderRadius: "5px",
              padding: "6px",
              marginBottom: "12px",
              wordBreak: "break-word",
              hover: {
                backgroundColor: appConfig.theme.colors.neutrals[700],
              },
            }}
          >
            <Box
              styleSheet={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "8px",
              }}
            >
              <Box>
                <Image
                  styleSheet={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    display: "inline-block",
                    marginRight: "8px",
                  }}
                  src={`https://github.com/${mensagem.from}.png`}
                />
                <Text tag="strong">{mensagem.from}</Text>
                <Text
                  styleSheet={{
                    fontSize: "10px",
                    marginLeft: "8px",
                    color: appConfig.theme.colors.neutrals[300],
                  }}
                  tag="span"
                >
                  {new Date().toLocaleDateString()}
                </Text>
              </Box>
              <Box>
                <Button
                  key={mensagem.id}
                  type="submit"
                  onClick={() => {
                    return props.onDelete(mensagem.id);
                  }}
                  label="X"
                  styleSheet={{
                    backgroundColor: "rgba(180,60,18,1)",
                    borderRadius: "100px",
                    color: appConfig.theme.colors.neutrals[100],
                    fontSize: "1.2em",
                    fontWeight: "bold",
                    transition: "0.5s",
                    hover: {
                      backgroundColor: "rgba(180,60,18,0.7)",
                    },
                  }}
                />
              </Box>
            </Box>
            {mensagem.texto}
          </Text>
        );
      })}
    </Box>
  );
}
