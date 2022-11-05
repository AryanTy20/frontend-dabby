import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { customAxios } from "../../axios";
import { useUserContext } from "../../hook/useUserContext";
import { errorType } from "../login";
import "./style.scss";

type fileType = FileList | null;
type allImgType = {
  name: string;
  image: string;
}[];

type uploadData = {
  name: string | "";
  image: string | "";
};

const btns = ["Get all Img", "Upload Image", "Search Img by Name"];
const HomePage = () => {
  const [error, setError] = useState("");
  const [allImages, setAllImages] = useState<allImgType>([]);
  const [copyImages, setcopyImages] = useState<allImgType>([]);
  const [serverSearchedImg, setServerSearchedImg] = useState<allImgType | null>(
    []
  );
  const [activeTab, setActiveTab] = useState({
    allImg: true,
    uploadImg: false,
    searchImg: false,
  });
  const [searchKey, setSearchKey] = useState("");
  const [serverSearchKey, setServerSearchKey] = useState("");
  const [activeButton, setActiveButton] = useState(0);
  const [uploadData, setUploadData] = useState<uploadData>({} as uploadData);
  const [files, setFiles] = useState<fileType>(null);
  const { user, setUser } = useUserContext();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const res = await customAxios("/auth/logout");
      setUser(null);
      res.status == 200 && navigate("/login", { replace: true });
    } catch (err) {
      if (axios.isAxiosError(err) && err.message) {
        console.log(err.message);
      }
    }
  };

  //for img preview and convert to data url
  useEffect(() => {
    if (!files) return;
    const maxSize = 5000000;
    const file = files?.[0];
    if (file.size > maxSize) {
      alert("Image is too big");
      setFiles(null);
      return;
    }
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const img = reader.result?.toString();
        setUploadData({ name: "", image: img as string });
      };
    }
  }, [files]);

  //uploading data to server
  const handleImgUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!uploadData.image || !uploadData.name) {
      setError("Image and name are required");
      return;
    } else {
      setError("");
    }
    try {
      await customAxios.post("/user/upload", uploadData);
    } catch (err) {
      if (axios.isAxiosError(err) && err.message) {
        const { message, status } = err.response?.data as errorType;
        status === 403 ? setError(message) : setError("Something went wrong!");
      }
    }
  };

  //getting  all images
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await customAxios("/user/images");
        setAllImages(res.data);
      } catch (err) {
        if (axios.isAxiosError(err) && err.message) {
          const { message } = err.response?.data as errorType;
          setError(message);
        }
      }
    };
    getData();
  }, [activeTab.allImg]);

  //setting active tab for diffrent section , reseting searchkey and  reseting error
  useEffect(() => {
    switch (activeButton) {
      case 0:
        setActiveTab({
          allImg: true,
          uploadImg: false,
          searchImg: false,
        });
        break;
      case 1:
        setActiveTab({
          allImg: false,
          uploadImg: true,
          searchImg: false,
        });
        break;
      case 2:
        setActiveTab({
          allImg: false,
          uploadImg: false,
          searchImg: true,
        });
        break;
    }
    setError("");
    setSearchKey("");
    setServerSearchKey("");
  }, [activeButton]);

  //local image search
  const filterImg = () => {
    if (!searchKey) {
      setError("searchkey is required");
      return;
    }
    setcopyImages(allImages);
    setAllImages(allImages.filter((el) => el.name === searchKey));
  };

  //search in server request
  const searchInServer = () => {
    const getData = async () => {
      if (!serverSearchKey) {
        setError("searchkey is required");
        return;
      }
      try {
        const res = await customAxios(`/user/search?name=${serverSearchKey}`);
        setServerSearchedImg(res.data);
      } catch (err) {
        if (axios.isAxiosError(err) && err.message) {
          const { message } = err.response?.data as errorType;
          setError(message);
        }
      }
    };
    getData();
  };

  //default state of images
  useEffect(() => {
    if (searchKey === "" && !searchInServer) {
      setAllImages(copyImages);
    }
    if (serverSearchKey === "" && !searchKey) {
      setServerSearchedImg(null);
    }
  }, [searchKey, serverSearchKey]);

  return (
    <>
      <nav>
        <h1>Welcome {user?.name}</h1>

        <button className="btn btn-primary" onClick={logout}>
          logout
        </button>
      </nav>
      <main>
        <section>
          <div className="header my-2 p-2 border">
            <ul className=" nav nav-pills nav-justified">
              {btns?.map((btn, i) => (
                <button
                  className={`nav-link  ${i == activeButton ? "active" : ""}`}
                  onClick={() => setActiveButton(i)}
                  key={i}
                >
                  {btn}
                </button>
              ))}
            </ul>
          </div>
          <div className="container">
            {activeTab.uploadImg && (
              <div className="upload-img">
                <h1>Upload Image</h1>
                {error && <p className="error">{error}</p>}
                <div className="upload-section">
                  <div className="prev">
                    <img src={uploadData?.image} alt="" />
                  </div>
                  <form onSubmit={handleImgUpload} className="img-upload">
                    {!uploadData?.image && (
                      <input
                        type="file"
                        name="img"
                        accept=".png,.jpg,.jpeg"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setFiles(e.target.files)
                        }
                      />
                    )}
                    <input
                      type="text"
                      className="form-control p-2"
                      placeholder="Image Name"
                      value={uploadData.name}
                      onChange={(e) =>
                        setUploadData({
                          name: e.target.value,
                          image: uploadData?.image as string,
                        })
                      }
                    />
                    <input
                      type="submit"
                      value="Upload"
                      className="btn btn-secondary"
                    />
                    <input
                      type="reset"
                      value="Cancel"
                      className="btn btn-danger"
                      onClick={() => setUploadData({ name: "", image: "" })}
                    />
                  </form>
                </div>
              </div>
            )}
            {activeTab.allImg && (
              <div className="allimg">
                <div className="header ">
                  <h1 className="h5">All Images</h1>
                  {error && <p className="error">{error}</p>}
                  <div className="searchbox">
                    <input
                      type="search"
                      value={searchKey}
                      onChange={(e) => setSearchKey(e.target.value)}
                      placeholder={"search by name"}
                    />
                    <button
                      className="btn btn-info text-white mx-1"
                      onClick={filterImg}
                    >
                      search
                    </button>
                  </div>
                </div>
                <div className="img-container">
                  {allImages?.map((item, i) => (
                    <div className="box" key={i}>
                      <img src={item?.image} alt={item.name} />
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeTab.searchImg && (
              <div className="searchImg">
                {error && <p className="error">{error}</p>}
                <h1 className="text-center h4">Search img in server</h1>

                <div className="input-box ">
                  <input
                    type="search"
                    className="form-control"
                    value={serverSearchKey}
                    onChange={(e) => setServerSearchKey(e.target.value)}
                    placeholder={"search by name"}
                  />
                  <button
                    className="btn btn-info text-white mx-1 my-2"
                    onClick={searchInServer}
                  >
                    search
                  </button>
                </div>
                <div className="img-container">
                  {serverSearchedImg?.map((item, i) => (
                    <div className="box" key={i}>
                      <img src={item?.image} alt={item.name} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <footer>
        <h1>
          Created By{" "}
          <a href="https://aryanty.vercel.app" target={"_blank"}>
            Aryan Tirkey
          </a>
        </h1>
      </footer>
    </>
  );
};

export default HomePage;
