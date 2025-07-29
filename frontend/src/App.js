import { useState } from 'react';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import Navbar from './components/Navbar';
import JobFilters from './components/JobFilters';
import JobListings from './components/JobListings';
import CreateJobForm from './components/CreateJobForm';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [filters, setFilters] = useState(null); // 👈 store filters here

  const handleToggleForm = () => {
    setShowForm((prev) => !prev);
  };

  const handleFilter = (filtersData) => {
    setFilters(filtersData); // 👈 pass filters down to JobListings.jsx
  };

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <div className="relative min-h-screen bg-[#f8f9fa] px-6 py-4">
        <Navbar onCreateClick={handleToggleForm} />

        <div className="mt-6">
          <JobFilters onFilter={handleFilter} /> {/* 👈 search UI restored */}
        </div>

        <div className="mt-6">
          <JobListings filters={filters} />
        </div>

        {showForm && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-14 bg-black/50">
            <div className="bg-white bg-opacity-95 rounded-xl shadow-xl w-[78%] max-w-[680px] p-4 relative">
              <CreateJobForm />
            </div>
          </div>
        )}
      </div>
    </MantineProvider>
  );
}

export default App;
