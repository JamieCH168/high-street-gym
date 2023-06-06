import React, { useRef } from 'react'
import { Link, useLinkClickHandler, useNavigate } from 'react-router-dom'
import { useAuthentication } from "../hooks/authentication"

export default function Nav() {

    const removeOrAddDivClassRef = useRef(null);
    const [user, login, logout] = useAuthentication()
    const navigate = useNavigate()
    function onLogoutClick(e) {
        logout()
        navigate("/")

    }

    const clickAddClassHandler = () => {
        if (removeOrAddDivClassRef.current) {
            removeOrAddDivClassRef.current.classList.remove('max-[1135px]:hidden');
            removeOrAddDivClassRef.current.classList.add('max-[1135px]:flex', 'max-[1135px]:fixed', 'max-[1135px]:bg-[#686973]');
        }
    }

    const clickRemoveClassHandler = () => {
        if (removeOrAddDivClassRef.current) {
            removeOrAddDivClassRef.current.classList.remove('max-[1135px]:flex', 'max-[1135px]:fixed', 'max-[1135px]:bg-[#686973]');
            removeOrAddDivClassRef.current.classList.add('max-[1135px]:hidden');
        }
    }

    return (
        <div>
            <div className={`navbar  bg-base-200  justify-between flex-wrap`}>

            {/* <div className={`navbar  bg-base-200 ${user ? 'justify-between' : 'justify-around'} flex-wrap`}> */}

                {
                    user &&
                    <a className="btn btn-ghost btn-outline border-0 normal-case text-2xl  cursor-none transition-none italic hover:bg-transparent">
                        <span className='uppercase mr-2 text-lime-500 '>
                           {user.staff_access_role} 
                            </span>
                    </a>
                }
                {
                    !user &&
                    <a className="btn btn-ghost btn-outline border-0 normal-case text-2xl  cursor-none transition-none italic hover:bg-transparent">
                        <span className='uppercase mr-2 text-lime-500 '>
                           guest
                            </span>
                    </a>
                }

                <div
                    onClick={clickAddClassHandler}
                    className='h-[50px] w-[50px] flex min-[1135px]:hidden flex-col justify-between cursor-pointer'
                >
                    <div className='h-[20%] w-[100%] bg-[#000]'></div>
                    <div className='h-[20%] w-[100%] bg-[#000]'></div>
                    <div className='h-[20%] w-[100%] bg-[#000]'></div>
                </div>

                <div
                    ref={removeOrAddDivClassRef}
                    className=' max-[1135px]:w-[100%]
                                max-[1135px]:hidden
                                max-[1135px]:flex-col
                                max-[1135px]:flex-wrap
                                max-[1135px]:justify-around
                                max-[1135px]:fixed
                                max-[1135px]:inset-0
                              max-[1135px]:bg-[#686973]
                                max-[1135px]:z-40 
                                '>
                    <a
                        className="btn btn-ghost btn-outline border-0 normal-case text-base md:text-xl  "
                        // onClick={clickRemoveClassHandler}
                    >
                        <Link to="/facility" >Facility</Link>
                    </a>

                    <a className="btn btn-ghost btn-outline border-0 normal-case text-lg md:text-xl 0"><Link to="/class_booking">Class</Link></a>

                    {
                        user && <a className="btn btn-ghost btn-outline border-0 normal-case text-base  md:text-xl 0"><Link to="/user_booking">Booking</Link></a>
                    }

                    <a className="btn btn-ghost btn-outline border-0 normal-case text-base  md:text-xl 0"><Link to="/blog_post_page">Blog_Post</Link></a>


                    {
                        user && (user.staff_access_role === "admin" || user.staff_access_role === "trainer") && <a className="btn btn-ghost btn-outline border-0 normal-case text-base  md:text-xl 0"><Link to="/class_crud">Class CRUD </Link></a>
                    }


                    {
                        user && user.staff_access_role === "admin" && <a className="btn btn-ghost btn-outline border-0 normal-case text-base  md:text-xl 0"><Link to="/staff">Admin</Link></a>
                    }

                    <a className="btn btn-ghost btn-outline border-0 normal-case text-base md:text-xl 0"><Link to="/join">Join US</Link></a>
                    <a className="btn btn-ghost btn-outline border-0 normal-case text-base  md:text-xl 0"><Link to="/contact">Contact US</Link></a>

                    {
                        user
                            ? <a className="btn btn-ghost btn-outline border-0 normal-case text-base  md:text-xl 0" onClick={onLogoutClick} >Logout</a>
                            : (
                                <div>
                                    <a className="btn btn-ghost btn-outline border-0 normal-case text-base  md:text-xl 0"><Link to="/login">Sign in</Link></a>
                                    <a className="btn btn-ghost btn-outline border-0 normal-case text-base  md:text-xl 0"><Link to="/register">Sign up</Link></a>

                                </div>
                            )

                    }

                </div>

            </div>
        </div>
    )
}
