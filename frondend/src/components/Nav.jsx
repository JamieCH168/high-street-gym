import React, { useRef } from 'react'
import { NavLink, useLinkClickHandler, useNavigate } from 'react-router-dom'
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
            <div className={`navbar  bg-blue-100   justify-between flex-wrap`} style={{ backgroundColor: '#8a46a3' }}>

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
                    <NavLink className="btn btn-ghost btn-outline border-0 normal-case text-base md:text-xl text-zinc-50" to="/" >Home</NavLink>

                    <NavLink activeClassName="active-link" className="btn btn-ghost btn-outline border-0 normal-case text-base md:text-xl text-zinc-50" to="/facility" >Facility</NavLink>

                    <NavLink className="btn btn-ghost btn-outline border-0 normal-case text-lg md:text-xl text-zinc-50" to="/class_booking">Class</NavLink>

                    {
                        user && <NavLink className="btn btn-ghost btn-outline border-0 normal-case text-base  md:text-xl text-zinc-50" to="/user_booking">Booking</NavLink>
                    }

                    <NavLink className="btn btn-ghost btn-outline border-0 normal-case text-base  md:text-xl text-zinc-50" to="/blog_post_page">Blog Post</NavLink>

                    {/* {
                        user && (user.staff_access_role === "admin" || user.staff_access_role === "trainer") &&
                        <NavLink className="btn btn-ghost btn-outline border-0 normal-case text-base  md:text-xl" to="/class_crud">Class CRUD </NavLink>
                    } */}

                    {user && (user.staff_access_role === "admin" || user.staff_access_role === "trainer") &&
                        <div className="dropdown dropdown-hover">
                            <label tabIndex={0} className="btn btn-ghost btn-outline border-0 normal-case text-base  md:text-xl text-zinc-50">Class CRUD</label>
                            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 ">
                                <li>
                                    <NavLink className="btn btn-ghost btn-outline border-0 normal-case text-base md:text-xl  justify-start "
                                        to="/booking">Booking</NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        className="btn btn-ghost btn-outline border-0 normal-case text-base md:text-xl  justify-start"
                                        to="/class">Class</NavLink>
                                </li>
                                <li>
                                    <NavLink className="btn btn-ghost btn-outline border-0 normal-case text-base md:text-xl  justify-start"
                                        to="/activity">Activity</NavLink>
                                </li>
                                <li>
                                    <NavLink className="btn btn-ghost btn-outline border-0 normal-case text-base md:text-xl  justify-start"
                                        to="/room">Room</NavLink>
                                </li>
                                <li>
                                    <NavLink className="btn btn-ghost btn-outline border-0 normal-case text-base md:text-xl  justify-start"
                                        to="/blog_post">Post</NavLink>
                                </li>
                            </ul>
                        </div>
                    }


                    {
                        user && user.staff_access_role === "admin" &&
                        <NavLink className="btn btn-ghost btn-outline border-0 normal-case text-base  md:text-xl text-zinc-50" to="/staff">Admin</NavLink>
                    }
                    <NavLink className="btn btn-ghost btn-outline border-0 normal-case text-base md:text-xl text-zinc-50 " to="/join">Join US</NavLink>
                    <NavLink className="btn btn-ghost btn-outline border-0 normal-case text-base  md:text-xl text-zinc-50" to="/contact">Contact US</NavLink>
                    {
                        user
                            ? <a className="btn btn-ghost btn-outline border-0 normal-case text-base  md:text-xl text-zinc-50" onClick={onLogoutClick} >Logout</a>
                            : (
                                <div>
                                    <NavLink className="btn btn-ghost btn-outline border-0 normal-case text-base  md:text-xl text-zinc-50" to="/login">Sign in</NavLink>
                                    {/* <NavLink className="btn btn-ghost btn-outline border-0 normal-case text-base  md:text-xl 0" to="/register">Sign up</NavLink> */}
                                </div>
                            )
                    }
                </div>

            </div>
        </div>
    )
}
