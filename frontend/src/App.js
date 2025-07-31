import { useEffect, useState } from 'react';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import Navbar from './components/Navbar';
import JobFilters from './components/JobFilters';
import JobListings from './components/JobListings';
import CreateJobForm from './components/CreateJobForm';
import axios from 'axios';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({
    title: '',
    location: '',
    type: '',
    salary: '',
  });

  // Toggle form modal
  const handleToggleForm = () => setShowForm((prev) => !prev);

  // Filter change handler
  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  // Fetch all jobs
  const fetchJobs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/jobs');
      setJobs(response.data);
    } catch (error) {
      console.error('❌ Error fetching jobs:', error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Recalculate filtered jobs on filter or job changes
  const getFilteredJobs = () => {
    let result = [...jobs];
    const { title, location, type, salary } = filters;

    if (title) {
      result = result.filter((job) =>
        job.title.toLowerCase().includes(title.toLowerCase())
      );
    }

    if (location) {
      result = result.filter((job) =>
        job.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    if (type) {
      result = result.filter(
        (job) => job.jobType?.toLowerCase() === type.toLowerCase()
      );
    }

    if (salary) {
      const [min, max] = salary.split('-').map(Number);
      result = result.filter((job) => {
        const rawSalary = job.salaryRange;
        if (typeof rawSalary !== 'string') return false;
        const cleaned = rawSalary.replace(/[^\d]/g, '');
        const salaryNumber = parseInt(cleaned, 10);
        return salaryNumber >= min && salaryNumber <= max;
      });
    }

    return result;
  };

  const filteredJobs = getFilteredJobs();

  // After submitting a job
  const handleJobSubmit = () => {
    fetchJobs();
    setShowForm(false);
  };

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <div className="relative min-h-screen bg-[#f8f9fa] px-6 py-4 font-sans">
        <Navbar onCreateClick={handleToggleForm} />

        <div className="mt-6">
          <JobFilters onFilterChange={handleFilterChange} filters={filters} />
        </div>

        <div className="mt-6">
          <JobListings localJobs={filteredJobs} /> {/* ✅ Passing dynamic jobs */}
        </div>

        {showForm && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-14 bg-black/50">
            <div className="bg-white bg-opacity-95 rounded-xl shadow-xl w-[78%] max-w-[680px] p-4 relative">
              <CreateJobForm onSubmitSuccess={handleJobSubmit} />
            </div>
          </div>
        )}
      </div>
    </MantineProvider>
  );
}

export default App;
