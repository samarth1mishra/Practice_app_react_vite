import { useEffect, useState } from "react";
import {FiDownload,FiPrinter,FiMail,FiPhone,FiHome,FiBriefcase,FiDollarSign,FiFileText,} from "react-icons/fi";
const Spinner = ({ size = "md" }) => {
  const sizes = { sm: "w-5 h-5", md: "w-8 h-8", lg: "w-12 h-12" };
  return (
    <div className="flex justify-center">
      <div className={`animate-spin rounded-full border-t-2 border-b-2 border-blue-500 ${sizes[size]}`}></div>
    </div>
  );
};
export const EmployeeInternPanel = () => {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(()=>{
    const fetchEmployeeData=async()=>{
      try{
        const email=localStorage.getItem('currentUserEmail')?.toLowerCase();
        if(!email){
          setError('No email found in session');
          setLoading(false);
          return;
        }
        const savedEmployees=sessionStorage.getItem('employeesData');
        const employees=savedEmployees?JSON.parse(savedEmployees):[];
        const foundEmployee=employees.find(emp=>{
          const official=emp.officialEmail?.toLowerCase();
          const personal=emp.personalEmail?.toLowerCase();
          return official==email || personal==email;
        })
        if (!foundEmployee) {
          setError('No employee data associated with your email');
        } else {
          setEmployee(foundEmployee);
        }
      }catch(error){
        setError('Failed to load Profile Data');
        console.log(error);
      }finally{
        setLoading(false);
      }
    };
    fetchEmployeeData();
  },[]);

  const handlePrint = () => window.print();

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Spinner size="lg" />
      </div>
    );
  if (error)
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 max-w-full sm:max-w-2xl mx-auto">
        <div className="text-center py-8">
          <div className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-300 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiFileText className="w-8 h-8" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-2">
          There is No Profile in the Session Storage. Please LogIn as Admin and add Profile.
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden print:shadow-none print:rounded-none">
      <div className="flex flex-wrap justify-between items-center p-4 md:p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800 border-b">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Employee Profile
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            View and manage your professional information
          </p>
        </div>
        <div className="flex flex-wrap gap-2 mt-3 sm:mt-0 justify-end">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors text-gray-700 dark:text-gray-200"
          >
            <FiPrinter className="w-5 h-5" />
            <span className="hidden sm:inline">Print</span>
          </button>
        </div>
      </div>
      <div className="p-4 md:p-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 mb-8">
          <div className="relative">
            {employee.photo ? (
              <img
                src={employee.photo}
                alt="Employee"
                className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-lg"
              />
            ) : (
              <div className="bg-gray-200 border-2 border-dashed rounded-full w-24 h-24 md:w-32 md:h-32 flex items-center justify-center text-gray-400">
                <FiBriefcase className="w-12 h-12" />
              </div>
            )}
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                {employee.fullName}
              </h1>
              <div className="flex flex-wrap gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    employee.employmentType === "Internship"
                      ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100"
                      : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                  }`}
                >
                  {employee.employmentType}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    employee.isActive
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                  }`}
                >
                  {employee.isActive ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-gray-600 dark:text-gray-300">
              <div className="flex items-start gap-2">
                <FiBriefcase className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">{employee.designation}</p>
                  <p className="text-sm">{employee.department}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <FiDollarSign className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Employee ID</p>
                  <p className="text-sm font-mono">{employee.employeeId}</p>
                </div>
              </div>
              <div className="flex items-start gap-2 text-wrap">
                <FiMail className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Official Email</p>
                  <p className="text-sm break-all">{employee.officialEmail}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <FiPhone className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Contact</p>
                  <p className="text-sm">{employee.contactNumber || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-4 md:gap-6">
          <ProfileSection
            icon={<FiBriefcase className="w-5 h-5" />}
            title="Personal Details"
          >
            <Detail
              label="Date of Birth"
              value={employee.dateOfBirth || "N/A"}
            />
            <Detail label="Gender" value={employee.gender || "N/A"} />
            <Detail label="Blood Group" value={employee.bloodGroup || "N/A"} />
            <Detail
              label="Father's Name"
              value={employee.fatherName || "N/A"}
            />
            <Detail
              label="Mother's Name"
              value={employee.motherName || "N/A"}
            />
            <Detail
              label="Marital Status"
              value={employee.maritalStatus || "N/A"}
            />
            <Detail
              label="Aadhar Number"
              value={employee.aadharNumber || "N/A"}
            />
            <Detail label="PAN Number" value={employee.panNumber || "N/A"} />
          </ProfileSection>
          <ProfileSection
            icon={<FiPhone className="w-5 h-5" />}
            title="Contact Information"
          >
            <Detail
              label="Official Email"
              value={employee.officialEmail || "N/A"}
            />
            <Detail
              label="Personal Email"
              value={employee.personalEmail || "N/A"}
            />
            <Detail
              label="Contact Number"
              value={employee.contactNumber || "N/A"}
            />
            <Detail
              label="Alternative Contact"
              value={employee.altContactNumber || "N/A"}
            />
            <Detail
              label="Emergency Contact"
              value={employee.emergencyNumber || "N/A"}
            />
          </ProfileSection>
          <ProfileSection icon={<FiHome className="w-5 h-5" />} title="Address">
            <Detail
              label="Current Address"
              value={employee.currentAddress || "N/A"}
              multiline
            />
            <Detail
              label="Permanent Address"
              value={
                employee.sameAddress
                  ? "Same as current address"
                  : employee.permanentAddress || "N/A"
              }
              multiline
            />
          </ProfileSection>
          <ProfileSection
            icon={<FiBriefcase className="w-5 h-5" />}
            title="Employment Details"
          >
            <Detail
              label="Date of Joining"
              value={employee.dateOfJoining || "N/A"}
            />
            <Detail label="Period" value={employee.period || "N/A"} />
            <Detail
              label="Reporting Head"
              value={employee.reportingHead || "N/A"}
            />
          </ProfileSection>
          <ProfileSection
            icon={<FiDollarSign className="w-5 h-5" />}
            title="Bank Details"
          >
            <Detail label="Bank Name" value={employee.bankName || "N/A"} />
            <Detail
              label="Account Number"
              value={employee.accountNumber || "N/A"}
            />
            <Detail label="IFSC Code" value={employee.ifscCode || "N/A"} />
            <Detail
              label="Account Holder"
              value={employee.accountHolderName || "N/A"}
            />
          </ProfileSection>
          {employee.employmentType === "Full Time Employee" &&
            employee.employeeType === "Experienced" && (
              <ProfileSection
                icon={<FiBriefcase className="w-5 h-5" />}
                title="Previous Employment"
              >
                <Detail
                  label="Previous Employer"
                  value={employee.previousEmployerName || "N/A"}
                />
                <Detail
                  label="Designation"
                  value={employee.previousDesignation || "N/A"}
                />
                <Detail
                  label="Annual CTC"
                  value={employee.previousAnnualCTC || "N/A"}
                />
                <Detail
                  label="Monthly Salary"
                  value={employee.previousMonthlySalary || "N/A"}
                />
                <Detail
                  label="UAN Number"
                  value={employee.uanNumber || "N/A"}
                />
                <Detail
                  label="ESIC Number"
                  value={employee.esicNumber || "N/A"}
                />
              </ProfileSection>
            )}
          {employee.documents && employee.documents.length > 0 && (
            <ProfileSection
              icon={<FiFileText className="w-5 h-5" />}
              title="Documents"
              fullWidth
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-x-auto">
                {employee.documents.map((doc, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FiFileText className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 dark:text-gray-200">
                          {doc.name || `Document ${index + 1}`}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {doc.file ? "Ready to download" : "No file attached"}
                        </p>
                      </div>
                    </div>
                    {doc.file && (
                      <a href={doc.file} download={`${doc.name || "document"}.pdf`} className="flex items-center justify-centertext-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300p-2 sm:p-1.5rounded-lg sm:rounded-fullbg-blue-50 hover:bg-blue-100dark:bg-blue-900/30 dark:hover:bg-blue-900/50transition-colorsw-full sm:w-auto"title="Download document">
                        <FiDownload className="w-5 h-5 flex-shrink-0" />
                        <span className="ml-2 text-sm sm:hidden">Download</span>
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </ProfileSection>
          )}
        </div>
      </div>
    </div>
  );
};

const ProfileSection = ({ icon, title, children, fullWidth = false }) => (
  <div
    className={`bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 ${
      fullWidth ? "sm:col-span-2 xl:col-span-2" : ""
    }`}
  >
    <div className="flex items-center gap-3 mb-4 pb-2 border-b border-gray-200 dark:border-gray-600">
      <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 w-8 h-8 rounded-lg flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
        {title}
      </h3>
    </div>
    <div className="space-y-4">{children}</div>
  </div>
);

const Detail = ({ label, value, multiline = false }) => (
  <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 text-wrap">
    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 min-w-[140px]">
      {label}
    </dt>
    <dd className="flex-1 text-gray-800 dark:text-gray-200 sm:mt-0.5 break-words">
      {multiline ? (
        <p className="whitespace-pre-line ">{value}</p>
      ) : (
        <p>{value}</p>
      )}
    </dd>
  </div>
);
