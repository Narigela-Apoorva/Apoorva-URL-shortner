import { Button, Container, TextInput } from '@mantine/core'
import React, { useState } from 'react';
import Service from '../utils/http';
const obj = new Service();

export default function UrlForm(props) {
   
    const generateShortUrl = async(data) => {
        try {
            let res = await obj.post("s", data)
            console.log(res);
            props.setResponse(res);
        } catch (error) {
            console.log(error);
        }   
    }

    const[data, setData] = useState({
        "originalUrl": "",
        "expiresAt": "",
        "title": "",
        "customUrl": ""
    });

  return (
    <Container size={"xs"}>
        <TextInput 
            mt={"xl"}
            my='lg'
            withAsterisk
            size="lg" 
            radius="lg"
            label="Original Url"
            placeholder="Enter your Original url"
            onChange={(e) => {
                setData({...data, originalUrl: e.target.value})
            }}
        />
        <TextInput
            my='lg'
            size={"lg"}
            radius="lg"
            label="Custom Url (Optional)"
            placeholder="Enter your custom url"
            onChange={(e) => {
                setData({...data, customUrl: e.target.value})
            }}
        />
        <TextInput
            my='lg'
            size="lg"
            radius="lg"
            label="Title (Optional)"
            placeholder="Enter your Title"
            onChange={(e) => {
                setData({...data, title: e.target.value})
            }}    
        />
        <TextInput
            type='date'
            size="lg"
            radius="lg"
            label="Expiry(optional)"
            placeholder="Enter your Expiry date"
            onChange={(e) => {
                setData({...data, expiresAt: e.target.value})
            }}
        />

        <Button
             onClick={()=>{
               // console.log(data);
               generateShortUrl(data);
             }}
             disabled = {data?.originalUrl?.length>10?false:true}
             my="md" color={"red"}> Generate Short Url </Button>

    </Container>

  )
}