import React from 'react'
import { Button, TextInput } from '@mantine/core';
import { Container } from '@mantine/core';

import Service from '../utils/http'
import { useState } from 'react';
const obj = new Service();


export default function UrlForm() {
    const generateShortUrl = async(data) => {
       try {
           let response = await obj.post("s", data);
           console.log(response);
           props.setResponse(response);
       }catch (error) {
           console.log(error);
       }
   }


   const [data, setData] = useState({
       "originalUrl": "",
       "expiresAt": "",
       "title": "",
       "customUrl": ""
   })



  return (
    <div>
         <Container my='md'>
           <TextInput size='lg'
           my='lg'
           withAsterisk
           radius='xs'
         label="Original URL"
         placeholder="Original URL"
         onChange={(e)=>{
                         setData({...data, originalUrl : e.target.value})
                 }}

       />
       <TextInput size='lg'
           my='lg'
           radius='xs'
         label="Custom URL"
         placeholder="Custom URL"
         onChange={(e)=>{
                         setData({...data, customUrl : e.target.value})
                 }}

       />
       <TextInput size='lg'
           my='lg'
           radius='xs'
         label="Title"
         placeholder="Title"
         onChange={(e)=>{
                         setData({...data, title : e.target.value})
                 }}

       />
       <TextInput size='lg'
       type='date'
           my='lg'
           radius='xs'
         label="Date-of-Expiry"
         placeholder="Date-of-Expiry"
         onChange={(e)=>{
                         setData({...data, expiresAt : e.target.value})
                 }}

       />
       <Button
             onClick={()=>{
               generateShortUrl(data);
             }}
             disabled = {data?.originalUrl?.length>10?false:true}
             my="md" color={"red"}> Generate Short Url </Button>

         </Container>
       </div>
  )
}
