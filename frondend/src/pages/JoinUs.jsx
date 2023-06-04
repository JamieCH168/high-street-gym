import React from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

export default function JoinUs() {
    return (
        <div className='flex flex-col min-h-screen bg-blue-200 '>

            <Nav></Nav>

            <h1 className='text-center text-6xl my-10'> Join Us</h1>

            <div className="grow flex text-4xl gap-4 justify-around flex-wrap m-10" >

                <ul className='flex flex-col justify-around gap-5  p-10 m-10 border-solid border-4 border-indigo-400 rounded-3xl shadow-offset-x-20 shadow-offset-y-20 shadow-color-red shadow-offset-x-5 shadow-offset-y-5 shadow-color-black shadow-2xl' style={{ backgroundColor: '#8a46a3' }} >
                    <li>3 Month Contract</li>
                    <li>$129</li>
                    <li>Unlimited 24/7 Access</li>
                    <li>Includes all classes</li>
                    <li>Free joining fee</li>
                    <li className="text-violet-500 text-center text-5xl " >Get Offer</li>
                </ul>
                <ul className='flex flex-col justify-around gap-5  p-10 m-10 border-solid border-4 border-indigo-400 rounded-3xl shadow-2xl' style={{ backgroundColor: '#8a46a3' }}>
                    <li>6 Month Contract</li>
                    <li>$200</li>
                    <li>Unlimited 24/7 Access</li>
                    <li>Includes all classes</li>
                    <li>Free joining fee</li>
                    <li className="text-violet-500 text-center text-5xl ">Get Offer</li>
                </ul>
                <ul className='flex flex-col justify-around gap-5  p-10 m-10 border-solid border-4 border-indigo-400 rounded-3xl shadow-2xl' style={{ backgroundColor: '#8a46a3' }}>
                    <li>12 Month Contract</li>
                    <li>$300</li>
                    <li>Unlimited 24/7 Access</li>
                    <li>Includes all classes</li>
                    <li>Free joining fee</li>
                    <li className="text-violet-500 text-center text-5xl ">Get Offer</li>
                </ul>
            </div>

            <Footer></Footer>


        </div>
    )
}
