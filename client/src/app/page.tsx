import AppCarousel from "@/srccomponents/Carousel";
import ProductsLinks from "@/srccomponents/categoryImages";
import PagesLinks from "@/srccomponents/pagesLinks";
import Video from "@/srccomponents/marketingVideo";

export default function Home() {
  return (
    <div className="App">
      {/* <Provider store={store}> */}
      <main>
        <AppCarousel />
        <ProductsLinks/>
        <PagesLinks/>
        <Video/>
      </main>
      {/* </Provider> */}
    </div>
  );
}