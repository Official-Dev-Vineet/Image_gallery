import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const ClusterView = ({ filter }) => {
  const [clusters, setClusters] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchClusters();
  }, [filter]);

  const fetchClusters = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const newClusters = {};
      
      // Fetch data for each filter item separately
      for (const queryParam of filter) {
        const apiURL = `https://api.pexels.com/v1/search?query=${queryParam}&per_page=20`;
        const response = await axios.get(apiURL, {
          headers: {
            Authorization: "563492ad6f91700001000001af762a74bbf447dd8b768b453406edc7",
          },
        });
        
        // Store images for each filter in the newClusters object
        if (response.data.photos && response.data.photos.length > 0) {
          newClusters[queryParam] = response.data.photos;
        } else {
          newClusters[queryParam] = []; // Empty array if no images are found
        }
      }

      setClusters(newClusters); // Set all clusters at once
    } catch (error) {
      console.error("Error fetching clusters", error);
      setError("Error fetching clusters. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cluster-view">
      {loading && <div className="loader">Loading clusters...</div>}
      {error && <div className="error">{error}</div>}
      
      {!loading && !error && Object.keys(clusters).length === 0 && (
        <p>No clusters found for the selected filter.</p>
      )}
      
      {!loading && !error && Object.entries(clusters).map(([filterTitle, images]) => (
        <div key={filterTitle} className="filter-cluster">
          <h3>{filterTitle}</h3> {/* Display the filter title */}
          <div className="cluster-images">
            {images.length > 0 ? (
              images.map((image) => (
                <img
                  key={image.id}
                  src={image.src.large}
                  alt={image.alt || "Cluster Image"}
                  style={{ margin: '10px' }}
                />
              ))
            ) : (
              <p>No images found for "{filterTitle}".</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

ClusterView.propTypes = {
  filter: PropTypes.arrayOf(PropTypes.string).isRequired, // Expecting an array of strings (filters)
};

export default ClusterView;
