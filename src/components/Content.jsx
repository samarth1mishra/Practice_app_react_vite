import { EmployeeForm } from "./EmployeeForm";
import { ViewFormData } from "./ViewFormData";
export const Content=({activeTab})=>{
  const toggleContent=()=>{
    switch (activeTab){
      case 'Careers':
        return <p>Page contains Jobs that the organisation has Currently Rolled Out!</p>;
      case 'Services':
        return <p>Here are the List of Services we offer</p>;
      case 'Blogs':
        return <p>Blogs to Read!</p>;
      case 'Employee Information Management':
       return <EmployeeForm />
      case 'Saved Form Data':
        return <ViewFormData/>
      default:
        return <p>Select a Tab</p>;
    }
  };
  return (
    <div  className="flex-1 p-8  text-center">
        <h1 className="text-3xl font-bold mb-4">{activeTab}</h1>
        <div className="text-lg ">{toggleContent()}</div>
      </div>
  );
};

