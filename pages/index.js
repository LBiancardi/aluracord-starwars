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

function TitleText(props) {
  return props === "" ? "Choose your side" : `Welcome to the ${props} side`;
}

async function gitHubRequest(username) {
  try {
    const res = await fetch(`https://api.github.com/users/${username}`);
    const userInfos = await res.json();
    const location = userInfos.location;
    return location;
  } catch (err) {
    console.error(err);
  }
}

export default function PaginaInicial() {
  const [username, setUsername] = React.useState("");
  const [userFound, setUserFound] = React.useState("none");
  const [location, setLocation] = React.useState("");
  const [displayInfos, setDisplayInfos] = React.useState("none");
  const [userIsInvalid, setuserIsInvalid] = React.useState("true");
  const roteamento = useRouter();
  const [showUserImage, setUserImage] = React.useState("/errorUser.png");
  const [theme, setTheme] = React.useState("");
  const [themeBgDesktop, setThemeBgDesktop] = React.useState(
    appConfig.backgroundDesk
  );
  const [themeBgMobile, setThemeBgMobile] = React.useState(
    appConfig.backgroundMobile
  );

  return (
    <>
      <Box
        styleSheet={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: appConfig.theme.colors.primary[500],
          backgroundImage: {
            xs: `url(${themeBgMobile})`,
            lg: `url(${themeBgDesktop})`,
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
            justifyContent: `space-between`,
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
              !userIsInvalid
                ? (roteamento.push(`/chat?username=${username}`),
                  (appConfig.backgroundMobile = themeBgMobile),
                  (appConfig.backgroundDesk = themeBgDesktop))
                : setUserFound("");
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
            <Title tag="h2">
              {username} {TitleText(theme)}
            </Title>
            <Text
              variant="body3"
              styleSheet={{
                marginBottom: "32px",
                color: appConfig.theme.colors.neutrals[400],
              }}
            >
              {appConfig.name}
            </Text>
            <Text
              styleSheet={{
                display: `${userFound}`,
                textAlign: "left",
                color: "red",
                marginBottom: "0.3rem",
                width: "100%",
              }}
            >
              User not found
            </Text>
            <TextField
              value={username}
              onChange={function (event) {
                // Onde esta o valor?
                const valor = event.target.value;
                // Atualizar o valor da variavel usando react
                valor.length >= 2
                  ? (setUserImage(`https://github.com/${valor}.png`),
                    setuserIsInvalid(""))
                  : (setUserImage("/errorUser.png"),
                    setDisplayInfos("none"),
                    setuserIsInvalid("true"));
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
              placeholder="Github Username"
            />
            <Box
              styleSheet={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                gap: "1rem",
              }}
            >
              <Button
                disabled={`${userIsInvalid}`}
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
              <Button
                disabled={`${userIsInvalid}`}
                type="button"
                label="Search User"
                fullWidth
                buttonColors={{
                  contrastColor: appConfig.theme.colors.neutrals["800"],
                  mainColor: appConfig.theme.colors.primary[100],
                  mainColorLight: appConfig.theme.colors.primary[400],
                  mainColorStrong: appConfig.theme.colors.primary[600],
                }}
                onClick={async () => {
                  const userLocation = await gitHubRequest(username);
                  console.log(userLocation);
                  !userLocation
                    ? setLocation(`${username} is not from this world`)
                    : setLocation(userLocation);
                  username.length >= 2
                    ? (setUserImage(`https://github.com/${username}.png`),
                      setDisplayInfos(""),
                      setuserIsInvalid(""),
                      setUserFound("none"))
                    : (setUserImage("/errorUser.png"),
                      setLocation(""),
                      setDisplayInfos("none"),
                      setuserIsInvalid("true"),
                      setUserFound(""));
                  setUsername(username);
                }}
              />
            </Box>

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
                onClick={function (event) {
                  event.preventDefault();
                  setTheme("dark");
                  setThemeBgDesktop("/darkSideBg.png");
                  setThemeBgMobile("/darkSideBgMobile.jpg");
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
                onClick={function (event) {
                  event.preventDefault();
                  setTheme("light");
                  setThemeBgDesktop("/lightSideBg.jpg");
                  setThemeBgMobile("/lightSideBgMobile.jpg");
                }}
              />
            </Box>
          </Box>
          {/* Formulário */}

          {/* Photo Area */}
          <Box
            styleSheet={{
              display: `flex`,
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
              src={`${showUserImage}`}
            />
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[200],
                display: `${displayInfos}`,
                backgroundColor: appConfig.theme.colors.neutrals[900],
                padding: "3px 10px",
                borderRadius: "1000px",
              }}
            >
              {username}
            </Text>
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[200],
                display: `${displayInfos}`,
                marginTop: "0.5rem",
                backgroundColor: appConfig.theme.colors.neutrals[900],
                padding: "3px 10px",
                borderRadius: "1000px",
              }}
            >
              {location}
            </Text>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}
