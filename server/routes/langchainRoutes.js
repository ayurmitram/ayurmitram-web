const express = require('express');
const { ConversationChain } = require('langchain/chains');
const { ChatOpenAI } = require('langchain/chat_models/openai');
const { ChatPromptTemplate } = require("langchain/prompts");
const { HumanMessage } = require("langchain/schema");



const openai_key = process.env.OPEN_API_KEY;

const router = express.Router();

const chat = new ChatOpenAI({
    openAIApiKey: openai_key
});

router.get('/llm', async (req, res) => {
    try {

        const response = await chat.call([
            new HumanMessage(
                "What is a good name for a company that makes colorful socks?"
            ),
        ]);
        console.log(response)
        
        res.json({response});
        
    } catch (err) {
        console.log(err);
    }
})

module.exports = router;