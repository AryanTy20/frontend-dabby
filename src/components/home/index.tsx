import axios from "axios";
import React, { useEffect, useState } from "react";
import { customAxios } from "../../axios";
import { errorType } from "../login";
import { LazyLoadImage } from "react-lazy-load-image-component";
import LazyImage from "../LazyImg";
import "./style.scss";

type allImgType = {
  name: string;
  image: string;
}[];

const Home = () => {
  const [allImg, setAllImg] = useState<allImgType>([]);
  const [copyAllImg, setCopyAllImg] = useState<allImgType>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchKey, setSearchKey] = useState("");

  //getting  all images
  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const res = await customAxios("/user/images");
        setAllImg(res.data);
        setIsLoading(false);
      } catch (err) {
        if (axios.isAxiosError(err) && err.message) {
          setIsLoading(false);
          const { message } = err.response?.data as errorType;
          setError(message);
        }
      }
    };
    getData();
  }, []);
  const searchLocal = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchKey) return;
    setCopyAllImg(allImg);
    setAllImg(allImg.filter((el) => el.name === searchKey));
  };
  useEffect(() => {
    if (!searchKey) {
      setAllImg(copyAllImg);
    }
  }, [searchKey]);

  return (
    <section className="home">
      <div className="header">
        <h1>Welcome Aryan</h1>
        <form onSubmit={searchLocal} className="search">
          <input
            type="search"
            name="searchKey"
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
            placeholder="search by name"
          />
          <input type="submit" value="search" />
        </form>
      </div>
      {isLoading && <p className="loading">Loading...</p>}
      <div className="all-img">
        {allImg.map((item, i) => (
          <div className="img--box" key={i}>
            <div className="poster">
              <LazyImage src={item.image} alt={item.name} />
            </div>
            <div className="name">
              <h5>{item.name}</h5>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Home;
