// components/PrivateRoute.tsx
import { checkSession } from '@/service/auth';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

    useEffect(() => {
        const verifySession = async () => {
            const isActive = await checkSession();
            setIsLoggedIn(isActive);
        };
        verifySession();
    }, []);

    if (isLoggedIn === null)
        return (
            <div className='h-full w-full bg-white mt-8 md:mt-28 flex flex-col'>
                <div className=" bg-blue-950 w-full flex flex-row text-white items-center p-2.5 text-md font-medium px-5 md:px-20">
                    <div className='flex flex-row animate-pulse-fast rounded-lg w-5 bg-gray-300 p-3'></div>
                    <div className='flex flex-row animate-pulse-fast rounded-lg w-32 bg-gray-300 p-3 ml-2'></div>
                </div>

                <div className='flex flex-col p-4 gap-4'>
                    <div className='flex animate-pulse-fast rounded-3xl bg-gray-200 w-32 p-3'></div>
                    <div className='flex flex-col items-center  no-scrollbar overflow-x-auto'>
                        <div className='w-full flex gap-4 flex-row' >
                            {Array(5).fill(0).map((_, idx) => (
                                <div key={idx}>
                                    <div className='flex  animate-pulse-fast rounded-2xl bg-gray-200 w-16 h-16 md:w-20 p-3 md:h-20'></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='flex animate-pulse-fast rounded-3xl bg-gray-200 w-32 p-3'></div>

                    <div className='flex flex-col items-center  no-scrollbar overflow-x-auto'>
                        <div className='w-full flex gap-4 flex-row' >
                            {Array(5).fill(0).map((_, idx) => (
                                <div key={idx}>
                                    <div className='flex  animate-pulse-fast rounded-2xl bg-gray-200 w-52 h-32 md:w-64 p-3 md:h-40'></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='flex animate-pulse-fast rounded-3xl bg-gray-200 w-32 p-3'></div>

                    <div className='flex  items-center '>
                        <div className='w-full flex gap-6 flex-col md:flex-row' >
                            {Array(2).fill(0).map((_, idx) => (
                                <div key={idx} className='flex  animate-pulse-fast rounded-xl bg-gray-200 w-full p-3 h-40 md:h-96'></div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>)




    if (!isLoggedIn) return <Navigate to="/login" />;
    return children;
};

export default PrivateRoute;
