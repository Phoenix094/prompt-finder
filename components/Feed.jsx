"use client"

import { useState, useEffect } from "react"

import PromptCard from "./PromptCard"


const PromptCardList = ({ data, handleTagClick }) => {
    return (
        <div className='mt-16 prompt_layout !items-stretch'>
            {data?.map((post) => (
                <PromptCard
                    key={post._id}
                    post={post}
                    handleTagClick={handleTagClick}
                />
            ))}
        </div>
    );
};

const Feed = () => {

    const [searchInput, setSearchInput] = useState("")
    const [allPost, setAllPost] = useState([])

    const handleSearch = (e) => {
        setSearchInput(e.target.value)
    }

    const handleTagClick = async () => {

    }

    const fetchAllPost = async () => {
        const data = await fetch("/api/prompt")
        const post = await data.json()
        setAllPost(post)
    }

    useEffect(() => {
        fetchAllPost()
    }, [])

    return (
        <section className="feed">
            {/* <form className="w-full max-w-[36rem] relative flex-center">
                <input
                    type="text"
                    value={searchInput}
                    onChange={handleSearch}
                    placeholder="search username or tag"
                    className="search_input peer"
                />

            </form> */}
            <PromptCardList
                data={allPost}
                handleTagClick={handleTagClick}
            />
        </section>
    )
}

export default Feed