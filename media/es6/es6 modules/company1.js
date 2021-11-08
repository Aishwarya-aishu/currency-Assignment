let company="westagile labs";
let getCompany=function(){
    return company.toUpperCase();
}
let setCompany=function(newValue){
    company=newValue;
}
export{company,getCompany,setCompany}