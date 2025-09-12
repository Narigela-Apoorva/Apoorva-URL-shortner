import React, { use, useEffect, useState } from "react";
import { Avatar } from "@mantine/core";

import Service from "../../utils/http";
import { Center, Text } from "@mantine/core";
const obj = new Service();

export default function profile() {
  const [user, setUser] = useState({});

  const getProfileData = async () => {
    try {
      let data = await obj.get("user/me");
      setUser(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProfileData();
  }, []);

  return (
    <div style={{ marginTop: "180px", borderBlockColor: "black" }}>
      <Center>
        <Avatar src={user?.avatar} size={250} radius="50%" />
      </Center>
      <Center mt="sm" style={{ flexDirection: "column" }}>
        <Text color="black" size="lg" style={{ padding: "10px" }}>
          Name: {user?.name}
        </Text>
        <Text color="black" size="lg" style={{ padding: "10px" }}>
          Email: {user?.email}
        </Text>
        <Text color="black" size="lg" style={{ padding: "10px" }}>
          CreatedAt: {user?.createdAt}
        </Text>
        <Text color="black" size="lg" style={{ padding: "10px" }}>
          Role: {user?.role}
        </Text>
      </Center>
    </div>
  );
}
