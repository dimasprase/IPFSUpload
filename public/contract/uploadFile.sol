pragma solidity ^0.4.17;

contract readwrite {
    string nama;
    string email;
    string phonenumber;
    string institution;
    string hashFile;
    
    function write(string _nama, string _email, string _phonenumber, string _institution,  string _hashFile) public {
      nama = _nama;
      email = _email;
      phonenumber = _phonenumber;
      institution = _institution;
      hashFile = _hashFile;
    }
    
    function read() public view returns (string, string, string, string, string) {
      return (nama, email, phonenumber, institution, hashFile);
    }
    
}