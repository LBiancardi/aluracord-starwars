import { Box, Button, Text, TextField, Image } from "@skynexui/components";
import { useRouter } from "next/router";

export default function PaginaDoChat() {
  const roteamento = useRouter();

  return (
    <div>
      <p>Chat Page under construction...</p>
      <Button
        type="submit"
        label="Home"
        onClick={function goBack() {
          roteamento.push("/");
        }}
      />
    </div>
  );
}
