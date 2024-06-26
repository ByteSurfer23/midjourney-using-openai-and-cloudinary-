import express from 'express';
import * as dotenv from 'dotenv';
import OpenAIApi from 'openai';
import Configuration from 'openai';
dotenv.config();
const router = express.Router();// importing for backend routes

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});// setting up a new config for the openai api
const openai = new OpenAIApi(configuration);// creating a new class of openai api and passing config
router.route('/').get((req, res) => {
    res.status(200).json({ message: 'Hello from DALL-E!' });
});

router.route('/').post(async (req, res) => {
    try {
        // here we get the req from the frontend 
        const prompt = req.body;
        console.log(prompt);
        // we pass the prompt in the request from frontend to the openai api
        // openai.images.generate takes in a parameters, propmt , size , response format and n is no of imgs 
        const aiResponse = await openai.images.generate({
            prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json',
        });

        const image = aiResponse.data.data[0].b64_json;
        res.status(200).json({ photo: image });
        res.header('Access-Control-Allow-Origin', '*');// this helps to allow the response froma any origin 
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

export default router;