const nodemailer = require("nodemailer");

const emailToken = async (token, receiver, purpose) => {
  try {
    console.log(receiver.emailId);
    console.log(receiver.username);

    const subject1 = "Reset Password";
    const subject2 = "Verify Email";

    // for now this works http://localhost:5000/api/auth/forgotpassword/token
    const output1 = `<p>Hello ${
      receiver.username
    }</p>Link for reset password: <a  href ="http://localhost:3000/resetpassword/${token}"> <button>Reset</button></p><p>${
      receiver.role != "client" ? `Your code is ${receiver.uniqueCode}` : ""
    }<p>Regards,<br>IqApex </p>`;

    // for now this works http://localhost:5000/api/auth/verifyemail/token
    const output2 = `<p>Hi  ${receiver.username}
    <br>
    <br>
   ${
     receiver.role == "supplier"
       ? `Company Name : ${receiver.companyInfo.companyName}
    <br>
    Email Id : ${receiver.emailId}
    <br>
    Mobile No : ${receiver.mobileNo}
    <br>
    <br>
    Thank You for your login to <a href ="http://localhost:3000"> fixedtour.com</a>
    <br>`
       : ""
   }
    We hope  you had a good experience ! We always keep improving the services we offer. Our highest priority is to ensure that these services meet your expectations.
    <br>
    ${
      receiver.role != "client"
        ? `Your code is <strong> ${receiver.uniqueCode} </strong>  <br>`
        : ""
    }
    <br>
    Click on <a href ="http://localhost:3000/verifyemail/${token}">Verify Email</a>
    <br>
    <br>
    Thank You for your time !
    <br>
    <br>
    Team 
    <br>
    <a href ="http://localhost:3000"> fixedtour.com</a>`;

    let output;
    let subject;

    switch (purpose) {
      case 1:
        output = output1;
        subject = subject1;
        break;
      case 2:
        output = output2;
        subject = subject2;
        break;
    }

    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "iqapextest@gmail.com", // generated ethereal user
        pass: "IqapexGoogle@123", // generated ethereal password
      },
      tls: {
        rejectUnathorized: false,
      },
    });

    // send mail with defined transport object
    try {
      let info = await transporter.sendMail({
        from: '"Admin" <iqapextest@gmail.com>', // sender address
        to: `${receiver.emailId}`, // list of receivers
        subject: subject, // Subject line
        text: subject, // plain text body
        html: output, // html body
      });
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = emailToken;
