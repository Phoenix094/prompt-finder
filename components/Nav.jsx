"use client"

import Link from "next/link"
import Image from "next/image"
import { useSession, signIn, signOut, getProviders } from "next-auth/react"
import { useState, useEffect } from "react"


const Nav = () => {
    const isUserLoggedIn = true

    const [providers, setProviders] = useState(null)
    const [toggleDropdown, setToggleDropdown] = useState(false)

    useEffect(() => {
        const setUpProviders = async () => {
            const response = await getProviders();

            setProviders(response)
        }

        setUpProviders()
    }, [])
    return (
        <nav className="flex-between w-full mb-16 pt-3">
            <Link href={"/"} className="flex flex-center gap-2">
                <Image
                    src="/assets/images/logo.svg"
                    alt="logo"
                    width={30}
                    height={30}
                />
                <p className="logo_text">
                    Prompt Finder
                </p>
            </Link>

            {/* Desktop Navigation */}
            <div className="sm:flex hidden">
                {
                    isUserLoggedIn ? (
                        <div className="flex gap-3 md:gap-5">
                            <Link href={"/create-prompt"} className="black_btn">
                                Create Prompt
                            </Link>
                            <button
                                type="button"
                                className=" outline_btn"
                                onClick={signOut}
                            >
                                Sign Out
                            </button>

                            <Link href={"/profile"}>
                                <Image
                                    src={"/assets/images/logo.svg"}
                                    width={37}
                                    height={37}
                                    className="rounded-full"
                                    alt="profile"
                                />
                            </Link>

                        </div>
                    ) : (
                        <>
                            {
                                providers && Object.values(providers).map((provider) => (
                                    <button
                                        key={provider.name}
                                        type="button"
                                        onClick={() => signIn(provider.id)}
                                        className="black_btn"
                                    >
                                        Sign In
                                    </button>
                                ))
                            }
                        </>
                    )
                }
            </div>

            {/* Mobile Navigation */}
            <div className="sm:hidden flex">

                {
                    isUserLoggedIn ? (
                        <div className="flex">
                            <Image
                                src={"/assets/images/logo.svg"}
                                width={37}
                                height={37}
                                className="rounded-full"
                                alt="profile"
                                onClick={() => setToggleDropdown((prev) => !prev)}
                            />
                            {
                                toggleDropdown && (
                                    <div className="dropdown !top-[10%]">
                                        <Link
                                            href={"/profile"}
                                            className="dropdown_link"
                                            onClick={() => setToggleDropdown(false)}
                                        >
                                            My Profile
                                        </Link>
                                        <Link
                                            href={"/create-prompt"}
                                            className="dropdown_link"
                                            onClick={() => setToggleDropdown(false)}
                                        >
                                            Create Prompt
                                        </Link>
                                        <button
                                            type="button"
                                            className="mt-5 w-full black_btn"
                                            onClick={() => {
                                                setToggleDropdown(false)
                                                signOut()
                                            }}
                                        >
                                            Sign Out
                                        </button>
                                    </div>
                                )
                            }
                        </div>
                    ) : (
                        <>
                            {
                                providers && Object.values(providers).map((provider) => (
                                    <button
                                        key={provider.name}
                                        type="button"
                                        onClick={() => signIn(provider.id)}
                                        className="black_btn"
                                    >
                                        Sign In
                                    </button>
                                ))
                            }
                        </>
                    )
                }
            </div>

        </nav >
    )
}

export default Nav