import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

//to get the editing prompt
export const GET = async (req, { params }) => {
    try {
        await connectToDB()

        const prompt = await Prompt.findById(params.id).populate("creator")

        if (!prompt) return new Response("No such prompt found", { status: 404 })

        return new Response(JSON.stringify(prompt), { status: 200 })

    } catch (error) {
        return new Response("failed to fetch the Post", { status: 500 })
    }
}

// to edit the prompt
export const PATCH = async (req, { params }) => {
    const { prompt, tag } = await req.json()
    try {
        await connectToDB()

        const existingPrompt = await Prompt.findById(params.id).populate("creator")

        if (!existingPrompt) return new Response("No such prompt found", { status: 404 })

        existingPrompt.prompt = prompt
        existingPrompt.tag = tag

        await existingPrompt.save()

        return new Response(JSON.stringify(existingPrompt), { status: 201 })

    } catch (error) {
        return new Response("failed to Edit the Post", { status: 500 })
    }
}

//to delete the post

export const DELETE = async (req, { params }) => {
    try {
        await connectToDB()

        await Prompt.findByIdAndDelete(params.id)

        return new Response("Post deleted successfully", { status: 201 })

    } catch (error) {
        return new Response("failed to delete the Post", { status: 500 })
    }
}