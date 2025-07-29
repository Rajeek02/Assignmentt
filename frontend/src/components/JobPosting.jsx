import { IconUserPlus, IconBuilding, IconStack2 } from '@tabler/icons-react';

function JobPosting({ logo, role, isDraft = false }) {
  return (
    <div className="bg-white rounded-xl shadow-md w-[270px] min-h-[235px] relative flex flex-col mb-2 justify-between px-3 pt-4 pb-3 hover:shadow-lg transition font-sans">
      {/* Badge */}
      <div
        className={`absolute top-3 right-3 px-2 py-0.5 rounded-md text-xs font-semibold 
        ${isDraft ? 'bg-yellow-300 text-black' : 'bg-[#B0D9FF] text-black'}`}
      >
        {isDraft ? 'Draft' : '24h Ago'}
      </div>

      {/* Logo + Title */}
      <div className="flex flex-col items-start gap-2 mb-2">
        <img src={logo} alt="Company Logo" className="w-12 h-12 object-contain rounded-md -ml-1" />
        <h2 className="text-sm font-semibold text-gray-900 leading-tight">{role}</h2>
      </div>

      {/* Info Row */}
      <div className="flex items-center text-xs text-gray-600 gap-4 mb-2">
        <div className="flex items-center gap-1">
          <IconUserPlus size={14} />
          <span>1-3 yr Exp</span>
        </div>
        <div className="flex items-center gap-1">
          <IconBuilding size={14} />
          <span>Onsite</span>
        </div>
        <div className="flex items-center gap-1">
          <IconStack2 size={14} />
          <span>12LPA</span>
        </div>
      </div>

      {/* Description */}
      <ul className="text-[11.5px] w-full text-gray-500 list-disc pl-4 mb-2 leading-snug">
        <li>A user-friendly interface lets you browse stunning photos and videos</li>
        <li>Filter destinations based on interests and travel style, and create personalized</li>
      </ul>

      {/* Button */}
      <button
        disabled={isDraft}
        className={`w-full py-1 text-[13px] font-medium rounded-md transition ${
          isDraft
            ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
            : 'bg-[#00AAFF] text-white hover:bg-[#0099e6]'
        }`}
      >
        {isDraft ? 'Draft Only' : 'Apply Now'}
      </button>
    </div>
  );
}

export default JobPosting;
