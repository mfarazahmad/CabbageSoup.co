import React from 'react';


import emailjs from 'emailjs-com';


function SendEmail() {

  function sendEmail(e) {
    e.preventDefault();    

    emailjs.sendForm('service_043g1zh', 'template_bu99u2c', e.target, 'user_AmjGhJszTUZRIJPVX68aS')
      .then((result) => {
          window.location.reload()
      }, (error) => {
          console.log(error.text);
      });
  }

  return (
    <form className="contact-form" onSubmit={sendEmail}>
      <input type="hidden" name="contact_number" />
      <label>Name</label>
      <input type="text" name="from_name" />
      <label>Email</label>
      <input type="email" name="from_email" />
      <label>Subject</label>
      <input type="text" name="subject" />
      <label>Message</label>
      <textarea name="html_message" />
      <input type="submit" value="Send" />
    </form>
  );
}

export default SendEmail;