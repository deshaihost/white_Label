import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

interface CreateNewPropertyProps {
  onClose: () => void;
  onSave: (name: string, thumbnailFile: File | null) => void;
}

export default function CreateNewProperty({ onClose, onSave }: CreateNewPropertyProps) {
  const [propertyName, setPropertyName] = useState('');
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
      setFileName(file.name);
    }
  };

  const handleSubmit = () => {
    if (propertyName.trim()) {
      onSave(propertyName, thumbnailFile);
      setPropertyName('');
      setThumbnailFile(null);
      setFileName('');
    }
  };

  return (
    <div className="min-h-screen bg-[#0F1117] p-8">
      {/* Back Button */}
      <button
        onClick={onClose}
        className="flex items-center gap-2 text-[#a6a9b2] hover:text-white transition-colors mb-8 text-[14px] font-['DM_Sans:Medium',_sans-serif]"
        style={{ fontVariationSettings: "'opsz' 14" }}
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Properties
      </button>

      {/* Main Container */}
      <div className="max-w-[900px] mx-auto">
        {/* Title */}
        <h1 className="text-white text-center text-[32px] font-['DM_Sans:SemiBold',_sans-serif] mb-12" style={{ fontVariationSettings: "'opsz' 14" }}>
          Create New Property
        </h1>

        {/* Form Section */}
        <div className="mb-8">
          <h2 className="text-white text-[18px] font-['DM_Sans:SemiBold',_sans-serif] mb-6" style={{ fontVariationSettings: "'opsz' 14" }}>
            Property Name & Thumbnail
          </h2>

          <div className="grid grid-cols-2 gap-6">
            {/* Property Name Input */}
            <div>
              <label className="text-white text-[14px] font-['DM_Sans:Medium',_sans-serif] mb-3 block" style={{ fontVariationSettings: "'opsz' 14" }}>
                Property Name
              </label>
              <input
                type="text"
                value={propertyName}
                onChange={(e) => setPropertyName(e.target.value)}
                placeholder="eg. smith villa"
                className="w-full bg-[#01255e] border-2 border-[#013280] rounded-lg px-4 py-3 text-white placeholder:text-[#676a73] text-[14px] font-['DM_Sans:Regular',_sans-serif] focus:outline-none focus:border-[#3e88f7] transition-colors"
                style={{ fontVariationSettings: "'opsz' 14" }}
              />
            </div>

            {/* Thumbnail Photo Upload */}
            <div>
              <label className="text-white text-[14px] font-['DM_Sans:Medium',_sans-serif] mb-3 block" style={{ fontVariationSettings: "'opsz' 14" }}>
                Thumbnail Photo <span className="text-[#676a73]">(.png, .jpg, .jpeg supported)</span>
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept=".png,.jpg,.jpeg"
                  onChange={handleFileChange}
                  className="hidden"
                  id="thumbnail-upload"
                />
                <label
                  htmlFor="thumbnail-upload"
                  className="w-full bg-[#01255e] border-2 border-[#013280] rounded-lg px-4 py-3 text-white text-[14px] font-['DM_Sans:Regular',_sans-serif] flex items-center gap-3 cursor-pointer hover:border-[#3e88f7] transition-colors"
                  style={{ fontVariationSettings: "'opsz' 14" }}
                >
                  <span className="bg-[#3e88f7] hover:bg-[#5296f8] text-white px-4 py-1.5 rounded text-[13px] font-['DM_Sans:SemiBold',_sans-serif] transition-colors" style={{ fontVariationSettings: "'opsz' 14" }}>
                    Choose File
                  </span>
                  <span className="text-[#676a73]">
                    {fileName || 'No file chosen'}
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Create Button */}
        <div className="flex justify-center mt-12">
          <button
            onClick={handleSubmit}
            disabled={!propertyName.trim()}
            className="bg-[#3e88f7] hover:bg-[#5296f8] text-white px-12 py-4 rounded-lg text-[16px] font-['DM_Sans:SemiBold',_sans-serif] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ fontVariationSettings: "'opsz' 14" }}
          >
            Create New Property
          </button>
        </div>
      </div>
    </div>
  );
}
