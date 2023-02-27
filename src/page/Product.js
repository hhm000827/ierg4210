import axios from "axios";
import lang from "lodash/lang";
import { memo, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { RingLoader } from "react-spinners";
import { Card, ProductDetailCard } from "../components/card/Card";

const DisplayedProducts = (props) => {
  return props.selectedProduct.map((product) => (
    <div key={`$search-${product.name}`}>
      <Card product={product} />
    </div>
  ));
};

const Product = () => {
  const [searchParams] = useSearchParams();
  const [selectedProduct, setSelectedProduct] = useState();
  const [itemOffset, setItemOffset] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const itemsPerPage = 4;

  function handleScroll() {
    let home = document.querySelector("#category-page");
    var scrolled = (home.scrollTop / (home.scrollHeight - home.clientHeight)) * 100;
    if (scrolled >= 100) loadItems();
  }

  const loadItems = () => {
    if (lang.isArray(selectedProduct) && hasMore) {
      if (selectedProduct.length < itemsPerPage) {
        setCurrentItems(selectedProduct);
        setHasMore(false);
      } else {
        let items = [...currentItems, ...selectedProduct.slice(itemOffset * itemsPerPage, (itemOffset + 1) * itemsPerPage)];
        setCurrentItems(items);
        if (lang.isEqual(items.length, selectedProduct.length)) setHasMore(false);
        else setItemOffset((itemOffset) => itemOffset + 1);
      }
    }
  };

  useEffect(() => {
    setHasMore(true);
    setCurrentItems([]);
    //determine which card tyoe should use base on the existence of pid
    lang.isNil(searchParams.get("pid"))
      ? axios
          .get(`${process.env.React_App_API}/api/getFilteredProducts?cid=${Number(searchParams.get("cid"))}`)
          .then((res) => setSelectedProduct(res.data))
          .catch((e) => console.error(e))
      : axios
          .get(`${process.env.React_App_API}/api/getFilteredProducts?pid=${Number(searchParams.get("pid"))}`)
          .then((res) => setSelectedProduct(res.data))
          .catch((e) => console.error(e));
  }, [searchParams]);

  useEffect(() => {
    if (!lang.isEmpty(selectedProduct)) loadItems();
    // eslint-disable-next-line
  }, [selectedProduct]);

  return lang.isNil(searchParams.get("pid")) ? (
    <div id="category-page" className="overflow-y-auto h-[600px]" onScroll={handleScroll}>
      {!lang.isEmpty(selectedProduct) && lang.isArray(selectedProduct) && (
        <div className="grid h-auto gap-10 grid-cols-1 sm:grid-cols-2">
          <DisplayedProducts selectedProduct={currentItems} />
        </div>
      )}
      <div className="flex justify-center m-7">
        <RingLoader color="white" loading={hasMore} size={150} aria-label="Loading Spinner" data-testid="loader" />
      </div>
    </div>
  ) : (
    <div id="product-page">{selectedProduct && lang.isObject(selectedProduct) && <ProductDetailCard product={selectedProduct} />}</div>
  );
};

export default memo(Product);
