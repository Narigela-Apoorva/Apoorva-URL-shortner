// import { ShortURL } from "../models/ShortURL.model";

import { ShortURL } from "../models/shorturl.model.js";
import { nanoid } from "nanoid";

export const createShortURL = async (req, res) => {
    try {
        const { originalUrl , expiresAt , customUrl, title} = req.body;
        const userid = req.user?.id; // Get userId from the authenticated request
        if(!originalUrl) {
            console.log("Original URL not found in request body. Sending bad request");
            return res.status(400).json({ status: "BAD_REQUEST", message: "Original URL is required"});
        }
        let shortCode; // Implement this function to generate a unique short code
        if(customUrl) {
            shortCode = customUrl;
            const exist= await ShortURL.findOne({shortCode});
            if(exist){
                console.error("Custom URL already exists. Please choose a different one.");
                return res.status(400).json({ status: "BAD_REQUEST", message: "Custom URL already exists. Please choose a different one."});
            }
        }
        else{
            shortCode = await nanoid(7);
            let exist=await ShortURL.findOne({shortCode}); 
            while(exist){
                shortCode = nanoid(7);
                exist=await ShortURL.findOne({shortCode});
            }
        }      
        // if(expiresAt){
        //     newUrl.expiresAt=expiresAt;
        // }
        // else{
        //     const date = new Date();
        //     date.setDate(date.getDate() + 30);          
        //     newUrl.expiresAt=date;
        // }
        // if(title){
        //     newUrl.title=title;
        // }   
        // else{
        //     newUrl.title=""; // You can implement metadata fetching later
        // }
        const newUrl = new ShortURL({
            originalUrl,
            shortCode
        });  
        await newUrl.save();
        return res.status(201).send(newUrl);
        
    }catch (error) {
        console.error("Error in creating short url", error.message);
        return res.status(500).json({ status: "INTERNAL_SERVER_ERROR", message: "Error in creating short url"});                    
    }
}

export const getLongUrl = async (req, res) => {
    try {
        const shortCode = req.params.shortCode;    
        const exist = await ShortURL.findOne({ shortCode : shortCode });
        if(!exist) {
            console.error("Short URL not found in database.");
            return res.status(404).json({ status: "NOT_FOUND", message: "Short URL not found"});
        }
        return res.redirect(exist.originalUrl);   
    }catch (error) {
        console.error("Error in fetching long url", error.message);
        return res.status(500).json({ status: "INTERNAL_SERVER_ERROR", message: "Error in fetching long url"});
    }
}