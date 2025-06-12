import { useState, useEffect } from 'react';
import {
  FiTrash2,
  FiDownload,
  FiClipboard,
  FiFileText,
  FiCheckCircle
} from 'react-icons/fi';

export const ViewFormData = () => {
  const [savedData, setSavedData] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const formData = localStorage.getItem('employeeFormData');
    const imageData = localStorage.getItem('profileImage');

    if (formData) setSavedData(JSON.parse(formData));
    if (imageData) setProfileImage(imageData); // base64 string
  }, []);

  const clearData = () => {
    localStorage.removeItem('employeeFormData');
    localStorage.removeItem('profileImage');
    setSavedData(null);
    setProfileImage(null);
    setMessage('All data cleared!');
    setTimeout(() => setMessage(''), 3000);
  };

  const getCombinedData = () => {
    return {
      ...savedData,
      profileImage: profileImage || null,
    };
  };

  const copyToClipboard = async () => {
    const combinedData = getCombinedData();
    if (!combinedData) return;

    try {
      const jsonString = JSON.stringify(combinedData, null, 2);
      await navigator.clipboard.writeText(jsonString);
      setMessage('JSON with profile pic copied to clipboard!');
    } catch (err) {
      console.error('Copy failed', err);
      setMessage('Failed to copy!');
    }
    setTimeout(() => setMessage(''), 3000);
  };

  const downloadJson = () => {
    const combinedData = getCombinedData();
    if (!combinedData) return;

    const jsonString = JSON.stringify(combinedData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'employeeFormData_with_image.json';
    a.click();
    URL.revokeObjectURL(url);

    setMessage('JSON (with profile pic) downloaded!');
    setTimeout(() => setMessage(''), 3000);
  };

  if (!savedData) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 bg-gradient-to-br from-blue-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 rounded-lg shadow-lg">
        <FiFileText className="text-6xl text-blue-400 dark:text-gray-600 mb-4 animate-pulse" />
        <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
          "Form is Not Submitted Yet! Please Submit It."
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-10 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-center justify-center mb-6 gap-4">
        <FiFileText className="text-3xl text-blue-700 dark:text-blue-300" />
        <h1 className="text-2xl md:text-3xl font-semibold text-blue-700 dark:text-blue-300">
          Details of the Form That is Submitted
        </h1>
      </div>

      {profileImage && (
        <div className="flex justify-center mb-6">
          <div className="flex flex-col items-center">
            <img
              src={profileImage}
              alt="Uploaded Profile"
              className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-lg object-cover transition duration-300 hover:scale-105"
            />
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Uploaded Profile Picture
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Object.entries(savedData).map(([key, value]) => (
          <div
            key={key}
            className="relative flex flex-col bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-lg transition duration-300 border border-blue-100 dark:border-gray-700"
          >
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-300 uppercase tracking-wide">
              {key.replace(/([A-Z])/g, ' $1')}
            </span>
            <span className="mt-1 text-gray-900 dark:text-gray-100 break-words text-sm">
              {value || '-'}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center mt-4">
        {message && (
          <div className="flex items-center gap-2 bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100 px-4 py-2 rounded-lg shadow animate-fade-in">
            <FiCheckCircle />
            <span>{message}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
        <button
          className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold rounded-xl shadow-md transition"
          onClick={copyToClipboard}
        >
          <FiClipboard className="text-lg" />
          <span className="text-sm sm:text-base">Copy JSON</span>
        </button>
        <button
          className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl shadow-md transition"
          onClick={downloadJson}
        >
          <FiDownload className="text-lg" />
          <span className="text-sm sm:text-base">Download JSON</span>
        </button>
        <button
          className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl shadow-md transition"
          onClick={clearData}
        >
          <FiTrash2 className="text-lg" />
          <span className="text-sm sm:text-base">Clear Data</span>
        </button>
      </div>
    </div>
  );
};
