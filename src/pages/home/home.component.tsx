import React from "react";
import hero from "../../assets/images/hero.png";
import PopularProducts from "../../components/popular-products/popular-products.component";

function HomeComponent() {
  return (
    <main className="flex-1 overflow-y-auto py-5">
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-8 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-6xl text-6xl font-margic title-font mb-4 text-gray-900 px-[22rem] tracking-wider">
              <span className="text-secondary-100">
                Discover Furniture With{" "}
              </span>
              <span className="text-dark-shades-100">High Quality Wood</span>
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed font-comfortaa text-gray-600 text-base w-1">
              Pellentesque etiam blandit in tincidunt at donec. Eget ipsum
              dignissim placerat nisi, adipiscing mauris non. Purus parturient
              viverra nunc, tortor sit laoreet. Quam tincidunt aliquam
              adipiscing tempor.
            </p>
          </div>
        </div>
        <div className="container py-14 mx-auto rounded-lg overflow-hidden">
          <img src={hero} alt="hero" />
        </div>
      </section>
      <PopularProducts />
    </main>
  );
}
export default HomeComponent;
