import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import ImageCanvas from './ImageCanvas.jsx';

const FileGridView = ({ filter }) => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchImages();
  }, [filter]);

  const fetchImages = async () => {
    try {
      const response = await axios.get(`https://api.example.com/images`, {
        params: { page, filter },  // Mocked API; replace with your API or data
      });
      setImages((prevImages) => [...prevImages, ...response.data]);
      if (response.data.length === 0) setHasMore(false);
    } catch (error) {
      console.error('Error fetching images', error);
    }
  };

  const fetchMoreImages = () => {
    setPage((prevPage) => prevPage + 1);
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
        {images.map((image) => (
          <ImageCanvas key={image.id} src={image.url} alt={image.title} />
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default FileGridView;
