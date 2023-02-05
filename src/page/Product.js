import axios from "axios";
import lang from "lodash/lang";
import { memo, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useSearchParams } from "react-router-dom";
import { Card, ProductDetailCard } from "../components/card/Card";

const DisplayedProducts = (props) => {
  return (
    <div className="grid h-auto gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {!lang.isEmpty(props.selectedProduct) &&
        lang.isArray(props.selectedProduct) &&
        props.selectedProduct.map((product) => (
          <div key={`$search-${product.name}`}>
            <Card product={product} />
          </div>
        ))}
    </div>
  );
};

const PaginatedItems = (props) => {
  const itemsPerPage = 6;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = props.items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(props.items.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % props.items.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <DisplayedProducts selectedProduct={currentItems} />
      <ReactPaginate
        className="btn-group justify-center m-2"
        pageClassName="btn btn-xs"
        breakClassName="btn btn-xs"
        nextClassName="btn btn-xs"
        previousClassName="btn btn-xs"
        breakLabel="..."
        nextLabel="»"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="«"
        renderOnZeroPageCount={null}
      />
    </>
  );
};

const Product = () => {
  const [searchParams] = useSearchParams();
  const [selectedProduct, setSelectedProduct] = useState();

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

  return lang.isNil(searchParams.get("pid")) ? (
    !lang.isEmpty(selectedProduct) && lang.isArray(selectedProduct) && <PaginatedItems items={selectedProduct} />
  ) : (
    <div>{selectedProduct && lang.isObject(selectedProduct) && <ProductDetailCard product={selectedProduct} />}</div>
  );
};

export default memo(Product);
