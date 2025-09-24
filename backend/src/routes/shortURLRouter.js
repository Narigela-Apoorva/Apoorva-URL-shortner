import { Router } from "express";
// import { createShortURL, createShortUrl, getLongUrl } from "../controllers/shortUrlController.js";
import { isLoggedIn } from "../middlewares/authMiddleware.js";
import { createShortURL, getLongUrl } from "../controllers/shortUrlController.js";


const shortURLRouter = Router();


shortURLRouter.post("/", isLoggedIn, createShortURL)


// redirect router "/api/s/shortCode"
shortURLRouter.get("/:shortcode", getLongUrl)




export default shortURLRouter;
