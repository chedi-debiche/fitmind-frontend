import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./styles.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash , faBan } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import SideNav from "../sharedBack/SideNav";
import Header from "../sharedBack/Header";
import Footer from "../sharedBack/Footer";
// import XLSX from 'xlsx';
import * as XLSX from 'xlsx';

import { writeFile } from 'xlsx';
import FileSaver from "file-saver";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import requireAuth from "../../frontoffice/authentification/requireAuth";




// 



const UserList = () => {
  const [users, setUsers] = useState([]);
  const [deletedUserId, setDeletedUserId] = useState(null);
  const [blockUser, setBlockedUser] = useState(null) ;

  

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get("https://fitmind-backend.onrender.com/api/users");
      setUsers(response.data);
    };
    
    fetchUsers();
  }, [deletedUserId,blockUser]);

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`https://fitmind-backend.onrender.com/api/users/${userId}`);
      setDeletedUserId(userId);
    } catch (error) {
      console.log(error);
    }
  };



  const handleUndoDelete = () => {
    setDeletedUserId(null);
  };

  const handleBlockUser = async (userId) => {
    try {
      await axios.put(`https://fitmind-backend.onrender.com/api/users/block/${userId}`);

      setBlockedUser(blockUser+1) ;
      console.log(blockUser+1) ;
      

    }
    catch (error) {
      console.log(error);
    }
  }

//export to excel file function : 
  const handleExportToExcel = (filteredUsers) => {
    const worksheet = XLSX.utils.json_to_sheet(filteredUsers);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8" });
    FileSaver.saveAs(blob, "users list.xlsx");
  };
  
  //export to pdf personalised file 

  const handleExportToPdf = () => {
    // Get the table element
    const table = document.querySelector("table");
  
    // Create a canvas from the table element
    html2canvas(table).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
  
      // Calculate the page height
      const pageHeight = (canvas.height * 208) / canvas.width;
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
      // Create a PDF instance
      const pdf = new jsPDF("p", "mm", "a4");
  
      // Add the logo
      const logo = new Image();
      logo.src = `${process.env.PUBLIC_URL}/fitmindlogo.png`;
      pdf.addImage(logo, "PNG", 10, 10, 30, 30);
  
      // Add the title
      pdf.setFontSize(18);
      pdf.setTextColor("blue");
      pdf.text("Users List", pdf.internal.pageSize.getWidth() / 2, 20, { align: "center" });
  
      // Add the table image
      pdf.addImage(imgData, "PNG", 10, 40, imgWidth, imgHeight);
  
      // Add the society name
      pdf.setFontSize(12);
      pdf.setTextColor("gray");
      const societyText = "PEGASUS SPORT";
      const societyTextWidth = pdf.getStringUnitWidth(societyText) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
      const societyX = pdf.internal.pageSize.getWidth() - societyTextWidth - 10;
      const societyY = pdf.internal.pageSize.getHeight() - 10;
      pdf.text(societyText, societyX, societyY);
  
      // Add the signature
      pdf.setTextColor("black");
      const signatureText = " Admin signature ";
      const signatureTextWidth = pdf.getStringUnitWidth(signatureText) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
      const signatureX = pdf.internal.pageSize.getWidth() - signatureTextWidth - 10;
      const signatureY = societyY - 5;
      pdf.textWithLink(signatureText, signatureX, signatureY, {
        url: "http://localhost:3000/",
      });
  
      // Add the confidential information paragraph
      pdf.setFontSize(10);
      pdf.setTextColor("red");
      const confidentialText = "Confidential information:  \n This users table information is highly confidential and can only be accessed by the Fitmind website admin ";
      const confidentialTextWidth = pdf.getStringUnitWidth(confidentialText) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
      const confidentialX = pdf.internal.pageSize.getWidth() / 2 - confidentialTextWidth / 2;
      const confidentialY = 40 + imgHeight + pageHeight / 2;
      pdf.text(confidentialText, confidentialX, confidentialY);
  
      // Save the PDF file
      pdf.save("users list.pdf");
    });
  };
  
  
  


  

  const filteredUsers = users.filter((user) => user._id !== deletedUserId);

  return (
    <div className={styles.container}>
      <Header/>
      <SideNav/>

      <h2>User List</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            {/* <th>Profile</th> */}
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            {/* <th>Password</th> */}
            <th>Verified</th>
            <th>Phone</th>
            <th>User Type</th>
            <th>Location</th>
            <th>Experience</th>
            <th>Gender</th>
            <th>Certificate Title</th>
            <th>Certificate Date</th>
            <th>Certificate File</th>
            <th>Block</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user._id}>
              {/* <td>{user.profile}</td> */}
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              {/* <td>{user.password}</td> */}
              <td>{user.verified ? "Yes" : "No"}</td>
              <td>{user.phone}</td>
              <td>{user.userType}</td>
              <td>{user.location}</td>
              <td>{user.experience}</td>
              <td>{user.gender}</td>
              <td>{user.certificate ? user.certificate.title : "-"}</td>
              <td>{user.certificate ? user.certificate.date : "-"}</td>
              <td>{user.certificate ? user.certificate.file : "-"}</td>
              <td>{user.block ? "Yes" : "No"}</td>

              <tr>


              <th className= {styles.transparent}>
  <Button  onClick={()=> handleBlockUser(user._id)}>Block</Button>
  </th>
              <th className={styles.transparent}>
  {/* <Button className={styles.update}>
    <FontAwesomeIcon icon={faEdit} />
  </Button> */}
  <Button

    className={styles.delete}
    onClick={() => handleDeleteUser(user._id)}>
    <FontAwesomeIcon icon={faTrash} />
  </Button> </th>

  


</tr>

            </tr>
          ))}
        </tbody>


      </table>

      <Button onClick={() => handleExportToExcel(filteredUsers)}>Export to Excel</Button>
        <Button onClick={handleExportToPdf}>Export to PDF</Button>


      <Footer/>
    </div>
  );
};

export default requireAuth(UserList) ;
