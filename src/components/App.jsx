import React, { useState, useEffect } from "react";
import Searchbar from "./Searchbar";
import ImageGallery from "./ImageGallery";
import Button from "./Button";
import Loader from "./Loader";
import Modal from "./Modal";

const API_KEY = "47390625-19a19a63281485c70e805310c";
const BASE_URL = "https://pixabay.com/api/";

const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (!query) return;

    const fetchImages = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
        );
        const data = await response.json();
        setImages((prevImages) => (page === 1 ? data.hits : [...prevImages, ...data.hits]));
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [query, page]);

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  return (
    <div>
      <Searchbar onSearch={handleSearch} />
      {loading && <Loader />}
      <ImageGallery images={images} onImageClick={setSelectedImage} />
      {images.length > 0 && <Button onClick={() => setPage(page + 1)} />}
      {selectedImage && <Modal imageUrl={selectedImage} onClose={() => setSelectedImage(null)} />}
    </div>
  );
};

export default App;
