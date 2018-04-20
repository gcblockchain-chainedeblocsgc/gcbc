pragma solidity ^0.4.18;
import "zeppelin-solidity/contracts/ownership/Ownable.sol";

contract Company is Ownable {
    address public owner; //owner account address (20 bytes) the Gov 
    string public employee;

    enum CompanyType {Undefined, SoleProprietorship, Corporation, Trust, Association} 
    enum RegistrationStatus {Undefined, Registered, Approved, Expired} 

    struct CompanyDetails{
        bytes32 number;
        string name;
        CompanyType companyType;
        uint dateRegistered; //unix time
        RegistrationStatus registrationStatus;
        string articlesOfIncorporation; // the actual record data should be part of IPFS
        //TODO add employees
    }

    event Registered(address _owner, bytes32 number);

    bytes32[] private companiesList; //list of company numbers so we can enumerate them
    mapping(bytes32 => CompanyDetails) private companiesDetailsList; //access by company number key and get the other details 

    function Company() public payable{
        owner = msg.sender; // msg.sender is contract caller (address of contract creator)
    }

    function test() public pure returns (string) {
        return "Hello World";
    }

    function RegisterCompany(bytes32 _number, string _name, uint _companyType) public onlyOwner returns(bool success){
        //register a new company 
        //TODO: check for duplicates  require(!isCompanyExists(_number));
        companiesList.push(_number);
        CompanyDetails memory companyDetails = CompanyDetails(_number, _name, CompanyType(_companyType), now, RegistrationStatus.Registered, "");
        companiesDetailsList[_number] = companyDetails;
        
        emit Registered(owner, _number);

        return true;
    }

    function lookupCompany(bytes32 _number) public constant returns(bytes32, string, uint, uint) {
        CompanyDetails memory companyDetails = companiesDetailsList[_number];
        return (companyDetails.number, companyDetails.name, uint(companyDetails.companyType), uint(companyDetails.registrationStatus));
    }

    function removeContract() public onlyOwner() {
        selfdestruct(msg.sender);
    }

    //TODO SECTION
    // function getArticlesOfIncorporation() public constant returns (string) {
    //     //TODO: implement getArticlesOfIncorporation
    //     return "";
    // }

    // function setArticlesOfIncorporation(string _recordString) public returns (bool) {
    //     //TODO: implement setArticlesOfIncorporation
    //     return true;
    // }

    function registerEmployee(string uportIdentityAddress) public {
        employee = uportIdentityAddress;
    }
}