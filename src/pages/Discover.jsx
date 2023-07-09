/* eslint-disable no-console */
/* eslint-disable react/jsx-indent */
import { Error, Loader, SongCard } from '../components'; // div components
import { genres } from '../assets/constants'; // array with objects, each object having key-value pairs

const Discover = () => {
    console.log(genres);
    return (
    <div className="flex flex-col">
        <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
            <h2 className="font-bold-3xl text-white text-left">Discover</h2>
            <select name="" id=""></select>
        </div>
    </div>
        );
    };
export default Discover;
