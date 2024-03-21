export const viewEmployeesRows = [
    "dateOfJoin","username","email","mobile",
    "designation","dob","workExperience",
    "previousSalary","currentSalary",
    "qualification","currentAddress",
    "currentArea","currentCity","currentState",
    "currentPincode","previousOrganisationName",
    "profilePicture","documents","view","edit","delete"
]

export const columns = [
    {id:'dateOfJoin',label:"Date Of Join",minWidth: 170},
    {id:'username',label:"Username",minWidth: 170},
    {id:'email',label:"Email",format:(value)=>value.toLocaleString('en-US'),minWidth: 170},
    {id:'mobile',label:"Mobile",minWidth: 170},
    {id:'designation',label:"Designation",minWidth: 170},
    {id:'dob',label:"Dob",minWidth: 170},
    {id:'workExperience',label:"Work Experience",minWidth: 170},
    {id:'previousSalary',label:"Previous Salary",minWidth: 170},
    {id:'currentSalary',label:"Current Salary",minWidth: 170},
    {id:'qualification',label:"Qualification",minWidth: 170},
    {id:'currentAddress',label:"Current Address",minWidth: 170},
    {id:'currentArea',label:"Current Area",minWidth: 170},
    {id:'currentCity',label:"Current City",minWidth: 170},
    {id:'currentState',label:"Current State",minWidth: 170},
    {id:'currentPincode',label:"Current Pincode",minWidth: 170},
    {id:'previousOrganisationName',label:"Previous Organisation Name",minWidth: 200},
    {id:'profilePicture',label:"Profile Picture",minWidth: 170},
    {id:'documents',label:"Documents",minWidth: 170},
    {id:'view',label:"View",minWidth: 170},
    {id:'edit',label:"Edit",minWidth: 170},
    {id:'delete',label:"Delete",minWidth: 170},
]

export function calculateAge(birthdate) {
    // Parse the birthdate string to a Date object
    var birthDate = new Date(birthdate);

    // Get the current date
    var currentDate = new Date();

    // Calculate the difference in years
    var age = currentDate.getFullYear() - birthDate.getFullYear();

    // Adjust the age if the birthday hasn't occurred yet this year
    if (
      currentDate.getMonth() < birthDate.getMonth() ||
      (currentDate.getMonth() === birthDate.getMonth() &&
        currentDate.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }
