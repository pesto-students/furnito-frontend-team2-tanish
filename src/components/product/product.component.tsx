import React from "react";
import { motion, useAnimation } from "framer-motion";
import { Link } from "react-router-dom";

function SingleProductComponent() {
  const controls = useAnimation();
  return (
    <div className="flex flex-col items-center justify-center max-w-sm mx-auto mb-16">
      <Link to="/product">
        <div className="w-full h-64 bg-gray-300 bg-center bg-cover rounded-lg shadow-md">
          <img
            onFocus={() => {
              controls.start({
                x: 1500,
                scale: 1,
                transition: { duration: 1, ease: "easeInOut" },
              });
            }}
            src="https://images.unsplash.com/photo-1618221469555-7f3ad97540d6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80"
            alt="product"
            className="w-full h-full object-cover object-center "
          />
        </div>
      </Link>
      <motion.div
        whileHover={{
          scale: 1.2,
          transition: { duration: 0.4, ease: "linear" },
        }}
        className="w-56 -mt-10 overflow-hidden bg-white rounded-lg shadow-lg md:w-64"
      >
        <h3 className="py-2 font-bold tracking-wide text-center text-gray-800 uppercase">
          Landskrona
        </h3>

        <div className="flex items-center justify-between px-3 py-2 bg-gray-200">
          <span className="font-bold text-gray-800 ">₹1290</span>
          <motion.button
            whileTap={{
              scale: 0.9,
              transition: { duration: 0.1 },
            }}
            type="button"
            className="px-2 py-1 text-xs font-semibold text-white uppercase transition-colors duration-200 transform bg-gray-800 rounded hover:bg-gray-700"
          >
            Add to cart
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

export default SingleProductComponent;