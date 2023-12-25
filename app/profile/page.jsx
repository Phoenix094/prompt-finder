"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

import Profile from "@components/Profile"

const MyProfile = () => {
    const { data: session } = useSession()
    const router = useRouter()

    const [post, setPost] = useState([])

    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`)

    }

    const handleDelete = async (posts) => {
        const hasConfirmed = confirm('Are you sure you want to delete')

        if (hasConfirmed) {
            try {
                await fetch(`/api/prompt/${posts._id.toString()}`, {
                    method: 'DELETE',
                })

                const filteredPost = post.filter((ele) => ele._id !== post._id)

                setPost(filteredPost)
            } catch (error) {
                console.log(error)
            }
        }

    }

    const fetchAllPost = async () => {
        const res = await fetch(`/api/users/${session?.user.id}/posts`)
        const data = await res.json()
        console.log(data)
        setPost(data)
    }

    useEffect(() => {
        if (session?.user.id) fetchAllPost()
    }, [])
    return (
        <Profile
            name="My"
            desc="Welcome to Your Personalized Profile"
            data={post}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default MyProfile