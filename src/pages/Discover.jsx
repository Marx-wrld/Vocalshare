/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/jsx-first-prop-new-line */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable comma-dangle */
/* eslint-disable function-paren-newline */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-console */
/* eslint-disable react/jsx-indent */
import { Error, Loader, SongCard } from '../components'; // div components
import { genres } from '../assets/constants'; // array with objects, each object having key-value pairs

const Discover = () => {
    const genreTitle = 'Pop';

    console.log(genres);
    return (
    <div className="flex flex-col">
        <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
            <h2 className="font-bold-3xl text-white text-left">Discover {genreTitle}</h2>
            <select 
                onChange={() => {}}
                value=""
                className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5">
                    {genres.map((genre) => <option key="genre.value" value={genre.value}>{genre.title}</option>)}
            </select>
        </div>
        <div className="flex-wrap sm:justify-start justify-center gap-8"> {/* wrapper for our songs */}
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((song, i) =>  
                (
                <SongCard 
                    key={song.key} 
                    song={song}
                    // Providing the index of a specific song
                    i={i}
               />
            ))}
        </div>
    </div>
        );
    };
export default Discover;
