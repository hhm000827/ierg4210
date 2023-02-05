import axios from "axios";
import lang from "lodash/lang";
import { memo, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Card } from "../components/card/Card";

const DisplayedProduct = (props) => {
  return (
    <div className="grid h-auto gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {!lang.isEmpty(props.products) &&
        props.products.map((product) => (
          <div key={`home-${product.name}`}>
            <Card product={product} />
          </div>
        ))}
    </div>
  );
};

function Home() {
  const [products, setProducts] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 6;

  useEffect(() => {
    axios
      .get(`${process.env.React_App_API}/api/getAllProduct`)
      .then((res) => setProducts(res.data))
      .catch((e) => console.error(e));
  }, []);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = products.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(products.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <DisplayedProduct products={currentItems} />
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
}

export default memo(Home);
