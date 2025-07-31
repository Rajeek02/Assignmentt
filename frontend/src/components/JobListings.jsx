import JobPosting from './JobPosting';
import { useEffect, useState } from 'react';
import axios from 'axios';

function JobListings({ localJobs, filters }) {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

  // ✅ Fetch jobs with current filters
  const fetchJobs = async () => {
    try {
      const query = new URLSearchParams();

      if (filters.title) query.append('title', filters.title);
      if (filters.location) query.append('location', filters.location);
      if (filters.jobType) query.append('jobType', filters.jobType);
      if (filters.salaryFrom) query.append('salaryFrom', filters.salaryFrom);
      if (filters.salaryTo) query.append('salaryTo', filters.salaryTo);

      const res = await axios.get(`http://localhost:5000/api/jobs?${query.toString()}`);
      setJobs(res.data);
    } catch (err) {
      console.error('❌ Fetch error:', err);
    }
  };

  // ✅ Load jobs from props or fetch if not available
  useEffect(() => {
    if (localJobs && localJobs.length > 0) {
      setJobs(localJobs);
    } else {
      fetchJobs();
    }
  }, [localJobs]);

  // ✅ Fetch again when filters change
  useEffect(() => {
    console.log('📦 Current Filters:', filters);
    fetchJobs();
  }, [filters]);

  // ✅ Filter jobs locally
  useEffect(() => {
    if (!filters) {
      setFilteredJobs(jobs);
      return;
    }

    const {
      title = '',
      location = '',
      jobType = '',
      salaryFrom = 0,
      salaryTo = Infinity,
    } = filters;

    const minSalary = parseInt(salaryFrom) || 0;
    const maxSalary = parseInt(salaryTo) || Infinity;

    const filtered = jobs.filter((job) => {
      const jobTitle = job.title?.toLowerCase() || '';
      const jobLocation = job.location?.toLowerCase() || '';
      const jobTypeValue = job.jobType?.toLowerCase() || '';
      const jobSalaryMin = parseInt(job.salaryFrom) || 0;
      const jobSalaryMax = parseInt(job.salaryTo) || 0;

      const matchesTitle = !title || jobTitle.includes(title.toLowerCase());
      const matchesLocation = !location || jobLocation === location.toLowerCase();
      const matchesType = !jobType || jobTypeValue === jobType.toLowerCase();
      const matchesSalary =
        jobSalaryMin >= minSalary && jobSalaryMax <= maxSalary;

      return matchesTitle && matchesLocation && matchesType && matchesSalary;
    });

    setFilteredJobs(filtered);
  }, [jobs, filters]);

  return (
    <div
      className="w-full bg-gray-50 px-1 font-sans relative"
      style={{ maxHeight: 'calc(100vh - 140px)', overflowY: 'auto' }}
    >
      <div className="max-w-[1220px] mx-auto grid grid-cols-1 sm:grid-cols-2 mb-2 md:grid-cols-3 lg:grid-cols-4 gap-x-1 gap-y-2 pt-1">
        {filteredJobs.map((job, index) => (
          <JobPosting
            key={index}
            logo={null}
            role={job.title}
            location={job.location}
            jobType={job.jobType}
            salaryMin={job.salaryFrom}
            salaryMax={job.salaryTo}
            description={job.description}
            isDraft={false}
            createdAt={job.createdAt}
          />
        ))}
      </div>
    </div>
  );
}

export default JobListings;
