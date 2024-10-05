import AppCarousel from "@/srccomponents/Carousel";
import ProductsLinks from "@/srccomponents/categoryImages";
import PagesLinks from "@/srccomponents/pagesLinks";
// import { Provider } from 'react-redux'
// import { store } from '../store'

// import Header from "@/srccomponents/Header";

export default function Home() {
  return (
    <div className="App">
      {/* <Provider store={store}> */}
      <main>
        <AppCarousel />
        <ProductsLinks/>
        <PagesLinks/>
      </main>
      {/* </Provider> */}
    </div>
  );
}