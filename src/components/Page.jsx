import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Page = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=e46dafbde220798a673c5b62cd8091cf"
    )
      .then(res => res.json())
      .then(data => {
        // Extract relevant show data from the API response
        const extractedShows = data.results.map(result => ({
          id: result.id,
          name: result.title,
          summary: result.overview,
          image: result.poster_path
            ? `https://image.tmdb.org/t/p/w500/${result.poster_path}`
            : "https://via.placeholder.com/150",
          type: "Movie", // You can set the type as needed
        }));
        setShows(extractedShows);
      })
      .catch(error => {
        console.log("Error fetching shows:", error);
      });
  }, []);

  return (
    <div className="grid grid-cols-4 gap-4 ">
      {shows.map(show => (
        <motion.div
          key={show.id}
          className="max-w-xs rounded overflow-hidden shadow-lg bg-gradient-to-b from-purple-400 via-pink-500 to-red-500"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to={`/show/${show.id}`}>
            <motion.img
              className="w-full"
              src={show.image}
              alt={show.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2 text-white">
                {show.name}
              </div>
              <p className="text-gray-200 text-base">{show.summary}</p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <span className="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-blue-700 mr-2">
                {show.type}
              </span>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default Page;
