import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req) => {
    try {
        await connectToDB()

        const allPost = await Prompt.find({}).populate("creator")

        return new Response(JSON.stringify(allPost), { status: 200 })
    } catch (error) {
        return new Response("failed to Fetch All Post", { status: 500 })
    }
}