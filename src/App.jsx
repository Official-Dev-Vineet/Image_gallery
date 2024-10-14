import { useState } from 'react';
import FileGridView from './components/FileGridView.jsx';
import ClusterView from './components/ClusterView.jsx';
import FilterComponent from './components/FilterComponent.jsx';

const App = () => {
  const [view, setView] = useState('files'); // 'files' or 'cluster'
  const [filter, setFilter] = useState([]);

  const handleFilterChange = (filter) => {
    setFilter(filter);
  };

  return (
    <div className="app">
      <h1>File Grid Viewer</h1>
      <FilterComponent onFilterChange={handleFilterChange} />
      <div className="view-switch">
        <button onClick={() => setView('files')}>Files View</button>
        <button onClick={() => setView('cluster')}>Cluster View</button>
      </div>
      {view === 'files' ? (
        <FileGridView filter={filter} />
      ) : (
        <ClusterView filter={filter} />
      )}
    </div>
  );
};

export default App;
