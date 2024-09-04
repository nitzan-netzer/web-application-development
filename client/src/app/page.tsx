import AppCarousel from "@/srccomponents/Carousel";
import ProductsLinks from "@/srccomponents/ProductsLinks";
// import Header from "@/srccomponents/Header";

export default function Home() {
  return (
    <div className="App">
      <main>
        <AppCarousel />
        <ProductsLinks/>

      </main>
    </div>
  );
}