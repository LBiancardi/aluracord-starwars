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
            xs: `url(/404bg.png)`,
            lg: `url(/404bg.png)`,
          },
          backgroundRepeat: "no-repeat",
          // backgroundSize: "cover",
          backgroundBlendMode: "multiply",
        }}
      >
        <div>
          <p>Ooops, you don't suppose to be here...</p>
          <Button
            type="submit"
            label="Home"
            onClick={function goBack() {
              roteamento.push("/");
            }}
          />
        </div>
      </Box>
    </>
  );
}
