import AppCarousel from "@/srccomponents/Carousel";
import ProductsLinks from "@/srccomponents/ProductsLinks";

export default function Home() {
  return (
    <div className="App">
      {/* <Provider store={store}> */}
      <main>
        <AppCarousel />
        <ProductsLinks/>

      </main>
      {/* </Provider> */}
    </div>
  );
}