import { NextFunction, Request, Response } from "express";
import User from "../models/User";
// import { configureOpenAI } from "../config/openai.config";
import  OpenAI  from "openai";

type ChatCompletionUserMessageParam = {
  role: "user" | "assistant" | "system";
  content: string;
};

export const generateChat = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
      const { message } = req.body;
      try {

        const user = await User.findById(res.locals.jwtData.id)
        if(!user) {
          return res.status(401).json({message: "Unauthorized request"})
        }
        const chats = user.chats.map(({role, content}) => ({
          role,
          content
        }))  as ChatCompletionUserMessageParam[] ;

        chats.push({ content: message, role: "user" });
        user.chats.push({ content: message, role: "user" });


        //configure ai
        // const config = configureOpenAI();
        const apiKey = process.env.OPEN_AI_SECRET;
        const organizationId = process.env.OPENAI_ORGANIZATION_ID
        if (!apiKey) {
            throw new Error("Missing OpenAI API key.");
        }
        if (!organizationId) {
            throw new Error("Missing OpenAI organization ID.");
        }
      const openai = new OpenAI({
        organization: organizationId,
        apiKey: apiKey,
      });

        //send chats to ai
        const chatResponse = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: chats,
          stream: true, // For streaming responses
          max_tokens: 1000, // Set appropriate token limit
          temperature: 0.7, 
        })

        //get response from ai
        let assistantMessage = ""; 
        for await (const chunk of chatResponse) {
          const delta = chunk.choices[0]?.delta?.content;
          if (delta) {
            assistantMessage += delta; 
          }
        }
        
        // Push the complete response to user.chats
        if (assistantMessage) {
          user.chats.push({
            role: "assistant",
            content: assistantMessage,
          });
        }
        
        await user.save()
        return res.status(200).json({ chats: user.chats });
      } catch (error) {
        console.error(error instanceof Error ? error.message : error);
        return res.status(500).json({ meesage: "AI Error, Internal server error" })
      }
}