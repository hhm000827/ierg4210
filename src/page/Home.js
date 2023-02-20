import axios from "axios";
import lang from "lodash/lang";
import { memo, useEffect, useState } from "react";
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
  const [hasMore, setHasMore] = useState(false);
  const itemsPerPage = 6;

  window.onscroll = () => handleScroll();

  const loadItems = () => {
    if (lang.isArray(products)) {
      if (products.length < itemsPerPage) {
        setCurrentItems(products);
        setHasMore(false);
      } else if (products.length > itemOffset * itemsPerPage && hasMore) {
        setCurrentItems([...currentItems, ...products.slice(itemOffset * itemsPerPage, (itemOffset + 1) * itemsPerPage)]);
        setItemOffset((itemOffset) => itemOffset + 1);
      } else if (products.length <= itemOffset * itemsPerPage && itemOffset > 0 && hasMore) {
        setCurrentItems([...currentItems, ...products.slice(itemOffset * itemsPerPage, products.length)]);
        setHasMore(false);
      }
    }
  };

  function handleScroll() {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    if (scrolled === 100) loadItems();
  }

  useEffect(() => {
    axios
      .get(`${process.env.React_App_API}/api/getAllProduct`)
      .then((res) => setProducts(res.data))
      .catch((e) => console.error(e));
  }, []);

  useEffect(() => {
    setHasMore(true);
    if (!lang.isEmpty(products)) loadItems();
    // eslint-disable-next-line
  }, [products]);

  return <div className="grid h-auto gap-10 grid-cols-1 sm:grid-cols-2">{!lang.isEmpty(products) && <DisplayedProduct products={currentItems} />}</div>;
}

export default memo(Home);
