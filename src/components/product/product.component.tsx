import { motion, useAnimation } from "framer-motion";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux/hooks";
import { incrementCart } from "../../features/product/product-slice";

function SingleProductComponent({ product }: { product: any }) {
  const dispatch = useAppDispatch();

  const controls = useAnimation();
  return (
    <div className="flex flex-col items-center justify-center max-w-sm mx-auto ml-12 mr-12 mb-24 ">
      <Link
        to={`product/${product._id}`}
        className="w-full h-64  bg-center bg-cover rounded-lg "
      >
        <img
          onFocus={() => {
            controls.start({
              x: 1500,
              scale: 1,
              transition: { duration: 1, ease: "easeInOut" },
            });
          }}
          src={product.images[0]}
          alt="product"
          className="w-full h-full object-cover object-center "
        />
      </Link>
      <motion.div
        whileHover={{
          scale: 1.2,
          transition: { duration: 0.4, ease: "linear" },
        }}
        className="w-56 -mt-4 overflow-hidden bg-white rounded-lg shadow-lg md:w-64"
      >
        <h3 className="py-2 font-bold tracking-wide text-center text-gray-800 uppercase">
          {product.name}
        </h3>

        <div className="flex items-center justify-between px-3 py-2 bg-gray-200">
          <span className="font-bold text-gray-800 ">₹{product.price}</span>
          <motion.button
            whileTap={{
              scale: 0.9,
              transition: { duration: 0.1 },
            }}
            type="button"
            onClick={() => {
              dispatch(incrementCart(product));
            }}
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
