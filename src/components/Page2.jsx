import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

const Page2 = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=e46dafbde220798a673c5b62cd8091cf&language=en-US`
    )
      .then(res => res.json())
      .then(data => {
        setShow(data);
      })
      .catch(error => {
        console.log("Error fetching show details:", error);
      });
  }, [id]);

  return (
    <div>
      {show ? (
        <div className="container mx-auto px-4 py-8">
          {show.poster_path && (
            <motion.img
              drag
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              dragElastic={0.9}
              className="w-64 h-96 rounded-lg shadow-lg"
              src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`}
              alt={show.title}
            />
          )}
          <motion.h1
            className="text-3xl font-bold my-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {show.title}
          </motion.h1>
          <motion.p
            className="text-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            {show.overview}
          </motion.p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Page2;
