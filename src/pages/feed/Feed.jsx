import React, { useEffect, useState } from "react";
import HotelCard from "../../components/card/HotelCard";
import { getHotels } from "../../api/apiConfig";
import { useLocation, useNavigate } from "react-router-dom";
import SearchField from "../../components/search/SearchField";
import NavigationBtns from "../../components/navigationBtns/NavigationBtns";

export default function Feed() {
  const [hotels, setHotels] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get("page");
  function handleListingHotels() {
    getHotels(page)
      .then((response) => {
        setHotels(response.data.items);
        setPageCount(
          Math.ceil(response.data.totalCount / response.data.pageSize)
        );
      })
      .catch((e) => {
        console.error(e);
      });
  }
  function handleNextPage() {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    navigate(`/feed?page=${nextPage}`);
  }
  function handlePrevPage() {
    const prevPage = currentPage - 1;
    setCurrentPage(prevPage);
    navigate(`/feed?page=${prevPage}`);
  }
  useEffect(() => {
    handleListingHotels();
    setCurrentPage(parseInt(page));
  }, [currentPage, page]);

  return (
    <>
      <SearchField />
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <HotelCard hotels={hotels} />
      </div>
      <NavigationBtns
        page={currentPage}
        pageCount={pageCount}
        nextPage={handleNextPage}
        prevPage={handlePrevPage}
      />
    </>
  );
}
