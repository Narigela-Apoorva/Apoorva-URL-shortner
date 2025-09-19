import { Button, Container, Text } from "@mantine/core";
import Service from "../utils/http";
import { QRCodeSVG } from "qrcode.react";
import { TextInput } from "@mantine/core";
import { ActionIcon, CopyButton, Tooltip } from '@mantine/core';
import { IconCopy, IconCheck } from '@tabler/icons-react';
import { useClipboard } from '@mantine/hooks';

const obj = new Service();

export default function UrlResponse(props) {
  const surl = obj.getBaseURL() + "/api/s/" + props?.response?.shortCode;
  const clipboard = useClipboard({ timeout: 500 });
  return (
    <div>
      <Container style={{ marginTop: "20%" }}>
        <TextInput mb='10%'
          leftSectionPointerEvents="none"
          label="Shorter URL"
          //placeholder="Enter short URL"
          value={surl}
          onChange={(e) => setSurl(e.target.value)}
          rightSection={<IconCopy
           onClick={()=>{
               console.log("clicked");
               clipboard.copy(surl)
           }}
           />}
        />

        {/* <Text color="blue"> {surl} </Text> */}
        <QRCodeSVG
          imageSettings={{
            excavate: true,
            src: "/HomeBackground.png",
            height: 100,
            width: 100,
          }}
          value={surl}
          size={400}
        >
          <Image src={"/HomeBackground.png"} />
        </QRCodeSVG>
      <Button  mx='40%' my='10%'onClick={()=>{
               props.setResponse(null)
            }}> Reset </Button>
      </Container>

    </div>
  );
}
