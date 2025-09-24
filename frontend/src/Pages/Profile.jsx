import React, { use, useEffect, useState } from 'react'
import { Avatar } from '@mantine/core';

import Service from '../utils/http'
import { Center, Text } from '@mantine/core';
const obj = new Service();


export default function profile() {


   const [user, setUser] = useState({})


   const getProfileData = async () => {
       try {
           let data = await obj.get("user/me")
           setUser(data)
           console.log(data);
       } catch (error) {
           console.log(error);
       }
   }
   useEffect(() => {


       getProfileData();
   }, [])


    return (
    <div>
      <Center>
        <Avatar src={user?.avatar} size={225}  radius="xl" style={{ marginTop: "25px" }}/>
      </Center>
      <Center mt="sm">
        <Text color="blue" size="lg" style={{fontWeight: "bold" }}>
          NAME : {user?.name}
        </Text>
      </Center>
      <Center mt="sm">
        <Text color="blue" size="lg">
          EMAIL : {user?.email}
        </Text>
      </Center>
      <Center mt="sm"> 
        <Text color="blue" size="lg">
           USER ID : {user?._id}
        </Text>
      </Center>
    <Center mt="sm">
        <Text color="blue" size="lg">
          CREATED AT : {user?.createdAt}
        </Text>
      </Center>
    </div>
  );
}