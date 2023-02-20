import axios from "axios";
import lang from "lodash/lang";
import { memo, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
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
  const [hasMore, setHasMore] = useState(false);
  const itemsPerPage = 6;

  window.onscroll = () => handleScroll();

  function handleScroll() {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    if (scrolled === 100) loadItems();
  }

  const loadItems = () => {
    if (lang.isArray(selectedProduct)) {
      if (selectedProduct.length < itemsPerPage) {
        setCurrentItems(selectedProduct);
        setHasMore(false);
      } else if (selectedProduct.length > itemOffset * itemsPerPage && hasMore) {
        setCurrentItems((currentItems) => [...currentItems, ...selectedProduct.slice(itemOffset * itemsPerPage, (itemOffset + 1) * itemsPerPage)]);
        setItemOffset((itemOffset) => itemOffset + 1);
      } else if (selectedProduct.length <= itemOffset * itemsPerPage && itemOffset > 0 && hasMore) {
        setCurrentItems((currentItems) => [...currentItems, ...selectedProduct.slice(itemOffset * itemsPerPage, selectedProduct.length)]);
        setHasMore(false);
      }
    }
  };

  useEffect(() => {
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
    setHasMore(true);
    if (!lang.isEmpty(selectedProduct)) loadItems();
    // eslint-disable-next-line
  }, [selectedProduct]);

  return lang.isNil(searchParams.get("pid")) ? (
    !lang.isEmpty(selectedProduct) && lang.isArray(selectedProduct) && (
      <div className="grid h-auto gap-10 grid-cols-1 sm:grid-cols-2">
        <DisplayedProducts selectedProduct={currentItems} />
      </div>
    )
  ) : (
    <div>{selectedProduct && lang.isObject(selectedProduct) && <ProductDetailCard product={selectedProduct} />}</div>
  );
};

export default memo(Product);
