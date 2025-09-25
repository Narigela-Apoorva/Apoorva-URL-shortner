import { Text, Tooltip, Container, Group, ActionIcon, Button } from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import { IconCheck, IconCopy } from '@tabler/icons-react';
import { QRCodeSVG } from "qrcode.react";
import Service from '../utils/http';
import { TextInput } from '@mantine/core';

const obj = new Service;

export default function UrlResponse(props) {
  const clipboard = useClipboard({ timeout: 2000 });
  const surl = obj.getBaseURL() + '/api/s/' + props?.response?.shortCode;

  return (
    <Container>
      {/* URL + Copy icon side by side */}
      <Group gap="xs">
        <TextInput color="blue" fw={500} size="lg">
          {surl}
        </TextInput>
        <Tooltip
          label="Link copied!"
          offset={5}
          position="bottom"
          radius="xl"
          transitionProps={{ duration: 100, transition: 'slide-down' }}
          opened={clipboard.copied}
        >
          <ActionIcon
            variant="subtle"
            color={clipboard.copied ? "teal" : "gray"}
            onClick={() => clipboard.copy(surl)}
          >
            {clipboard.copied ? (
              <IconCheck size={20} stroke={1.5} />
            ) : (
              <IconCopy size={20} stroke={1.5} />
            )}
          </ActionIcon>
        </Tooltip>
      </Group>

      {/* QR code below */}
      <QRCodeSVG
        value={surl}
        size={400}
      />
      <Button style={{mx:"40%"}} onClick={()=>{
               props.setResponse(null)
            }}> Reset </Button>
    </Container>
  );
}