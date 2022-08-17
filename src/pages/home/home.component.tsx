import React from "react";
import hero from "../../assets/images/hero.png";
import PopularProducts from "../../components/popular-products/popular-products.component";

function HomeComponent() {
  return (
    <main className="flex-1 overflow-y-auto py-5">
      <section className="text-gray-600 body-font">
        <div className="container px-5 md:py-8 sm:py-2 mx-auto">
          <div className="mx-auto max-w-screen-xl text-center mb-8 lg:mb-16">
            <h1 className="md:text-6xl sm:text-2x tracking-widest text-secondary-100 font-margic">
              Discover Furniture With
            </h1>
            <h2 className="mb-4 md:text-6xl sm:text-2x tracking-widest text-primary-700 font-margic">
              High Quality Wood
            </h2>
            <p className="font-light text-gray-500 lg:mb-16 md:text-base sm:text-sm	font-comfortaa">
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
