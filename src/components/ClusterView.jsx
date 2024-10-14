import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from "prop-types";

const ClusterView = ({ filter }) => {
  const [clusters, setClusters] = useState([]);

  useEffect(() => {
    fetchClusters();
  }, [filter]);

  const fetchClusters = async () => {
    try {
      const response = await axios.get(``, {
        params: { filter },
      });
      setClusters(response.data);
    } catch (error) {
      console.error('Error fetching clusters', error);
    }
  };

  return (
    <div className="cluster-view">
      {clusters.map((cluster) => (
        <div key={cluster.id} className="cluster">
          <h3>{cluster.name}</h3>
          <div className="cluster-images">
            {cluster.images.map((image) => (
              <img key={image.id} src={image.url} alt={image.title} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};


export default ClusterView;
ClusterView.propTypes = {
  filter: PropTypes.array.isRequired,
}