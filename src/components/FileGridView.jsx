import { useState, useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import ImageCanvas from "./ImageCanvas.jsx";
import PropTypes from "prop-types";

const FileGridView = ({ filter }) => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [abortController, setAbortController] = useState(null); // Add abort controller

  useEffect(() => {
    const controller = new AbortController(); // Create a new controller for each request
    setAbortController(controller);

    // Fetch images whenever the filter or page changes
    fetchImages(controller.signal);

    // Cleanup function to abort the previous request if a new one is initiated
    return () => {
      if (abortController) {
        abortController.abort(); // Abort the previous request
      }
    };
  }, [filter, page]);

  const fetchImages = async (signal) => {
    try {
      const query = filter.map((queryParam) => `query=${queryParam}`).join("&");
      const apiURL = `https://api.pexels.com/v1/search?${query}&page=${page}&per_page=20`;
      
      const response = await axios.get(apiURL, {
        headers: {
          Authorization: "563492ad6f91700001000001af762a74bbf447dd8b768b453406edc7",
        },
        signal, // Pass the abort signal
      });

      // Only update images if there are images in the response
      if (response.data.photos.length > 0) {
        setImages((prevImages) => [...prevImages, ...response.data.photos]);
      } else {
        setHasMore(false); // No more images to load
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled", error.message);
      } else {
        console.error("Error fetching images", error);
        setHasMore(false); // Stop fetching more if there's an error
      }
    }
  };

  const fetchMoreImages = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <InfiniteScroll
      dataLength={images.length}
      next={fetchMoreImages}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      endMessage={<p>No more images</p>}
    >
      <div className="image-grid">
        {images.map((image, index) => (
          <ImageCanvas key={index} src={image.src.large} alt={image.alt} />
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default FileGridView;

FileGridView.propTypes = {
  filter: PropTypes.array.isRequired,
};
