const nodemailer = require('nodemailer');

let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.Email, 
        pass: process.env.Password
    }
});

const CreationMail = (email, start , end) => {
    const day = new Date(start).toDateString()
    const startTime = new Date(start).toLocaleTimeString()
    const endTime = new Date(end).toLocaleTimeString()
    let mailOptions = {
        from: 'xyz@gmail.com', 
        to: email, 
        subject: 'Interview Scheduled',
        text: `Hi, your interview has been scheduled from ${startTime} to ${endTime} on ${day}. Please be ready on time`,
    };
    mailTransporter.sendMail(mailOptions,function(err, data) {
        if(err) {
            console.log('Error Occurs');
        } 
    });
}

const CancelationMail = (email, start , end) => {
    const day = new Date(start).toDateString()
    const startTime = new Date(start).toLocaleTimeString()
    const endTime = new Date(end).toLocaleTimeString()
    let mailOptions = {
        from: 'real.dipak.yadav@gmail.com', 
        to: email, 
        subject: 'Interview Cancelled',
        text: `Hi, your interview has been cancelled which previously held from ${startTime} to ${endTime} on ${day} `,
    };
    mailTransporter.sendMail(mailOptions,function(err, data) {
        if(err) {
            console.log('Error Occurs');
        } 
    });
}

const UpdationMail = (email, start , end  ) => {
    const day = new Date(start).toDateString()
    const startTime = new Date(start).toLocaleTimeString()
    const endTime = new Date(end).toLocaleTimeString()
    // const pday = new Date(OldStart).toDateString()
    // const pstartTime = new Date(OldStart).toLocaleTimeString()
    // const pendTime = new Date(OldEnd).toLocaleTimeString()
    
    let mailOptions = {
        from: 'real.dipak.yadav@gmail.com',
        to: email,
        subject: 'Interview Rescheduled',
        text: `Hi, your interview has been resheduled to ${startTime} to ${endTime} on ${day} which previously held from ${pstartTime} to ${pendTime} on ${pday} `,
    };
    mailTransporter.sendMail(mailOptions,function(err, data) {
        if(err) {
            console.log('Error Occurs');
        }
    });
}



module.exports = {CreationMail , CancelationMail , UpdationMail }