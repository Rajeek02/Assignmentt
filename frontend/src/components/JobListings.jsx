import JobPosting from './JobPosting';

// Static logos
import amazonLogo from '../assets/amazon.png';
import teslaLogo from '../assets/tesla.png';
import swiggyLogo from '../assets/swiggy.png';

function JobListings() {
  return (
    <div
      className="w-full bg-gray-50 px-1 font-sans relative"
      style={{ maxHeight: 'calc(100vh - 140px)', overflowY: 'hidden' }}
    >
      <div className="max-w-[1220px] mx-auto grid grid-cols-1 sm:grid-cols-2 mb-2 md:grid-cols-3 lg:grid-cols-4 gap-x-1 gap-y-2 pt-1">

        {/* ✅ Static job cards (examples only) */}
        <JobPosting logo={amazonLogo} role="Full Stack Developer" />
        <JobPosting logo={teslaLogo} role="Node Js Developer" />
        <JobPosting logo={swiggyLogo} role="UX/UI Designer" />
        <JobPosting logo={amazonLogo} role="Frontend Engineer" />
        <JobPosting logo={teslaLogo} role="React Developer" />
        <JobPosting logo={swiggyLogo} role="Product Designer" />
        <JobPosting logo={amazonLogo} role="Backend Developer" />
        <JobPosting logo={teslaLogo} role="Mobile App Developer" />

      </div>
    </div>
  );
}

export default JobListings;
