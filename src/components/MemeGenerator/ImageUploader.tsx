import React, { useRef, useState } from 'react';
import { Upload, Image as ImageIcon, Globe } from 'lucide-react';

interface ImageUploaderProps {
  onImageSelect: (imageSrc: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [urlInput, setUrlInput] = useState('');

  // Popular meme templates
  const memeTemplates = [
    {
      name: 'Drake Pointing',
      url: 'https://i.imgflip.com/30b1gx.jpg'
    },
    {
      name: 'Distracted Boyfriend',
      url: 'https://i.imgflip.com/1ur9b0.jpg'
    },
    {
      name: 'Two Buttons',
      url: 'https://i.imgflip.com/1g8my4.jpg'
    },
    {
      name: 'Mocking SpongeBob',
      url: 'https://i.imgflip.com/1otk96.jpg'
    },
    {
      name: 'Change My Mind',
      url: 'https://i.imgflip.com/24y43o.jpg'
    },
    {
      name: 'This Is Fine',
      url: 'https://i.imgflip.com/26am.jpg'
    }
  ];

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          onImageSelect(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      onImageSelect(urlInput.trim());
      setUrlInput('');
    }
  };

  const handleTemplateSelect = (templateUrl: string) => {
    onImageSelect(templateUrl);
  };

  return (
    <div className="space-y-4">
      {/* File Upload */}
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          dragOver
            ? 'border-blue-400 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <Upload className="mx-auto mb-2 text-gray-400" size={32} />
        <p className="text-sm text-gray-600 mb-1">
          Click to upload or drag & drop
        </p>
        <p className="text-xs text-gray-500">
          JPG, PNG, GIF up to 10MB
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
          className="hidden"
        />
      </div>

      {/* URL Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Or paste image URL
        </label>
        <div className="flex gap-2">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
          <button
            onClick={handleUrlSubmit}
            disabled={!urlInput.trim()}
            className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Globe size={16} />
          </button>
        </div>
      </div>

      {/* Meme Templates */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Popular Templates
        </label>
        <div className="grid grid-cols-2 gap-2">
          {memeTemplates.map((template, index) => (
            <button
              key={index}
              onClick={() => handleTemplateSelect(template.url)}
              className="flex items-center gap-2 p-2 text-left bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:border-gray-400 transition-colors text-sm"
            >
              <ImageIcon size={16} className="text-gray-400 flex-shrink-0" />
              <span className="truncate">{template.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;