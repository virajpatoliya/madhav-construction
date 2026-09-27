import React from "react";
import { MoonLoader } from 'react-spinners'
const Loader: React.FC = () => {
    return (
        <div className="flex justify-center items-center h-52 w-full p-3">
            <MoonLoader
                color="#7c662f"
                size={50}
                speedMultiplier={2}
            />
        </div>
    );
};

export default Loader;

