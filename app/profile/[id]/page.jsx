"use client"

import { useEffect, useState } from 'react'

import Profile from '@components/Profile'

const OtherProfile = ({ params }) => {

    const [profileData, setProfileData] = useState([])

    const fetchData = async () => {
        const res = await fetch(`/api/profile/${params.id}`)
        const data = await res.json()
        setProfileData(data)
    }

    useEffect(() => {
        fetchData()
    }, [])
    return (
        <section>
            <Profile
                name={profileData[0]?.creator?.username}
                desc={""}
                data={profileData}
            />
        </section>
    )
}

export default OtherProfile