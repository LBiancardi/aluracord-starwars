import { Box, Button, Text, TextField, Image } from "@skynexui/components";
import { useRouter } from "next/router";

export default function PaginaDoChat() {
  const roteamento = useRouter();

  return (
    <>
      <Box
        styleSheet={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0,0,0,0.8)",
          backgroundImage: {
            xs: `url(/starwarsBg--Desktop.jpg)`,
            lg: `url(/starwarsBg--Mobile.jpg)`,
          },
          backgroundRepeat: "no-repeat",
          // backgroundSize: "cover",
          backgroundBlendMode: "multiply",
        }}
      >
        <Box
          styleSheet={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "rgba(255,255,255,0.3)",
            justifyContent: `space-between`,
            flexDirection: {
              xs: "column",
              sm: "row",
            },
            width: "100%",
            maxWidth: "980px",
            border: "solid 2px",
            borderRadius: "5px",
            padding: "32px",
            margin: "16px",
            boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
          }}
        >
          <p>Ooops, you don't suppose to be here...</p>
          <Button
            type="submit"
            label="Home"
            onClick={function goBack() {
              roteamento.push("/");
            }}
          />
        </Box>
      </Box>
    </>
  );
}
