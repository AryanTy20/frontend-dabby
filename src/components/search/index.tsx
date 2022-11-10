import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { customAxios } from "../../axios";
import { errorType } from "../login";
import LazyImage from "../LazyImg";
import "./style.scss";

type searchtype = {
  name: string;
  image: string;
}[];

const Search = () => {
  const [searchResult, setSearchResult] = useState<searchtype>([]);
  const [serachKey, setSerachKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const handleSearch = async () => {
    if (!serachKey) return;
    setIsLoading(true);
    try {
      const res = await customAxios(`/user/search?name=${serachKey}`);
      setSearchResult(res.data);
      setIsLoading(false);
    } catch (err) {
      if (axios.isAxiosError(err) && err.message) {
        setIsLoading(false);
        const { message } = err.response?.data as errorType;
        setError(message);
      }
    }
  };

  useEffect(() => {
    if (error) {
      toast(error, {
        type: "error",
      });
    }
  }, [error]);

  useEffect(() => {
    if (!serachKey) {
      setSearchResult([]);
    }
  }, [serachKey]);

  return (
    <section className="Search">
      <div className="header">
        <h1>Search in server</h1>
        <div className="searchBox">
          <input
            type="search"
            name="searchKey"
            value={serachKey}
            onChange={(e) => setSerachKey(e.target.value)}
            placeholder="Search By title"
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>
      <div
        className={`search-result ${searchResult.length === 0 ? "no-img" : ""}`}
      >
        {searchResult?.map((item, i) => (
          <div className="img--box" key={i}>
            <div className="poster">
              <LazyImage src={item.image} alt={item.name} />
            </div>
            <div className="name">
              <h5>{item.name}</h5>
            </div>
          </div>
        ))}
        {isLoading && <p>Loading...</p>}
        {searchResult.length === 0 && !isLoading && (
          <h1>Search Images by Name</h1>
        )}
      </div>
    </section>
  );
};

export default Search;
