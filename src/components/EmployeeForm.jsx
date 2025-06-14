import { motion, AnimatePresence } from 'framer-motion';
import {useState} from 'react'
import {FaUser,FaUndo,FaMobileAlt,FaEnvelope,FaHome,FaCalendarAlt,FaVenusMars,FaBuilding,FaIdCard,FaBriefcase,FaUsers,FaUniversity,FaRegMoneyBillAlt,FaUserCircle} from 'react-icons/fa';
import { FiUser, FiBriefcase, FiCreditCard } from 'react-icons/fi';
import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Modal=({isOpen,title,description,onConfirm,onCancel,confirmText,cancelText})=>(
  <AnimatePresence>
    {isOpen &&(
      <motion.div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <motion.div  className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-md w-full p-6 m-2" initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}>
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">{title}</h2>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-6">{description}</p>
          <div className="flex justify-end space-x-4">
          <button onClick={onCancel} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg shadow hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 transition">{cancelText || 'Cancel'}</button>
          <button onClick={onConfirm} className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition">{confirmText||'Confirm'}</button>
        </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
)
const LabelInput=({label,icon,required,...props})=>{
    return (
    <div className="flex flex-col gap-1">
    <label className="mb-1 text-sm font-semibold text-gray-700 dark:text-gray-300 ">
        {label}{required && <span className="text-red-500 ml-1">*</span>}
    </label>
    <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
    {icon && <span className="text-gray-500 dark:text-gray-300">{icon}</span>}
    <input {...props} className="bg-transparent w-full text-sm text-gray-800 dark:text-white focus:outline-none"></input>
    </div>
    </div>
    )
}
const Section =({icon:Icon,title,children})=>{
    return (
    <div className="mb-6">
      <div className="flex items-center space-x-2 mb-4 text-lg font-semibold text-gray-800 dark:text-gray-100">
        <Icon className="text-blue-600" size={20} />
        <span>{title}</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{children}</div>
    </div>
    )
}

export const EmployeeForm=()=>{
    const initialState={firstName:'',middleName:'',lastName:'',mainMobile:'',emergencyMobile:'',email:'',address:'',dob:'',gender:'',maritalStatus:'',employeeId:'',jobTitle:'',department:'',reportingHead:'',assistantHead:'',employeeType:'',joiningDate:'',confirmationDate:'',bankName:'',accountNumber:'',ifsc:'',accountHolder:'' }
    const [formData,setFormData]=useState({firstName:'',middleName:'',lastName:'',mainMobile:'',emergencyMobile:'',email:'',address:'',dob:'',gender:'',maritalStatus:'',employeeId:'',jobTitle:'',department:'',reportingHead:'',assistantHead:'',employeeType:'',joiningDate:'',confirmationDate:'',bankName:'',accountNumber:'',ifsc:'',accountHolder:'' });
    const [emergencyEdited,setEmergencyEdited]=useState(false);
    const [profilePic,setProfilePic]=useState(localStorage.getItem("profileImage")||null);
    const [showSubmitModal, setShowSubmitModal] = useState(false)
    const [showResetModal, setShowResetModal] = useState(false)
    const EmployeeType=()=>{
        return (
    <div className="flex flex-col">
    <label className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
        Employee Type <span className="text-red-500">*</span></label>
    <select  className="p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-800 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
    name="employeeType" value={formData.employeeType} onChange={handleChange}>
    <option value="">Select Type</option>
    <option value="Full-Time">Full-Time</option>
    <option value="Part-Time">Part-Time</option>
    <option value="Contract">Contract</option>
    </select>
    </div>
        );
}

const handleChange=(e)=>{
    const {name,value}=e.target;
    setFormData((prev)=>{
        let updated={...prev,[name]:value};
        if(name==='mainMobile' && !emergencyEdited){
            updated.emergencyMobile=value;
        }
        return updated;
    })
    if(name==='emergencyMobile'){
        setEmergencyEdited(true);
    }
}
const handleImageChange=(e)=>{
    const file=e.target.files[0];
    if(file){
        const sizeInMB=file.size/(1024*1024);
        if(sizeInMB>2){
        toast.error("Image size must be less than 2MB", {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
        });
        setProfilePic(null);
        localStorage.removeItem("profileImage");
        return;
        }
        const reader=new FileReader();
        reader.onload=()=>{
            setProfilePic(reader.result);
            localStorage.setItem("profileImage",reader.result);
        };
        reader.readAsDataURL(file);
    }
}
const handleSubmit=(e)=>{
    e.preventDefault();
    const today=new Date().toISOString().split('T')[0];
    if(formData.dob>today){
      setShowSubmitModal(false)
      alert('Date of Birth Cannot be in Future!!')  
        return;
    }
    if(!/^\d{10}$/.test(formData.mainMobile)){
        setShowSubmitModal(false)
        alert('Main Mobile must be a 10 digit Number.')
        return;
    }
    if(!/^\d{10}$/.test(formData.emergencyMobile)){
      setShowSubmitModal(false)
        alert('Emergency Mobile must be a 10 digit Number.')
        return;
    }
    if(!/^\d+$/.test(formData.accountNumber)){
      setShowSubmitModal(false)
        alert('Account Number should only contain digits.')
        return;
    }
    if(!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifsc)){
      setShowSubmitModal(false)
      alert('Invalid IFSC format.');
      return;
    }
    const isEmpty=Object.entries(formData).some(([key,value])=>key!=='middleName' && value.trim()==="");
    if(isEmpty){
      setShowSubmitModal(false)
        alert('All fields except Middle Name are to be Mandatorily filled');
        return;
    }
    console.log(formData);
    localStorage.setItem("employeeFormData",JSON.stringify(formData));
     toast.success('Form has been Submitted!',{
                position:'top-right',
                autoClose:1500,
                hideProgressBar:false,
                pauseOnHover:true,
                draggable:true,
                theme:'colored',
            })
            resetForm();
            setShowSubmitModal(false)
}
const resetForm = () => {
    setFormData({...initialState});
    setEmergencyEdited(false);
    setProfilePic(null);
    setShowResetModal(false);
    //localStorage.removeItem("profileImage");
  };
    return (
      <>
      <ToastContainer/>
        <form onSubmit={(e)=>{
        e.preventDefault();
        setShowSubmitModal(true);
        }
        } className='space-y-8 text-sm max-w-4xl mx-auto'>
            <div className="flex flex-col items-center gap-2">
  <label className="text-base font-semibold text-gray-700 dark:text-gray-300">Upload Profile Pic</label>
  <label htmlFor="profile-upload" className="relative group w-32 h-32 rounded-full border-4 border-blue-500 overflow-hidden shadow-md cursor-pointer transition-transform hover:scale-105">
    {profilePic ? (
      <img src={profilePic} alt="Profile Preview" className="w-full h-full  rounded-full"/>
    ):(
      <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-300">
        <FaUser className="text-4xl" />
      </div>
    )}
    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <span className="text-white text-xs font-semibold">Click to Upload</span>
    </div>
  </label>
  <input id="profile-upload" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
  <p className="text-xs text-gray-500 dark:text-gray-400 text-center">Image must be less than 3MB</p>
</div>
        <Section icon={FiUser} title="Personal Details">
        <LabelInput required label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Enter first name" icon={<FaUser />} />
        <LabelInput label="Middle Name" name="middleName" value={formData.middleName} onChange={handleChange} placeholder="(Optional)" icon={<FaUser />} />
        <LabelInput required label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Enter last name" icon={<FaUser />} />
        <LabelInput required label="Main Mobile" name="mainMobile" value={formData.mainMobile} onChange={handleChange} placeholder="10-digit number" type="tel" icon={<FaMobileAlt />} />
        <LabelInput required label="Emergency Mobile" name="emergencyMobile" value={formData.emergencyMobile} onChange={handleChange} placeholder="10-digit number" type="tel" icon={<FaMobileAlt />} />
        <LabelInput required label="Email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" type="email" icon={<FaEnvelope />} />
        <LabelInput required label="Address" name="address" value={formData.address} onChange={handleChange} placeholder="Current address" icon={<FaHome />} />
        <LabelInput required label="Date of Birth" type="date" name="dob" value={formData.dob} onChange={handleChange} icon={<FaCalendarAlt />} />
        <LabelInput required label="Gender" name="gender" value={formData.gender} onChange={handleChange} placeholder="Male/Female/Other" icon={<FaVenusMars />} />
        <LabelInput required label="Marital Status" name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} placeholder="Single/Married" icon={<FaVenusMars />} />
        </Section>

        <Section icon={FiBriefcase} title="Employee Details">
        <LabelInput required label="Employee ID" name="employeeId" value={formData.employeeId} onChange={handleChange} placeholder="e.g., EMP123" icon={<FaIdCard />} />
        <LabelInput required label="Job Title" name="jobTitle" value={formData.jobTitle} onChange={handleChange} placeholder="e.g., Intern" icon={<FaBriefcase />} />
        <LabelInput required label="Department" name="department" value={formData.department} onChange={handleChange} placeholder="e.g., Development" icon={<FaBuilding />} />
        <LabelInput required label="Reporting Head" name="reportingHead" value={formData.reportingHead} onChange={handleChange} placeholder="Manager name" icon={<FaUsers />} />
        <LabelInput label="Assistant Reporting Head" name="assistantHead" value={formData.assistantHead} onChange={handleChange} placeholder="(If any)" icon={<FaUsers />} />
        <EmployeeType />
        <LabelInput required label="Joining Date" type="date" name="joiningDate" value={formData.joiningDate} onChange={handleChange} icon={<FaCalendarAlt />} />
        <LabelInput required label="Confirmation Date" type="date" name="confirmationDate" value={formData.confirmationDate} onChange={handleChange} icon={<FaCalendarAlt />} />
        </Section>

        <Section icon={FiCreditCard} title="Bank Details">
        <LabelInput required label="Bank Name" name="bankName" value={formData.bankName} onChange={handleChange} placeholder="e.g., SBI" icon={<FaUniversity />} />
        <LabelInput required label="Account Number" name="accountNumber" value={formData.accountNumber} onChange={handleChange} placeholder="Only digits" type="text" icon={<FaRegMoneyBillAlt />} />
        <LabelInput required label="IFSC Code" name="ifsc" value={formData.ifsc} onChange={handleChange} placeholder="e.g., SBIN0001234" icon={<FaRegMoneyBillAlt />} />
        <LabelInput required label="Account Holder Name" name="accountHolder" value={formData.accountHolder} onChange={handleChange} placeholder="Name as per bank" icon={<FaUserCircle />} />
        </Section>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3">
          <p className="text-sm text-red-500">* indicates required field</p>
          <button type="Submit" className=" px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"> Submit</button>
          <button type="button" onClick={()=>setShowResetModal(true)} className="bg-gray-400 text-white px-6 py-3 rounded-lg hover:bg-gray-500 flex items-center justify-center gap-2"><FaUndo /> Reset</button>
        </div>
        </form>
        <Modal isOpen={showSubmitModal} title="Confirm Submission" description="Are you sure you want to submit the form? Please review all details before proceeding." confirmText="Yes, Submit" cancelText="Cancel" onConfirm ={handleSubmit} onCancel={() => setShowSubmitModal(false)}/>
         <Modal isOpen={showResetModal} title="Confirm Reset" description="This will clear all entered data. Are you sure you want to reset the form?"  confirmText="Yes, Reset" cancelText="Keep Data" onConfirm={resetForm} onCancel={() => setShowResetModal(false)}/>
        </>
    )
}
