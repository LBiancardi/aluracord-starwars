// https://www.npmjs.com/package/@supabase/supabase-js --> start supabase yard add @supabase/supabase-js

import { Box, Text, TextField, Image, Button } from "@skynexui/components";
import React from "react";
import appConfig from "../config.json";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import Link from "next/link";
import { ButtonSendSticker } from "../src/components/ButtonSendSticker";

// Como fazer AJAX --> https://medium.com/@omariosouto/entendendo-como-fazer-ajax-com-a-fetchapi-977ff20da3c6
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzMyOTMyMiwiZXhwIjoxOTU4OTA1MzIyfQ.D2B8cdDQygVqcbWNFnFHZHryoCUaPXnYBsI1DA4y1C0";
const SUPABASE_URL = "https://adnlwaiaaxkouadlxgoq.supabase.co";
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function escutaMensagensEmTempoReal(adicionaMensagem) {
  return supabaseClient
    .from("mensagens")
    .on("INSERT", (respostaLive) => {
      console.log("ouve nova mensagem");
      adicionaMensagem(respostaLive.new);
    })
    .subscribe();
}

export default function ChatPage() {
  const [mensagem, setMessagem] = React.useState("");
  const [listaDeMensagens, setListaDeMensagens] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const roteamento = useRouter();
  const user = roteamento.query.username;

  // const [showMoreUserInfo, setShowMoreUserInfo] = React.useState("none");

  // Sua lógica vai aqui
  React.useEffect(() => {
    supabaseClient
      .from("mensagens")
      .select("*")
      .order("id", { ascending: false })
      .then(({ data }) => {
        setListaDeMensagens(data);
        setIsLoaded(true);
      });
    escutaMensagensEmTempoReal((novaMensagem) => {
      console.log(`nova msg: ${novaMensagem}`);
      setListaDeMensagens((valorAtualDaLista) => {
        return [novaMensagem, ...valorAtualDaLista];
      });
    });
  }, []);

  function handleDeleteMessage(event, mensagemID, mensagemDe) {
    event.preventDefault();
    if (user.toUpperCase() === mensagemDe.toUpperCase()) {
      supabaseClient
        .from("mensagens")
        .delete()
        .match({ id: mensagemID })
        .then(({ data }) => {
          const apagarElementoLista = listaDeMensagens.filter(
            (mensagem) => mensagem.id !== mensagemID
          );
          setListaDeMensagens(apagarElementoLista);
        });
    } else {
      window.alert("You can't delete other users messages!");
    }
  }

  function handleNovaMensage(novaMensagem) {
    const mensagem = {
      // id: listaDeMensagens.length + 1,
      de: user,
      texto: novaMensagem,
    };

    if (user === "") {
      return window.alert("Please Log In before message");
    }
    if (novaMensagem.length > 0) {
      supabaseClient
        .from("mensagens")
        .insert([mensagem])
        .then(({ data }) => {
          // console.log("Criando mensagem: ", data);
          // setListaDeMensagens([data[0], ...listaDeMensagens]);
        });
      setMessagem("");
    } else {
      window.alert("You can't send empty messages.");
    }
  }

  if (!isLoaded) {
    return (
      <>
        <Box
          styleSheet={{
            backgroundImage: {
              xs: `url(${appConfig.backgroundMobile})`,
              lg: `url(${appConfig.backgroundDesk})`,
            },
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <img src="errorUser.png" className="carregando" />
          <Text
            styleSheet={{
              color: "white",
            }}
          >
            Loading ...
          </Text>
        </Box>
      </>
    );
  }

  if (isLoaded) {
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
            width: "100%",
            maxWidth: "100%",
            maxHeight: "95vh",
            padding: "32px",
          }}
        >
          <Header username={user} />
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
              currentUser={user}
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
              {/* CALLBACK -> Chamada de retorno */}
              <ButtonSendSticker
                onStickerClick={(sticker) => {
                  // console.log("[USANDO] Salva esse sticker no banco");
                  handleNovaMensage(":sticker:" + sticker);
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
                  backgroundColor: "rgba(0,0,0,0)",
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
}

function Header(props) {
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
        <Text variant="heading5">Welcome, {props.username}</Text>
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
  // const [showInfo, setShowInfo] = React.useState("");
  // const today = new Date();
  const currentUser = props.currentUser;

  return (
    <Box
      tag="ul"
      styleSheet={{
        overflowY: "scroll",
        display: "flex",
        flexDirection: "column-reverse",
        flex: 1,
        position: "relative",
        color: appConfig.theme.colors.neutrals["200"],
        marginBottom: "16px",
        width: "100%",
      }}
    >
      {props.mensagem.map((mensagem) => {
        let marginLeftDesk = "0";
        let marginLeftMobile = "0";
        let currentUserMessageBg = appConfig.theme.colors.primary[800];
        currentUser.toUpperCase() === mensagem.de.toUpperCase()
          ? ((marginLeftDesk = "14%"),
            (marginLeftMobile = "10%"),
            (currentUserMessageBg = appConfig.theme.colors.primary[600]))
          : false;
        const search = "-";
        const replaceWith = "/";
        const date = mensagem.created_at
          .slice(0, mensagem.created_at.indexOf("T"))
          .split(search)
          .join(replaceWith);
        const hour = mensagem.created_at.slice(
          mensagem.created_at.indexOf("T") + 1,
          mensagem.created_at.indexOf("T") + 6
        );
        return (
          <Text
            key={mensagem.id}
            tag="li"
            styleSheet={{
              backgroundColor: currentUserMessageBg,
              borderRadius: "5px",
              display: "flex",
              flexDirection: "column",
              padding: "6px",
              marginBottom: "12px",
              wordBreak: "break-word",
              width: {
                xs: "90%",
                md: "85%",
              },
              marginLeft: {
                xs: marginLeftMobile,
                md: marginLeftDesk,
              },
              hover: {
                backgroundColor: appConfig.theme.colors.neutrals[700],
              },
            }}
          >
            <Box
              styleSheet={{
                display: "flex",
                margin: "0.25rem 0",
              }}
            >
              <Link
                href={`https://github.com/${mensagem.de}`}
                styleSheet={{
                  cursor: "pointer",
                }}
              >
                <Text
                  styleSheet={{
                    fontWeight: "bolder",
                    fontSize: "1em",
                    minWidth: "70px",
                    width: "10%",
                    hover: {
                      cursor: "pointer",
                    },
                  }}
                ></Text>
              </Link>

              {/* <Text
                styleSheet={{
                  fontWeight: "normal",
                  fontSize: "0.9em",
                  minWidth: "90px",
                  width: "10%",
                }}
              >
                Repositories: 10
              </Text>
              <Text
                styleSheet={{
                  fontWeight: "normal",
                  fontSize: "0.9em",
                  minWidth: "90px",
                  width: "10%",
                }}
              >
                Followers: 25
              </Text> */}
            </Box>
            <Box
              styleSheet={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "8px",
              }}
            >
              <Box
                styleSheet={{
                  alignItems: {
                    xs: "flex-start",
                    md: "center",
                  },
                  display: "flex",
                  flexWrap: "wrap",
                }}
              >
                <Link href={`https://github.com/${mensagem.de}`}>
                  <Image
                    title={`Open ${mensagem.de} GitHub`}
                    styleSheet={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      display: "inline-block",
                      marginRight: "8px",
                      hover: {
                        cursor: "pointer",
                        width: "35px",
                        height: "35px",
                      },
                    }}
                    src={`https://github.com/${mensagem.de}.png`}
                  />
                </Link>
                <Text tag="strong">{mensagem.de}</Text>
                <Text
                  styleSheet={{
                    fontSize: "12px",
                    marginLeft: {
                      xs: "10px",
                      sm: "8px",
                    },
                    marginTop: {
                      xs: "5px",
                      sm: "0",
                    },
                    color: appConfig.theme.colors.neutrals[300],
                  }}
                  tag="span"
                >
                  {`${date}`}
                </Text>
                <Text
                  onClick={(event) => {
                    let moreInfo =
                      event.target.parentNode.parentNode.parentNode.firstChild
                        .firstChild;
                    event.target.innerText === "show"
                      ? ((event.target.innerText = "hide"),
                        (moreInfo.innerText = "+GitHub"))
                      : ((event.target.innerText = "show"),
                        (moreInfo.innerText = ""));
                  }}
                  styleSheet={{
                    fontWeight: "bold",
                    fontSize: "0.9em",
                    marginLeft: {
                      xs: "10px",
                      sm: "25px",
                    },
                    marginTop: {
                      xs: "3px",
                      sm: "0",
                    },
                    color: appConfig.theme.colors.neutrals[0],
                    hover: {
                      cursor: "pointer",
                      color: appConfig.theme.colors.neutrals[400],
                    },
                  }}
                  title={`Open ${mensagem.de} GitHub`}
                  tag="span"
                >
                  show
                </Text>
              </Box>
              <Box>
                <Button
                  key={mensagem.id}
                  type="submit"
                  onClick={(event) => {
                    return props.onDelete(event, mensagem.id, mensagem.de);
                  }}
                  title={`Apagar mensagem`}
                  styleSheet={{
                    borderRadius: "100px",
                    color: appConfig.theme.colors.neutrals[100],
                    fontSize: "1em",
                    fontWeight: "bold",
                    transition: "0.5s",
                  }}
                  buttonColors={{
                    contrastColor: "#FDFDFD",
                    mainColor: "rgba(0, 0, 0, 0.0)",
                    mainColorStrong: "rgba(255, 107, 107, .35)",
                  }}
                  colorVariant="negative"
                  iconName="FaRegTrashAlt"
                />
              </Box>
            </Box>
            <Box
              styleSheet={{
                alignItems: "flex-end",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {mensagem.texto.startsWith(":sticker:") ? (
                <Image
                  styleSheet={{
                    width: "50%",
                    maxWidth: "120px",
                  }}
                  src={mensagem.texto.replace(":sticker:", "")}
                />
              ) : (
                mensagem.texto
              )}

              <Text
                styleSheet={{
                  textAlign: "right",
                  fontSize: "10px",
                  marginLeft: "13px",
                  width: "22%",
                  color: appConfig.theme.colors.neutrals[300],
                }}
                tag="span"
              >
                {hour}
              </Text>
            </Box>
          </Text>
        );
      })}
    </Box>
  );
}

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
