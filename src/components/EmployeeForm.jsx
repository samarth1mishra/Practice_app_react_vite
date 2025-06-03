import {useState} from 'react'

const LabelInput=({label,...props})=>{
    return (
    <div className="flex flex-col">
    <label className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
    </label>
    <input {...props} className="p-2 border-gray-300 dark:border-gray-600 rounded-md bg-gray-200 dark:bg-gray-800 "></input>
    </div>
    )
}

export const EmployeeForm=()=>{
    const [formData,setFormData]=useState({firstName:'',middleName:'',lastName:'',mainMobile:'',emergencyMobile:'',email:'',address:'',dob:'',gender:'',maritalStatus:'',employeeId:'',jobTitle:'',department:'',reportingHead:'',assistantHead:'',employeeType:'',joiningDate:'',confirmationDate:'',bankName:'',accountNumber:'',ifsc:'',accountHolder:'' });
    const [emergencyEdited,setEmergencyEdited]=useState(false);
    const EmployeeType=()=>{
        return (
    <div className="flex flex-col">
    <label className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Employee Type</label>
    <select  className="p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
    name="employeeType" value={formData.employeeType} onChange={handleChange}>
    <option value="">Select Type</option>
    <option value="full-Time">Full-Time</option>
    <option value="part-Time">Part-Time</option>
    <option value="contract">Contract</option>
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
const handleSubmit=(e)=>{
    e.preventDefault();
    const today=new Date().toISOString().split('T')[0];
    if(formData.dob>today){
        alert('Date of Birth Cannot be in Future!!')
        return;
    }
    if(!/^\d{10}$/.test(formData.mainMobile)){
        alert('Main Mobile must be a 10 digit Number.')
        return;
    }
    if(!/^\d{10}$/.test(formData.emergencyMobile)){
        alert('Emergency Mobile must be a 10 digit Number.')
        return;
    }
    
    console.log(formData);
}
    return (
        <form onSubmit={handleSubmit} className='space-y-8 text-sm'>
        <fieldset className="p-4 border border-gray-300 dark:border-gray-600 rounded-md">
        <legend className="text-lg font-semibold mb-4">
            Personal Details
        </legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
          <LabelInput label="First Name" name="firstName" value={formData.firstName} onChange={handleChange}/>
          <LabelInput label="Middle Name" name="middleName" value={formData.middleName} onChange={handleChange}/>
          <LabelInput label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange}/>
          <LabelInput label="Main Mobile" name="mainMobile" value={formData.mainMobile} onChange={handleChange}/>
          <LabelInput label="Emergency Mobile" name="emergencyMobile" value={formData.emergencyMobile} onChange={handleChange}/>
          <LabelInput label="Email" name="email" value={formData.email} onChange={handleChange}/>
          <LabelInput label="Address" name="address" value={formData.address} onChange={handleChange}/>
          <LabelInput label="Date of Birth" type="date" name="dob" value={formData.dob} onChange={handleChange}/>
          <LabelInput label="Gender" name="gender" value={formData.gender} onChange={handleChange}/>
          <LabelInput label="Marital Status" name="maritalStatus" value={formData.maritalStatus} onChange={handleChange}/>
          </div>
        </fieldset>

        <fieldset className="p-4 border border-gray-300 dark:border-gray-600 rounded-md">
            <legend className="text-lg font-semibold mb-4">
                Employee Details
            </legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
            <LabelInput label="Employee ID" name="employeeId" value={formData.employeeId} onChange={handleChange}/>
            <LabelInput label="Job Title" name="jobTitle" value={formData.jobTitle} onChange={handleChange}/>
            <LabelInput label="Department" name="department" value={formData.department} onChange={handleChange}/>
            <LabelInput label="Reporting Head" name="reportingHead" value={formData.reportingHead} onChange={handleChange}/>
            <LabelInput label="Assistant Reporting Head" name="assistantHead" value={formData.assistantHead} onChange={handleChange}/>
            <EmployeeType/>
            <LabelInput label="Joining Date" type="date" name="joiningDate" value={formData.joiningDate} onChange={handleChange}/>
            <LabelInput label="Confirmation Date" type="date" name="confirmationDate" value={formData.confirmationDate} onChange={handleChange}/>
            </div>
        </fieldset>

        <fieldset className="p-4 border border-gray-300 dark:border-gray-600 rounded-md">
            <legend className="text-lg font-semibold mb-4">
              Bank Details  
            </legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
            <LabelInput label="Bank Name" name="bankName" value={formData.bankName} onChange={handleChange}/>
            <LabelInput label="Account Number" name="accountNumber" value={formData.accountNumber} onChange={handleChange}/>
            <LabelInput label="IFSC Code" name="ifsc" value={formData.ifsc} onChange={handleChange}/>
            <LabelInput label="Account Holder Name" name="accountHolder" value={formData.accountHolder} onChange={handleChange}/>
            </div>
        </fieldset>

        <div className="text-right">
          <button type="Submit" className="px-6 py-2 bg-blue-600 rounded hover:bg-blue-700 transition text-white"> Submit</button>
        </div>
        </form>
    )

}