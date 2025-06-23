import React, { useState, useEffect, useMemo } from 'react';
import { Plus, Edit2, Trash2, Eye, Upload, X, ChevronDown } from 'lucide-react';
import InputField from './InputField';
const generateId = (prefix, list) => {
  const nextIndex = list.length + 1;
  return `${prefix}${nextIndex.toString().padStart(5, '0')}`;
};

const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});

export default function EmployeesTab({ departments, designations }) {
  const [employees, setEmployees] = useState(() => {
    const savedEmployees = sessionStorage.getItem('employeesData');
    return savedEmployees ? JSON.parse(savedEmployees) : [];
  });
  
  const [showEmployeeForm, setShowEmployeeForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [sortBy, setSortBy] = useState('');
  const [filterBy, setFilterBy] = useState('');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    sessionStorage.setItem('employeesData', JSON.stringify(employees));
  }, [employees]);

  const initialEmployeeForm = {
    fullName: '',
    dateOfBirth: '',
    gender: '',
    bloodGroup: '',
    fatherName: '',
    motherName: '',
    officialEmail: '',
    personalEmail: '',
    altPersonalEmail: '',
    contactNumber: '',
    altContactNumber: '',
    emergencyNumber: '',
    aadharNumber: '',
    panNumber: '',
    maritalStatus: '',
    currentAddress: '',
    sameAddress: false,
    permanentAddress: '',
    employmentType: '',
    employeeId: '',
    employeeType: '',
    dateOfJoining: '',
    period: '',
    department: '',
    designation: '',
    reportingHead: '',
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    accountHolderName: '',
    previousEmployerName: '',
    previousDesignation: '',
    previousAnnualCTC: '',
    previousMonthlySalary: '',
    uanNumber: '',
    esicNumber: '',
    password: '',
    confirmPassword: '',
    isActive: true,
    photo: null,
    documents: [] 
  };

  const [employeeForm, setEmployeeForm] = useState({ ...initialEmployeeForm });

  // Memoized designations list
  const filteredDesignations = useMemo(() => {
    if (!employeeForm.department) return [];
    return designations
      .filter(des => des.department === employeeForm.department)
      .map(des => des.designation);
  }, [employeeForm.department, designations]);

  // Track window size for responsive design
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (employeeForm.employmentType) {
      const prefix = employeeForm.employmentType === 'Internship' ? 'ESIRN' : 'ES';
      const relevantEmployees = employees.filter(emp => 
        emp.employment极Type === employeeForm.employmentType
      );
      const newId = generateId(prefix, relevantEmployees);
      setEmployeeForm(prev => ({ ...prev, employeeId: newId }));
    }
  }, [employeeForm.employmentType, employees]);

  // Responsive table columns
  const getVisibleColumns = () => {
    if (windowWidth < 640) return ['name', 'actions'];
    if (windowWidth < 768) return ['type', 'name', 'status', 'actions'];
    if (windowWidth < 1024) return ['type', 'name', 'designation', 'status', 'actions'];
    return ['type', 'id', 'name', 'designation', 'joinDate', 'status', 'actions'];
  };

  const addEmployee = async () => {
    if (employeeForm.fullName && employeeForm.employmentType) {
      // Convert photo to base64 if it's a file
      let photoBase64 = employeeForm.photo;
      if (employeeForm.photo instanceof Blob) {
        photoBase64 = await toBase64(employeeForm.photo);
      }

      // Convert document files to base64
      const documentsWithBase64 = await Promise.all(
        employeeForm.documents.map(async doc => {
          if (doc.file instanceof Blob) {
            const fileBase64 = await toBase64(doc.file);
            return { ...doc, file: fileBase64 };
          }
          return doc;
        })
      );

      const newEmployee = { 
        ...employeeForm,
        id: Date.now(),
        photo: photoBase64,
        documents: documentsWithBase64
      };
      
      const newEmployees = [...employees, newEmployee];
      setEmployees(newEmployees);
      resetEmployeeForm();
      setShowEmployeeForm(false);
    }
  };

  const updateEmployee = async () => {
    // Convert photo to base64 if it's a file
    let photoBase64 = employeeForm.photo;
    if (employeeForm.photo instanceof Blob) {
      photoBase64 = await toBase64(employeeForm.photo);
    }

    // Convert document files to base64
    const documentsWithBase64 = await Promise.all(
      employeeForm.documents.map(async doc => {
        if (doc.file instanceof Blob) {
          const fileBase64 = await toBase64(doc.file);
          return { ...doc, file: fileBase64 };
        }
        return doc;
      })
    );

    const updatedEmployees = [...employees];
    updatedEmployees[editingIndex] = { 
      ...employeeForm,
      photo: photoBase64,
      documents: documentsWithBase64
    };
    
    setEmployees(updatedEmployees);
    resetEmployeeForm();
    setShowEmployeeForm(false);
    setEditingIndex(-1);
  };

  const deleteEmployee = (id) => {
    const newEmployees = employees.filter(emp => emp.id !== id);
    setEmployees(newEmployees);
  };

  const editEmployee = (index) => {
    const employeeToEdit = employees[index];
    const cleanEmployee = JSON.parse(JSON.stringify(employeeToEdit));
    
    setEmployeeForm({
      ...cleanEmployee,
      documents: cleanEmployee.documents || []
    });
    setEditingIndex(index);
    setShowEmployeeForm(true);
  };

  const resetEmployeeForm = () => {
    setEmployeeForm({ ...initialEmployeeForm });
  };
  const addDocument = () => {
    if (employeeForm.documents.length < 20) {
      setEmployeeForm(prev => ({
        ...prev,
        documents: [...prev.documents, { id: Date.now(), name: '', file: null }]
      }));
    }
  };
  const updateDocument = (id, field, value) => {
    setEmployeeForm(prev => ({
      ...prev,
      documents: prev.documents.map(doc =>
        doc.id === id ? { ...doc, [field]: value } : doc
      )
    }));
  };
  const removeDocument = (id) => {
    setEmployeeForm(prev => ({
      ...prev,
      documents: prev.documents.filter(doc => doc.id !== id)
    }));
  };
  const filteredAndSortedEmployees = () => {
    let filtered = employees;
    
    if (filterBy) {
      filtered = employees.filter(emp => 
        filterBy === 'active' ? emp.isActive : 
        filterBy === 'inactive' ? !emp.isActive :
        emp.employmentType === filterBy
      );
    }
    if (sortBy) {
      filtered.sort((a, b) => {
        if (sortBy === 'employmentType') return a.employmentType.localeCompare(b.employmentType);
        if (sortBy === 'status') return (a.isActive === b.isActive) ? 0 : a.isActive ? -1 : 1;
        return 0;
      });
    }
    return filtered;
  };
  const visibleColumns = getVisibleColumns();
  return (
    <div className="space-y-4 md:space-y-6">
      {!showEmployeeForm ? (
        <>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-900 dark:text-white">
              Employees
            </h2>
            <div className="flex flex-col xs:flex-row gap-2 w-full md:w-auto">
              <button
                onClick={() => setShowEmployeeForm(true)}
                className="bg-blue-600 dark:bg-blue-700 text-white px-3 py-2 rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 flex items-center justify-center gap-1 md:gap-2 text-sm md:text-base"
              >
                <Plus className="w-4 h-4" />
                <span>Add Employee</span>
              </button>
              
              <div className="flex gap-2">
                <div className="relative w-full">
                  <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="pl-3 pr-8 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md w-full appearance-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white" >
                    <option value="">Sort By</option>
                    <option value="employmentType">Employment Type</option>
                    <option value="status">Status</option>
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-2 top-2.5 text-gray-400 dark:text-gray-300 pointer-events-none" />
                </div>
                <div className="relative w-full">
                  <select
                    value={filterBy}
                    onChange={(e) => setFilterBy(e.target.value)}
                    className="pl-3 pr-8 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md w-full appearance-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="">Filter By</option>
                    <option value="Internship">Internship</option>
                    <option value="Full Time Employee">Full Time</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-2 top-2.5 text-gray-400 dark:text-gray极-300 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm md:text-base">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    {visibleColumns.includes('type') && (
                      <th className="px-3 py-2.5 text-left font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Type
                      </th>
                    )}
                    {visibleColumns.includes('id') && (
                      <th className="px-3 py-2.5 text-left font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        ID
                      </th>
                    )}
                    {visibleColumns.includes('name') && (
                      <th className="px-3 py-2.5 text-left font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Name
                      </th>
                    )}
                    {visibleColumns.includes('designation') && (
                      <th className="px-3 py-2.5 text-left font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Designation
                      </th>
                    )}
                    {visibleColumns.includes('joinDate') && (
                      <th className="px-3 py-2.5 text-left font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Join Date
                      </th>
                    )}
                    {visibleColumns.includes('status') && (
                      <th className="px-3 py-2.5 text-left font-medium text-gray-500 dark:text极gray-300 uppercase tracking-wider">
                        Status
                      </th>
                    )}
                    <th className="px-3 py-2.5 text-left font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredAndSortedEmployees().map((employee) => (
                    <tr key={employee.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      {visibleColumns.includes('type') && (
                        <td className="px-3 py-3 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded ${employee.employmentType === 'Internship'? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100'   : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'}`}>
                            {employee.employmentType === 'Internship' ? 'Intern' : 'Full-time'}
                          </span>
                        </td>
                      )}
                      {visibleColumns.includes('id') && (
                        <td className="px-3 py-3 whitespace-nowrap font-mono text-xs md:text-sm text-gray-900 dark:text-white">
                          {employee.employeeId}
                        </td>
                      )}
                      {visibleColumns.includes('name') && (
                        <td className="px-3 py-3 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          {employee.fullName}
                        </td>
                      )}
                      {visibleColumns.includes('designation') && (
                        <td className="px-3 py-3 whitespace-nowrap text-gray-900 dark:text-gray-300">
                          {employee.designation}
                        </td>
                      )}
                      {visibleColumns.includes('joinDate') && (
                        <td className="px-3 py-3 whitespace-nowrap text-gray-900 dark:text-gray-300">
                          {new Date(employee.dateOfJoining).toLocaleDateString()}
                        </td>
                      )}
                      {visibleColumns.includes('status') && (
                        <td className="px-3 py-3 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${employee.isActive? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'   : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100' }`}>
                            {employee.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                      )}
                      <td className="px-3 py-3 whitespace-nowrap">
                        <div className="flex gap-1 md:gap-2">
                          <button onClick={() => alert(`Viewing details for ${employee.fullName}`)} className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 p-1" title="View">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button onClick={() => editEmployee(employees.findIndex(emp => emp.id === employee.id))} className="text-yellow-600 hover:text-yellow-900 dark:text-yellow-400 dark:hover:text-yellow-300 p-1" title="Edit" >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button onClick={() => deleteEmployee(employee.id)} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 p-1" title="Delete" >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {filteredAndSortedEmployees().length === 0 && (
                <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                  No employees found
                </div>
              )}
            </div>
            <div className="bg-white dark:bg-gray-800 px-3 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700">
              <div className="flex-1 flex justify-between sm:hidden">
                <button className="relative inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  Previous
                </button>
                <button className="ml-2 relative inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Showing <span className="font-medium">1</span> to <span className="font-medium">{Math.min(10, employees.length)}</span> of{' '}
                    <span className="font-medium">{employees.length}</span> results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <span className="sr-only">Previous</span>
                      <ChevronDown className="h-4 w-4 transform rotate-90" aria-hidden="true" />
                    </button>
                    <button className="relative inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600">
                      1
                    </button>
                    <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <span className="sr-only">Next</span>
                      <ChevronDown className="h-4 w-4 transform -rotate-90" aria-hidden="true" />
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-3 md:p-4 lg:p-6">
          <div className="flex justify-between items-center mb-4 md:mb-6">
            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-900 dark:text-white">
              {editingIndex >= 0 ? 'Edit Employee' : 'Add Employee'}
            </h2>
            <button onClick={() =>{setShowEmployeeForm(false); resetEmployeeForm(); setEditingIndex(-1);}} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 p-1" >
              <X className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>

          <form className="space-y-4 md:space-y-6" onSubmit={async (e) => {e.preventDefault();if (editingIndex >= 0) {await updateEmployee();} else {await addEmployee();}}}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm md:text-base font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Photo
                </label>
                <div className="flex items-center gap-3">
                  {employeeForm.photo ? (
                    <div className="relative">
                      <img src={typeof employeeForm.photo === 'string'? employeeForm.photo:employeeForm.photo instanceof Blob?URL.createObjectURL(employeeForm.photo): ''} alt="Preview" className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border dark:border-gray-600"/>
                      <button type="button" onClick={() => setEmployeeForm(prev => ({ ...prev, photo: null }))} className="absolute -top-1 -right-1 bg-red-500 rounded-full p-0.5 text-white">
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-full w-16 h-16 md:w-20 md:h-20 cursor-pointer">
                      <Upload className="w-5 h-5 text-gray-400" />
                      <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">Upload</span>
                      <input type="file" accept="image/*"className="hidden"onChange={(e) => {if (e.target.files && e.target.files[0]) {setEmployeeForm(prev => ({...prev,photo: e.target.files[0]}));}}} />
                    </label>
                  )}
                </div>
              </div>
              <div className="md:col-span-2">
                <h3 className="text-base md:text-lg font-medium mb-3 text-blue-600 dark:text-blue-400 border-b pb-2 border-gray-200 dark:border-gray-700">
                  Employment Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:极gap-4">
                  <InputField label="Employment Type" value={employeeForm.employmentType} onChange={(e) => setEmployeeForm(prev => ({ ...prev, employmentType: e.target.value }))} options={['Internship', 'Full Time Employee']} required />
                  <InputField label="Employee ID" value={employeeForm.employeeId} onChange={() => {}} disabled />
                  <InputField label="Full Name" value={employeeForm.fullName} onChange={(e) => setEmployeeForm(prev => ({ ...prev, fullName: e.target.value }))} required />
                  {employeeForm.employmentType === 'Full Time Employee' && (
                    <InputField label="Employee Type" value={employeeForm.employeeType} onChange={(e) => setEmployeeForm(prev => ({ ...prev, employeeType: e.target.value }))} options={['Fresher', 'Experienced']} />
                  )}
                  <InputField label="Date of Joining" type="date" value={employeeForm.dateOfJoining} onChange={(e) => setEmployeeForm(prev => ({ ...prev, dateOfJoining: e.target.value }))}/>
                  <InputField label="Period" value={employeeForm.period} onChange={(e) => setEmployeeForm(prev => ({ ...prev, period: e.target.value }))} options={['Probation', 'Confirmation']} />
                  <InputField label="Department" value={employeeForm.department} onChange={(e) => setEmployeeForm(prev => ({...prev,    department: e.target.value,   designation: ''}))}
                    options={departments.map(dept => dept.name)}
                  />
                  <InputField label="Designation" value={employeeForm.designation} onChange={(e) => setEmployeeForm(prev => ({ ...prev, designation: e.target.value }))} options={filteredDesignations} />
                  <InputField label="Reporting Head" value={employeeForm.reportingHead} onChange={(e) => setEmployeeForm(prev => ({ ...prev, reportingHead: e.target.value }))} options={employees.map(emp => ({ value: emp.employeeId, label: `${emp.fullName} (${emp.employeeId})` }))} />
                </div>
              </div>
              <div className="md:col-span-2">
                <h3 className="text-base md:text-lg font-medium mb-3 text-blue-600 dark:text-blue-400 border-b pb-2 border-gray-200 dark:border-gray-700">
                  Personal Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  <InputField label="Date of Birth" type="date" value={employeeForm.dateOfBirth} onChange={(e) => setEmployeeForm(prev => ({ ...prev, dateOfBirth: e.target.value }))} />
                  <InputField label="Gender" value={employeeForm.gender} onChange={(e) => setEmployeeForm(prev => ({ ...prev, gender: e.target.value }))} options={['Male', 'Female', 'Other']} />
                  <InputField label="Blood Group" value={employeeForm.bloodGroup} onChange={(e) => setEmployeeForm(prev => ({ ...prev, bloodGroup: e.target.value }))} />
                  <InputField label="Father's Name" value={employeeForm.fatherName} onChange={(e) => setEmployeeForm(prev => ({ ...prev, fatherName: e.target.value }))} />
                  <InputField label="Mother's Name" value={employeeForm.motherName} onChange={(e) => setEmployeeForm(prev => ({ ...prev, motherName: e.target.value }))} />
                  <InputField label="Official Email" type="email" value={employeeForm.officialEmail} onChange={(e) => setEmployeeForm(prev => ({ ...prev, officialEmail: e.target.value }))} />
                  <InputField label="Personal Email" type="email" value={employeeForm.personalEmail} onChange={(e) => setEmployeeForm(prev => ({ ...prev, personalEmail: e.target.value }))} />
                  <InputField label="Alternative Personal Email" type="email" value={employeeForm.altPersonalEmail} onChange={(e) => setEmployeeForm(prev => ({ ...prev, altPersonalEmail: e.target.value }))} />
                  <InputField label="Contact Number" value={employeeForm.contactNumber} onChange={(e) => setEmployeeForm(prev => ({ ...prev, contactNumber: e.target.value }))} />
                  <InputField label="Alternative Contact Number" value={employeeForm.altContactNumber} onChange={(e) => setEmployeeForm(prev => ({ ...prev, altContactNumber: e.target.value }))} />
                  <InputField label="Emergency Number" value={employeeForm.emergencyNumber} onChange={(e) => setEmployeeForm(prev => ({ ...prev, emergencyNumber: e.target.value }))} />
                  <InputField label="Aadhar Number" value={employeeForm.aadharNumber} onChange={(e) => setEmployeeForm(prev => ({ ...prev, aadharNumber: e.target.value }))} />
                  <InputField label="PAN Number" value={employeeForm.panNumber} onChange={(e) => setEmployeeForm(prev => ({ ...prev, panNumber: e.target.value }))} />
                  <InputField label="Marital Status" value={employeeForm.maritalStatus} onChange={(e) => setEmployeeForm(prev => ({ ...prev, maritalStatus: e.target.value }))} options={['Unmarried', 'Married', 'Divorced', 'Separated', 'Widow']} />
                </div>
                <div className="mt-4">
                  <label className="block text-sm md:text-base font-medium mb-1 text-gray-700 dark:text-gray-300">
                    Current Address
                  </label>
                  <textarea value={employeeForm.currentAddress} onChange={(e) => setEmployeeForm(prev => ({ ...prev, currentAddress: e.target.value }))} className="w-full p-2 text-sm md:text-base border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white" rows={3} />
                </div>
                <div className="mt-4 flex items-center">
                  <input type="checkbox" checked={employeeForm.sameAddress} onChange={(e) => setEmployeeForm(prev => ({...prev,sameAddress: e.target.checked,permanentAddress: e.target.checked ? prev.currentAddress : prev.permanentAddress }))} className="mr-2" id="sameAddress" />
                  <label htmlFor="sameAddress" className="text-sm md:text-base text-gray-700 dark:text-gray-300">
                    Same as current address
                  </label>
                </div>
                
                {!employeeForm.sameAddress && (
                  <div className="mt-4">
                    <label className="block text-sm md:text-base font-medium mb-1 text-gray-700 dark:text-gray-300">
                      Permanent Address
                    </label>
                    <textarea value={employeeForm.permanentAddress} onChange={(e) => setEmployeeForm(prev => ({ ...prev, permanentAddress: e.target.value }))} className="w-full p-2 text-sm md:text-base border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white" rows={3}/>
                  </div>
                )}
              </div>
              <div className="md:col-span-2">
                <h3 className="text-base md:text-lg font-medium mb-3 text-blue-600 dark:text-blue-400 border-b pb-2 border-gray-200 dark:border-gray-700">
                  Bank Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  <InputField label="Bank Name" value={employeeForm.bankName} onChange={(e) => setEmployeeForm(prev => ({ ...prev, bankName: e.target.value }))}/>
                  <InputField label="Account Number" value={employeeForm.accountNumber} onChange={(e) => setEmployeeForm(prev => ({ ...prev, accountNumber: e.target.value }))}/>
                  <InputField label="IFSC Code" value={employeeForm.ifscCode} onChange={(e) => setEmployeeForm(prev => ({ ...prev, ifscCode: e.target.value }))}/>
                  <InputField label="Account Holder Name" value={employeeForm.accountHolderName} onChange={(e) => setEmployeeForm(prev => ({ ...prev, accountHolderName: e.target.value }))}/>
                </div>
              </div>
              {employeeForm.employmentType === 'Full Time Employee' && 
                employeeForm.employeeType === 'Experienced' && (
                <div className="md:col-span-2">
                  <h3 className="text-base md:text-lg font-medium mb-3 text-blue-600 dark:text-blue-400 border-b pb-2 border-gray-200 dark:border-gray-700">
                    Previous Employment Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                    <InputField label="Previous Employer's Name"  value={employeeForm.previousEmployerName}  onChange={(e) => setEmployeeForm(prev => ({ ...prev, previousEmployerName: e.target.value }))}/>
                    <InputField label="Previous Designation" value={employeeForm.previousDesignation} onChange={(e) => setEmployeeForm(prev => ({ ...prev, previousDesignation: e.target.value }))} />
                    <InputField label="Previous Annual CTC" value={employeeForm.previousAnnualCTC} onChange={(e) => setEmployeeForm(prev => ({ ...prev, previousAnnualCTC: e.target.value }))} />
                    <InputField label="Previous Monthly Salary" value={employeeForm.previousMonthlySalary} onChange={(e) => setEmployeeForm(prev => ({ ...prev, previousMonthlySalary: e.target.value }))} />
                    <InputField label="UAN Number" value={employeeForm.uanNumber} onChange={(e) => setEmployeeForm(prev => ({ ...prev, uanNumber: e.target.value }))} />
                    <InputField label="ESIC Number" value={employeeForm.esicNumber} onChange={(e) => setEmployeeForm(prev => ({ ...prev, esicNumber: e.target.value }))} />
                  </div>
                </div>
              )}
              <div className="md:col-span-2">
                <h3 className="text-base md:text-lg font-medium mb-3 text-blue-600 dark:text-blue-400 border-b pb-2 border-gray-200 dark:border-gray-700">
                  Documents
                </h3>
                <div className="space-y-3">
                  {employeeForm.documents.map((doc) => (
                    <div key={doc.id} className="flex flex-col md:flex-row items-start gap-3 p-3 border border-gray-300 dark:border-gray-600 rounded-md">
                      <div className="flex-1 w-full space-y-2">
                        <input type="text" value={doc.name} onChange={(e) => updateDocument(doc.id, 'name', e.target.value)} placeholder="Document Name" className="w-full p-2 text-sm md:text-base border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"/>
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
                          <input type="file" accept=".pdf" onChange={(e) => updateDocument(doc.id, 'file', e.target.files[0])} className="text-sm w-full"/>
                          {doc.file && (
                            <span className="text-sm text-gray-500 dark:text-gray-400 truncate">
                              {doc.file.name || "File selected"}
                            </span>
                          )}
                        </div>
                      </div>
                      <button type="button" onClick={() => removeDocument(doc.id)} className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 mt-2 md:mt-0 p-1">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                  <button type="button" onClick={addDocument} disabled={employeeForm.documents.length >= 20} className={`flex items-center gap-2 text-sm md:text-base ${   employeeForm.documents.length >= 20      ? 'text-gray-400 dark:text-gray-500 cursor-not-allowed':'text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300' }`}>
                    <Plus className="w-4 h-4" />
                    Add Document {employeeForm.documents.length >= 20 && "(Max 20 files)"}
                  </button>
                </div>
              </div>
              <div className="md:col-span-2">
                <h3 className="text-base md:text-lg font-medium mb-3 text-blue-600 dark:text-blue-400 border-b pb-2 border-gray-200 dark:border-gray-700">
                  Credentials
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <InputField label="Password" type="password" value={employeeForm.password} onChange={(e) => setEmployeeForm(prev => ({ ...prev, password: e.target.value }))} required={editingIndex === -1}/>
                    {employeeForm.password && employeeForm.password.length < 8 && (
                      <p className="text-red-500 text-sm">Password must be at least 8 characters</p>
                    )}
                  </div>
                  <div>
                    <InputField label="Confirm Password" type="password" value={employeeForm.confirmPassword} onChange={(e) => setEmployeeForm(prev => ({ ...prev, confirmPassword: e.target.value }))} required={editingIndex === -1} />
                    {employeeForm.confirmPassword && 
                    employeeForm.password !== employeeForm.confirmPassword && (
                      <p className="text-red-500 text-sm">Passwords do not match</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="block text-sm md:text-base font-medium text-gray-700 dark:text-gray-300">
                      Status:
                    </label>
                    <div className="relative inline-block w-10 mr-2 align-middle select-none">
                      <input type="checkbox"checked={employeeForm.isActive}onChange={(e) => setEmployeeForm(prev => ({ ...prev, isActive: e.target.checked }))}className="sr-only"id="statusToggle"
                      />
                      <label htmlFor="statusToggle"className={`block overflow-hidden h-6 rounded-full cursor-pointer ${  employeeForm.isActive     ? 'bg-blue-500 dark:bg-blue-600'     : 'bg-gray-300 dark:bg-gray-600'}`} >
                        <span className={`block h-4 w-4 mt-1 rounded-full transform transition-transform bg-white ${  employeeForm.isActive ? 'translate-x-5' : 'translate-x-1'}`}/>
                      </label>
                    </div>
                    <span className="text-sm md:text-base text-gray-700 dark:text-gray-300">
                      {employeeForm.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button type="button" onClick={() => {   setShowEmployeeForm(false);   resetEmployeeForm();   setEditingIndex(-1); }} className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 text-sm md:text-base">
                Cancel
              </button>
              <button type="submit" disabled={   !employeeForm.fullName ||    !employeeForm.employmentType ||    (editingIndex === -1 && (     !employeeForm.password ||      employeeForm.password !== employeeForm.confirmPassword ||     employeeForm.password.length < 8   )) } className={`px-3 py-2 rounded-md text-sm md:text-base ${   !employeeForm.fullName ||    !employeeForm.employmentType ||    (editingIndex === -1 && (     !employeeForm.password ||      employeeForm.password !== employeeForm.confirmPassword ||     employeeForm.password.length < 8   ))     ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'     : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white' }`}>
                {editingIndex >= 0 ? 'Update Employee' : 'Add Employee'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}