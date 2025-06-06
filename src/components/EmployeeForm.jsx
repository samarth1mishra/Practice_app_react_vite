import {useState} from 'react'

const LabelInput=({label,...props})=>{
    return (
    <div className="flex flex-col">
    <label className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
    </label>
    <input {...props} className="p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-800 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"></input>
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
    if(!/^\d+$/.test(formData.accountNumber)){
        alert('Account Number should only contain digits.')
        return;
    }
    const isEmpty=Object.entries(formData).some(([key,value])=>key!=='middleName' && value.trim()==="");
    if(isEmpty){
        alert('All fields except Middle Name are to be Mandatorily filled');
        return;
    }
    console.log(formData);
    localStorage.setItem("employeeFormData",JSON.stringify(formData));
    alert("Form Data has been stored locally additionally You may visit Form Data Tab to View the Form that has been submitted");
}
    return (
        <form onSubmit={handleSubmit} className=' space-y-8 text-sm max-w-4xl mx-auto'>
        <fieldset className=" p-6 bg-white dark:bg-gray-700 shadow-md border border-gray-200 dark:border-gray-600 rounded-lg">
        <legend className="sm:text-lg md:text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
            Personal Details
        </legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
          <LabelInput label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Enter first name"/>
          <LabelInput label="Middle Name" name="middleName" value={formData.middleName} onChange={handleChange} placeholder="(Optional)"/>
          <LabelInput label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Enter last name"/>
          <LabelInput label="Main Mobile" name="mainMobile" value={formData.mainMobile} onChange={handleChange} placeholder="10-digit number" type="tel"/>
          <LabelInput label="Emergency Mobile" name="emergencyMobile" value={formData.emergencyMobile} onChange={handleChange} placeholder="10-digit number" type="tel"/>
          <LabelInput label="Email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" type="email"/>
          <LabelInput label="Address" name="address" value={formData.address} onChange={handleChange} placeholder="Current address"/>
          <LabelInput label="Date of Birth" type="date" name="dob" value={formData.dob} onChange={handleChange}/>
          <LabelInput label="Gender" name="gender" value={formData.gender} onChange={handleChange} placeholder="Male/Female/Other"/>
          <LabelInput label="Marital Status" name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} placeholder="Single/Married"/>
          </div>
        </fieldset>

        <fieldset className="p-6 bg-white dark:bg-gray-700 shadow-md border border-gray-200 dark:border-gray-600 rounded-lg">
            <legend className="sm:text-lg md:text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                Employee Details
            </legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
            <LabelInput label="Employee ID" name="employeeId" value={formData.employeeId} onChange={handleChange} placeholder="e.g., EMP123"/>
            <LabelInput label="Job Title" name="jobTitle" value={formData.jobTitle} onChange={handleChange} placeholder="e.g., Intern"/>
            <LabelInput label="Department" name="department" value={formData.department} onChange={handleChange} placeholder="e.g., Development"/>
            <LabelInput label="Reporting Head" name="reportingHead" value={formData.reportingHead} onChange={handleChange} placeholder="Name of manager"/>
            <LabelInput label="Assistant Reporting Head" name="assistantHead" value={formData.assistantHead} onChange={handleChange} placeholder="(If any)"/>
            <EmployeeType/>
            <LabelInput label="Joining Date" type="date" name="joiningDate" value={formData.joiningDate} onChange={handleChange}/>
            <LabelInput label="Confirmation Date" type="date" name="confirmationDate" value={formData.confirmationDate} onChange={handleChange}/>
            </div>
        </fieldset>

        <fieldset className="p-6 bg-white dark:bg-gray-700 shadow-md border border-gray-300 dark:border-gray-600 rounded-md">
            <legend className="sm:text-lg md:text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
              Bank Details  
            </legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <LabelInput label="Bank Name" name="bankName" value={formData.bankName} onChange={handleChange} placeholder="e.g., State Bank of India"/>
            <LabelInput label="Account Number" name="accountNumber" value={formData.accountNumber} onChange={handleChange} placeholder="Only digits" type="text"/>
            <LabelInput label="IFSC Code" name="ifsc" value={formData.ifsc} onChange={handleChange}  placeholder="e.g., SBIN0001234"/>
            <LabelInput label="Account Holder Name" name="accountHolder" value={formData.accountHolder} onChange={handleChange} placeholder="Name as per bank"/>
            </div>
        </fieldset>

        <div className="text-right">
          <button type="Submit" className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"> Submit</button>
        </div>
        </form>
    )

}