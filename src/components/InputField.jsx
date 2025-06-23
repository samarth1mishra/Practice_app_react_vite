import React from 'react';
const InputField = ({ label, type = "text", value, onChange, required = false, options = null, disabled = false }) => (
  <div className="mb-3">
    <label className="block text-sm md:text-base font-medium mb-1 text-gray-700 dark:text-gray-300">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {options ? (
      <select value={value} onChange={onChange} disabled={disabled} className="w-full p-2 text-sm md:text-base border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
        <option value="">Select {label}</option>
        {options.map((option, index) => (
          <option key={index} value={option.value || option}>
            {option.label || option}
          </option>
        ))}
      </select>
    ) : (
      <input type={type} value={value} onChange={onChange} disabled={disabled} className="w-full p-2 text-sm md:text-base border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"/>
    )}
  </div>
);

export default InputField;