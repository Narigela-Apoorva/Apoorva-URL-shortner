import { Container, TextInput } from "@mantine/core";
import UrlForm from "../Components/UrlForm";
import UrlResponse from "../Components/UrlResponse";
import { useState } from "react";

export default function UrlShortner() {
  const [response, setResponse] = useState(null);

  return (
    <Container size={"xs"}>
           {response?<UrlResponse setResponse={setResponse} response = {response}/>:<UrlForm setResponse={setResponse}/>}
       </Container>
  );
}
