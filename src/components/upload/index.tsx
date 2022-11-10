import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { customAxios } from "../../axios";
import { errorType } from "../login";
import "./style.scss";

const Upload = () => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | FileList | null>();
  const [prevImg, setPrevImg] = useState("");
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      name: fileName,
      image: prevImg,
    };
    setIsUploading(true);
    try {
      await customAxios.post("/user/upload", payload);
      setIsUploading(false);
      setFile(null);
      setPrevImg("");
      setFileName("");
    } catch (err) {
      if (axios.isAxiosError(err) && err.message) {
        setIsUploading(false);
        const { message, status } = err.response?.data as errorType;
        status === 403 ? setError(message) : setError("Something went wrong!");
      }
    }
  };

  const dragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setFile(e.dataTransfer.files[0]);
  };

  const dragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFile(e.target.files[0]);
  };
  useEffect(() => {
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file as Blob);
    reader.onloadend = async () => {
      setPrevImg(reader.result as string);
    };
  }, [file]);
  useEffect(() => {
    let id;
    if (isUploading) {
      id = toast("uploading", {
        type: "info",
      });
    }
    !isUploading && toast.dismiss(id);
  }, [isUploading]);

  useEffect(() => {
    if (error) {
      toast(error, {
        type: "error",
      });
    }
  }, [error]);

  return (
    <section className="upload">
      <form onSubmit={handleUpload} className="form-upload">
        <h1>Upload Image</h1>
        <label htmlFor="image">Title</label>
        <input
          type="text"
          name="imgName"
          id="image"
          placeholder="image title"
          required
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
        />
        <div className="img-box">
          <label htmlFor="file">Add Image</label>
          {!prevImg ? (
            <div className="img-upload" onDragOver={dragOver} onDrop={dragEnd}>
              <h3>Drag and Drop</h3>
              <h4>or</h4>
              <input
                type="file"
                id="file"
                name="image"
                required
                accept=".png,.jpeg,.jpg"
                ref={fileRef}
                onChange={inputChange}
                hidden
              />
              <button onClick={() => fileRef.current?.click()}>
                Select File
              </button>
            </div>
          ) : (
            <div className="img-prev">
              <img src={prevImg} />
            </div>
          )}
        </div>
        <div className="form-btns">
          <input type="submit" className="btn" value="Upload" />
          <input
            type="reset"
            className="btn"
            value="cancel"
            onClick={() => {
              setFile(null);
              setPrevImg("");
            }}
          />
        </div>
      </form>
    </section>
  );
};
export default Upload;
