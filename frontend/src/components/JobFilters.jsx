import { IconSearch, IconMapPin, IconUser } from '@tabler/icons-react';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import axios from 'axios';

const CustomSlider = styled(Slider)({
  color: 'black',
  height: 4,
  padding: '13px 0',
  '& .MuiSlider-thumb': {
    width: 16,
    height: 16,
    backgroundColor: '#fff',
    border: '4px solid black',
    borderRadius: '50%',
    boxShadow: 'none',
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    '&::after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: 2,
      height: 2,
      backgroundColor: '#fff',
      borderRadius: '50%',
      transform: 'translate(-50%, -50%)',
    },
  },
  '& .MuiSlider-rail': {
    opacity: 1,
    height: 4,
    backgroundColor: '#ccc',
  },
  '& .MuiSlider-track': {
    height: 4,
    backgroundColor: 'black',
  },
});

function JobFilters({ onFilterChange }) {
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('');
  const [salaryRange, setSalaryRange] = useState([50, 80]);
  const [showJobSuggestions, setShowJobSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  // 👇 Fetch job title suggestions from API
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!search.trim()) {
        setSuggestions([]);
        return;
      }

      try {
        const res = await axios.get(`http://localhost:5000/api/jobs/suggestions?query=${search}`);
        setSuggestions(res.data); // assume it's array of strings
      } catch (err) {
        console.error('Failed to fetch suggestions:', err);
      }
    };

    const delayDebounce = setTimeout(fetchSuggestions, 300); // debounce

    return () => clearTimeout(delayDebounce);
  }, [search]);

  useEffect(() => {
  onFilterChange('title', search);
}, [search]);

useEffect(() => {
  onFilterChange('location', location);
}, [location]);

useEffect(() => {
  onFilterChange('type', jobType);
}, [jobType]);

useEffect(() => {
  const salary = `${salaryRange[0] * 1000}-${salaryRange[1] * 1000}`;
  onFilterChange('salary', salary);
}, [salaryRange]);

  return (
    <div className="flex items-center px-12 h-[70px] w-full bg-white relative font-sans">
      {/* Search Input */}
      <div className="flex flex-1 flex-col relative">
        <div className="flex items-center">
          <IconSearch size={18} className="text-gray-500 mr-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setShowJobSuggestions(true);
            }}
            onBlur={() => setTimeout(() => setShowJobSuggestions(false), 100)}
            placeholder="Search By Job Title, Role"
            className="w-full text-sm text-gray-700 placeholder-gray-400 focus:outline-none bg-transparent"
          />
        </div>
        {showJobSuggestions && search && suggestions.length > 0 && (
          <ul className="absolute top-full mt-1 bg-white border border-gray-300 rounded shadow w-full z-10 text-sm max-h-48 overflow-y-auto">
            {suggestions.map((j) => (
              <li
                key={j}
                onClick={() => {
                  setSearch(j);
                  setShowJobSuggestions(false);
                }}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {j}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Divider */}
      <div className="h-10 w-px bg-gray-300 mx-4" />

      {/* Location Dropdown */}
      <div className="flex flex-1 items-center">
        <IconMapPin size={18} className="text-gray-500 mr-2" />
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full text-sm text-gray-600 bg-transparent focus:outline-none"
        >
          
          <option value="Bangalore">Bangalore</option>
          <option value="Hyderabad">Hyderabad</option>
          <option value="Remote">Remote</option>
          <option value="Chennai">Chennai</option>
        
        </select>
      </div>

      {/* Divider */}
      <div className="h-10 w-px bg-gray-300 mx-4" />

      {/* Job Type */}
      <div className="flex flex-1 items-center">
        <IconUser size={18} className="text-gray-500 mr-2" />
        <select
          value={jobType}
          onChange={(e) => setJobType(e.target.value)}
          className="w-full text-sm text-gray-600 bg-transparent focus:outline-none"
        >
          <option value="">Job type</option>
          <option value="fulltime">Full-time</option>
          <option value="parttime">Part-time</option>
          <option value="contract">Contract</option>
          <option value="internship">Internship</option>
        </select>
      </div>

      {/* Divider */}
      <div className="h-10 w-px bg-gray-300 mx-4" />

      {/* Salary Range */}
      <div className="flex flex-1 flex-col justify-center">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm text-black font-semibold whitespace-nowrap">
            Salary Per Month
          </span>
          <span className="text-sm text-black font-semibold whitespace-nowrap">
            ₹{salaryRange[0]}k - ₹{salaryRange[1]}k
          </span>
        </div>
        <div className="-mt-1">
          <CustomSlider
            size="small"
            value={salaryRange}
            onChange={(_, newValue) => setSalaryRange(newValue)}
            min={0}
            max={100}
            step={10}
          />
        </div>
      </div>
    </div>
  );
}

export default JobFilters;
