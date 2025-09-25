import { Text } from "@mantine/core";
import { TextInput } from "@mantine/core";
import Service from "../utils/http";
const obj = new Service();
import { QRCodeSVG } from "qrcode.react";
import { IconCopy } from "@tabler/icons-react";
import { useClipboard } from "@mantine/hooks";
import { Button } from "@mantine/core";
export default function UrlResponse(props) {
  const clipboard = useClipboard({ timeout: 500 });
  const surl = obj.getBaseURL() + "/api/s/" + props?.response?.shortCode;
  return (
    <div>
      Shorter Url:
      <TextInput
        disabled
        value={surl}
        my={"lg"}
        rightSection={
          <IconCopy
            onClick={() => {
              console.log("clicked");
              clipboard.copy(surl);
            }}
          />
        }
      />
      <QRCodeSVG
        imageSettings={{
          excavate: true,
          src: "/HomeBackground.png",
          height: 80,
          width: 80,
        }}
        value={surl}
        size={250}
        my={"lg"}
      >
        <Image src={"/HomeBackground.png"} />
      </QRCodeSVG>
      <br />
      <br />
      <Button
        mx={"lg"}
        my={"lg"}
        onClick={() => {
          props.setResponse(null);
        }}
      >
        {" "}
        Reset{" "}
      </Button>
    </div>
  );
}