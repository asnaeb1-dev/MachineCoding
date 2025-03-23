import { useEffect, useState } from "react";
import Product from "./Product";
import "./product.css";
import Pagination from "./Pagination";
/**Machine coding round
 *  How to begin when a question is given to you
    1) Ask the interviewer question, discuss with him. DO NOT START CODING (5 min - 7 mins)
       Here, what to ask?|
      i) what is the endpoint we need to hit - (interviwewer provides you a link or use dummy JSON)
      ii) is the api already paginated? - meaning, if the api responses page wise where we can alter page number and the responsonses counts
      iii) initially how many data points we need to show?
      iv) if the number of items that we can withdraw from the list is configurable? or we depend upon the internet speed

    2) Break down the question into smaller chunks
     i) CHUNK1 - Call API and show products on the UI (inform the interviwewer about this and start)
		 ii) CHUNK2 - Create pagination and implement it
 */

const API = "https://dummyjson.com/products?limit=5";

const PaginationInterview = () => {
  const [productList, setProductList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [totalProducts, setTotalProducts] = useState(0);
  const [paginationDetails, setPaginationDetails] = useState({
    pageNumber: 0,
    responsesPerPage: 30,
    totalPageCount: 0,
  });

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const products = await fetch(
          `https://dummyjson.com/products?limit=${
            paginationDetails.responsesPerPage
          }&skip=${
            paginationDetails.pageNumber * paginationDetails.responsesPerPage
          }`
        );
        const data = await products.json();
        setProductList(data);
        setPaginationDetails((details) => {
          const d = { ...details };
          d.totalPageCount = Math.ceil(
            data.total / paginationDetails.responsesPerPage
          );
          return d;
        });
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, [paginationDetails.pageNumber, paginationDetails.responsesPerPage]);

  return (
    <div className="product-page">
      <div className="top-div">
        <h1>Products</h1>
        <div className="pagination-main">
          {[...new Array(paginationDetails.totalPageCount)].map((_, index) => {
            return (
              <span
                onClick={() =>
                  setPaginationDetails((details) => {
                    const d = { ...details };
                    d.pageNumber = index;
                    return d;
                  })
                }
                className={
                  paginationDetails.pageNumber === index ? "btn-select" : "btn"
                }
              >
                {index + 1}
              </span>
            );
          })}
          <input
            maxLength={2}
            max={50}
            min={5}
            minLength={1}
            type={"number"}
            onChange={(e) =>
              setPaginationDetails((details) => {
                const d = { ...details };
                d.responsesPerPage = Number(e.target.value);
                return d;
              })
            }
            value={paginationDetails.responsesPerPage}
            placeholder="Page"
          />
        </div>
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="product-list">
          {productList.length === 0 && (
            <h1 style={{ color: "black" }}>No Products here!</h1>
          )}
          {productList?.products?.map((product) => {
            return <Product key={product.id} product={product} />;
          })}
        </div>
      )}
    </div>
  );
};

export default PaginationInterview;
