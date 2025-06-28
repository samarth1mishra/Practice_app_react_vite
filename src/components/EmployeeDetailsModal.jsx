import { X } from "lucide-react";
export const EmployeeDetailsModal = ({ employee, onClose }) => {
  if (!employee) return null;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
const DocumentItem = ({ doc }) => (
  <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
    <div>
      <p className="font-medium text-gray-900 dark:text-white">{doc.name}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {doc.fileName || "File uploaded"}
      </p>
    </div>
    {doc.file && (
      <button 
        onClick={() => {
          if (typeof doc.file === 'string') {
            const link = document.createElement('a');
            link.href = doc.file;
            link.download = doc.fileName || 'document.pdf';
            link.click();
          } else if (doc.file instanceof Blob) {
            const url = URL.createObjectURL(doc.file);
            window.open(url, '_blank');
          }
        }} className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium">
        View
      </button>
    )}
  </div>
);
  const DetailSection = ({ title, children }) => (
    <div className="mb-6">
      <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
        {title}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
    </div>
  );
  const DetailItem = ({ label, value }) => (
    <div>
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
      <p className="text-gray-900 dark:text-white break-words">
        {value || "N/A"}
      </p>
    </div>
  );
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Employee Details
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
            {employee.photo ? (
              <img
                src={
                  typeof employee.photo === "string"
                    ? employee.photo
                    : URL.createObjectURL(employee.photo)
                }
                alt={employee.fullName}
                className="w-32 h-32 rounded-lg object-cover border"
              />
            ) : (
              <div className="bg-gray-200 dark:bg-gray-700 border-2 border-dashed rounded-xl w-32 h-32 flex items-center justify-center">
                <span className="text-gray-500 dark:text-gray-400">No Photo</span>
              </div>
            )}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {employee.fullName}
              </h1>
              <div className="flex flex-wrap gap-3 mb-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 rounded-full text-sm">
                  {employee.employeeId}
                </span>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100 rounded-full text-sm">
                  {employee.designation}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    employee.isActive
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                  }`}
                >
                  {employee.isActive ? "Active" : "Inactive"}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <DetailItem 
                  label="Department" 
                  value={employee.department} 
                />
                <DetailItem 
                  label="Reporting To" 
                  value={employee.reportingHead} 
                />
                <DetailItem 
                  label="Employment Type" 
                  value={employee.employmentType} 
                />
                <DetailItem 
                  label="Date of Joining" 
                  value={formatDate(employee.dateOfJoining)} 
                />
              </div>
            </div>
          </div>

          <DetailSection title="Personal Information">
            <DetailItem label="Date of Birth" value={formatDate(employee.dateOfBirth)} />
            <DetailItem label="Gender" value={employee.gender} />
            <DetailItem label="Blood Group" value={employee.bloodGroup} />
            <DetailItem label="Father's Name" value={employee.fatherName} />
            <DetailItem label="Mother's Name" value={employee.motherName} />
            <DetailItem label="Marital Status" value={employee.maritalStatus} />
            <DetailItem label="Aadhar Number" value={employee.aadharNumber} />
            <DetailItem label="PAN Number" value={employee.panNumber} />
          </DetailSection>

          <DetailSection title="Contact Information">
            <DetailItem label="Official Email" value={employee.officialEmail} />
            <DetailItem label="Personal Email" value={employee.personalEmail} />
            <DetailItem 
              label="Alt Personal Email" 
              value={employee.altPersonalEmail} 
            />
            <DetailItem label="Contact Number" value={employee.contactNumber} />
            <DetailItem 
              label="Alt Contact Number" 
              value={employee.altContactNumber} 
            />
            <DetailItem 
              label="Emergency Number" 
              value={employee.emergencyNumber} 
            />
            <DetailItem label="Current Address" value={employee.currentAddress} />
            <DetailItem 
              label="Permanent Address" 
              value={employee.permanentAddress} 
            />
          </DetailSection>

          <DetailSection title="Bank Details">
            <DetailItem label="Bank Name" value={employee.bankName} />
            <DetailItem label="Account Number" value={employee.accountNumber} />
            <DetailItem label="IFSC Code" value={employee.ifscCode} />
            <DetailItem 
              label="Account Holder Name" 
              value={employee.accountHolderName} 
            />
          </DetailSection>

          {employee.employmentType === "Full Time Employee" && 
            employee.employeeType === "Experienced" && (
            <DetailSection title="Previous Employment">
              <DetailItem 
                label="Employer Name" 
                value={employee.previousEmployerName} 
              />
              <DetailItem 
                label="Designation" 
                value={employee.previousDesignation} 
              />
              <DetailItem 
                label="Annual CTC" 
                value={employee.previousAnnualCTC} 
              />
              <DetailItem 
                label="Monthly Salary" 
                value={employee.previousMonthlySalary} 
              />
              <DetailItem label="UAN Number" value={employee.uanNumber} />
              <DetailItem label="ESIC Number" value={employee.esicNumber} />
            </DetailSection>
          )}

          <DetailSection title="Documents">
            {employee.documents && employee.documents.length > 0 ? (
              <div className="space-y-3 col-span-2">
                {employee.documents.map((doc) => (
                  <DocumentItem key={doc.id} doc={doc} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 col-span-2">
                No documents uploaded
              </p>
            )}
          </DetailSection>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetailsModal;