import appConfig from "../config.json";
import { Box, Button, Text, TextField, Image } from "@skynexui/components";
import { useRouter } from "next/router";
import React from "react";

function Title(props) {
  const Tag = props.tag || "h1";
  return (
    <>
      <Tag>{props.children}</Tag>
      <style jsx>{`
        ${Tag} {
          color: ${appConfig.theme.colors.neutrals["100"]};
          font-size: 24px;
          font-weight: 600;
        }
      `}</style>
    </>
  );
}

export default function PaginaInicial() {
  const [username, setUsername] = React.useState("");
  const roteamento = useRouter();

  return (
    <>
      <Box
        styleSheet={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: appConfig.theme.colors.primary[500],
          // backgroundImage: "url('/starwarsBg2.jpg')",
          backgroundImage: {
            xs: "url('/starwarsBg--Mobile.jpg')",
            xl: "url(https://virtualbackgrounds.site/wp-content/uploads/2020/07/star-wars-imperial-star-destroyer-bridge-1536x864.jpg)",
          },
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundBlendMode: "multiply",
        }}
      >
        <Box
          styleSheet={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: {
              xs: "column",
              sm: "row",
            },
            width: "100%",
            maxWidth: "700px",
            border: "solid 2px",
            borderRadius: "5px",
            borderColor: appConfig.theme.colors.neutrals[600],
            padding: "32px",
            margin: "16px",
            boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
            backgroundColor: appConfig.theme.colors.neutrals["000"],
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            onSubmit={function (event) {
              event.preventDefault();
              roteamento.push("/chat");
              // console.log(`${username}`);
              // window.location.href = "/chat";
            }}
            styleSheet={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: { xs: "100%", sm: "50%" },
              textAlign: "center",
              marginBottom: "32px",
            }}
          >
            <Title tag="h2">May the force be with you {username}!</Title>
            <Text
              variant="body3"
              styleSheet={{
                marginBottom: "32px",
                color: appConfig.theme.colors.neutrals[400],
              }}
            >
              {appConfig.name}
            </Text>

            <TextField
              value={username}
              onChange={function (event) {
                // console.log("usuario digitou", event.target.value);
                // Onde esta o valor?
                const valor = event.target.value;
                // Atualizar o valor da variavel usando react
                setUsername(valor);
              }}
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[200],
                  mainColor: appConfig.theme.colors.neutrals[900],
                  mainColorHighlight: appConfig.theme.colors.primary[500],
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                },
              }}
              placeholder="Username"
            />
            <Button
              type="submit"
              label="Log in"
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["050"],
                mainColor: appConfig.theme.colors.primary[500],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600],
              }}
            />

            <Box
              styleSheet={{
                display: "flex",
                flexDirection: "row",
                alignItems: "left",
                justifyContent: "left",
                gap: "0.75rem",
                width: "100%",
                textAlign: "center",
                marginTop: "1rem",
              }}
            >
              <Button
                type="submit"
                label="Dark Side"
                styleSheet={{
                  backgroundColor: appConfig.theme.colors.neutrals[900],
                  color: appConfig.theme.colors.neutrals[100],
                  transition: "0.5s",
                  hover: {
                    backgroundColor:
                      appConfig.theme.colors.starWars["darkSideBg--hover"],
                    color:
                      appConfig.theme.colors.starWars["darkSideText--hover"],
                  },
                }}
                onClick={(e) => {
                  e.preventDefault();
                  console.log(`${username}`);
                }}
              />
              <Button
                type="submit"
                label="Light Side"
                styleSheet={{
                  backgroundColor: appConfig.theme.colors.neutrals[900],
                  color: appConfig.theme.colors.neutrals[100],
                  transition: "0.5s",
                  hover: {
                    backgroundColor:
                      appConfig.theme.colors.starWars["lightSideBg--hover"],
                    color:
                      appConfig.theme.colors.starWars["lightSideText--hover"],
                  },
                }}
                onClick={(e) => {
                  e.preventDefault();
                  console.log(`${username}`);
                }}
              />
            </Box>
          </Box>
          {/* Formulário */}

          {/* Photo Area */}
          <Box
            styleSheet={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              maxWidth: "200px",
              padding: "16px",
              // backgroundColor: appConfig.theme.colors.neutrals['800'],
              border: "1px solid",
              borderColor: appConfig.theme.colors.primary["700"],
              borderRadius: "10px",
              flex: 1,
              minHeight: "240px",
            }}
          >
            <Image
              styleSheet={{
                borderRadius: "50%",
                marginBottom: "16px",
              }}
              src={`https://github.com/${username}.png`}
            />
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[200],
                backgroundColor: appConfig.theme.colors.neutrals[900],
                padding: "3px 10px",
                borderRadius: "1000px",
              }}
            >
              {username}
            </Text>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}
