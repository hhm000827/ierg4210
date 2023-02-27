import axios from "axios";
import lang from "lodash/lang";
import { memo, useEffect, useState } from "react";
import { RingLoader } from "react-spinners";
import { Card } from "../components/card/Card";

const DisplayedProduct = (props) => {
  return props.products.map((product) => (
    <div key={`home-${product.name}`}>
      <Card product={product} />
    </div>
  ));
};

function Home() {
  const [products, setProducts] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const itemsPerPage = 4;

  const loadItems = () => {
    if (lang.isArray(products) && hasMore) {
      if (products.length < itemsPerPage) {
        setCurrentItems(products);
        setHasMore(false);
      } else {
        let items = [...currentItems, ...products.slice(itemOffset * itemsPerPage, (itemOffset + 1) * itemsPerPage)];
        setCurrentItems(items);
        if (lang.isEqual(items.length, products.length)) setHasMore(false);
        else setItemOffset((itemOffset) => itemOffset + 1);
      }
    }
  };

  function handleScroll() {
    let home = document.querySelector("#home-page");
    var scrolled = (home.scrollTop / (home.scrollHeight - home.clientHeight)) * 100;
    if (scrolled >= 100) loadItems();
  }

  useEffect(() => {
    axios
      .get(`${process.env.React_App_API}/api/getAllProduct`)
      .then((res) => setProducts(res.data))
      .catch((e) => console.error(e));
  }, []);

  useEffect(() => {
    if (!lang.isEmpty(products)) loadItems();
    // eslint-disable-next-line
  }, [products]);

  return (
    <div id="home-page" className="overflow-y-auto h-[600px]" onScroll={handleScroll}>
      <div className="grid h-auto gap-10 grid-cols-1 sm:grid-cols-2">{!lang.isEmpty(products) && <DisplayedProduct products={currentItems} />}</div>
      <div className="flex justify-center m-7">
        <RingLoader color="white" loading={hasMore} size={150} aria-label="Loading Spinner" data-testid="loader" />
      </div>
    </div>
  );
}

export default memo(Home);
