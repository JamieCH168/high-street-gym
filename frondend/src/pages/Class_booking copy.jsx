import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from "react-router-dom";
import { getAllClasses, getClassByActivityID } from "../api/classes";
import { getAllActivities, } from "../api/activities";
import Nav from "../components/Nav";
import Footer from '../components/Footer.jsx';
import Filter from '../components/Filter'
import ToolBar from '../components/ToolBar'

export default function User_Booking() {
    const navigate = useNavigate()
    const [activity, setActivity] = useState([]);
    const [activityName, setActivityName] = useState("");
    useEffect(() => {
        getAllActivities().then(async activities => {
            const activitiesWithClassData = await Promise.all(activities.map(async activity => {
                const classData = await getClassByActivityID(activity.activity_id)
                return Promise.resolve({ ...activity, ...classData })
            }
            )
            )
            setActivity(activitiesWithClassData)
        }
        );
    }, [activityName]);
    // const [classData, setClassData] = useState([]);
    //  console.log(classData)
    // useEffect(() => {
    //     getClassByActivityID().then((data) =>
    //         // console.log(class),
    //         setClassData(data));
    // }, [activity]);
    const changeActivityNameHandler = (activityName) => {
        setActivityName(activityName)
    };
    const cancelActivityNameHandler = (activityName) => {
        getAllActivities().then((data) => {
            setActivity(data)
            // console.log("After", activity, activityName)
            setActivityName(activityName)
            // console.log(data)
        });
    };
    // console.log(activity)

    let filterData = activity
    activityName !== "" ?
        (filterData = activity.filter(item => item.activity_name === activityName)) : <> </>

    // filterData.sort((a, b) => {
    //     // Sort by class_date (descending)
    //     const dateA = new Date(a.class_date);
    //     const dateB = new Date(b.class_date);
    //     if (dateA > dateB) {
    //         return 1;
    //     } else if (dateA < dateB) {
    //         return -1;
    //     } else {
    //         // Sort by class_time (ascending)
    //         const timeA = new Date(`1970-01-01T${a.class_time}`);
    //         const timeB = new Date(`1970-01-01T${b.class_time}`);
    //         return timeA - timeB;
    //     }
    // });

    filterData.sort((a, b) => {
        // Sort by activity_name (descending)
        if (a.activity_name < b.activity_name) {
            return 1;
        } else if (a.activity_name > b.activity_name) {
            return -1;
        } else {
            // Sort by class_date (descending)
            const dateA = new Date(a.class_date);
            const dateB = new Date(b.class_date);
            if (dateA > dateB) {
                return 1;
            } else if (dateA < dateB) {
                return -1;
            } else {
                // Sort by class_time (ascending)
                const timeA = new Date(`1970-01-01T${a.class_time}`);
                const timeB = new Date(`1970-01-01T${b.class_time}`);
                return timeA - timeB;
            }
        }
    });

    return (
        <div className="flex flex-col min-h-screen bg-blue-200" style={{
            backgroundImage: `url('/Blog_1.jpg')`,
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center'
        }}>
            <Nav></Nav>
            <ToolBar></ToolBar>
            <Filter
                activityName={activityName}
                onActivityChange={changeActivityNameHandler}
                onCancelActivity={cancelActivityNameHandler}
            ></Filter>
            <div className="grow grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 y-10  gap-10 m-10 mb-4 w-8/12 mx-auto" >
                {filterData.map((data) => (
                    <div className="card bg-blue-300 w-full h-full shadow-xl">
                        <figure className='relative group h-64'>
                            <img
                                src={
                                    '/' + data.activity_name.toLowerCase().replace(" ", "%20") + '.jpg' || 'stop.jpg'
                                }
                                alt={data.activity_name}
                                onError={(e) => { e.target.onerror = null; e.target.src = "/zumba.jpg" }}
                                className='group-hover:scale-[1.7] group-hover:rotate-[20deg]   group-hover:duration-500 group-hover:ease-linear  group-hover:opacity-50'
                            />
                            <span className='absolute inset-0 text-center h-64 leading-[16rem] text-[0px] hover:text-[40px] text-cyan-500
                        hover:duration-500 hover:ease-linear'
                            >{data.activity_name}</span>
                            <div className="card-body">
                                <h2 className="card-title text-center text-4xl">{data.activity_name}</h2>
                                <p className='pt-6'>
                                    <p className='italic font-bold'>{new Date(data.class_date).toLocaleDateString('en-AU', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                                    <div >{data.class_time &&
                                        <p>
                                            {data.class_time.includes("AM")
                                                ? data.class_time
                                                : new Date("1970-01-01T" + data.class_time).toLocaleTimeString('en-AU', { hour: 'numeric', minute: 'numeric' })
                                            }
                                        </p>
                                    }</div>
                                </p>
                                <p>{data.activity_description}</p>
                                <div className="card-actions justify-end">
                                    <button onClick={() => navigate("/booking/" + data.activity_id)}
                                        className="btn bg-transparent     hover:shadow-blue hover:btn-primary" style={{ color: 'rgba(80, 8, 196, 1)' }}>Detail</button>
                                </div>
                            </div>
                        </figure>


                    </div>
                ))}
            </div>
            <Footer></Footer>
        </div>
    )
}
