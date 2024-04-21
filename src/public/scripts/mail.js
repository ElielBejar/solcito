function infoEmail(email, subject, html){
    return {
       email:email,
       subject:subject,
       html:html
    };
}

async function sendEmail(email, subject, html){
    const email_response = await fetch("http://localhost:3000/mail", {
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify(infoEmail(email, subject, html)),
    });
    const email_json = email_response.json();
    console.log(email_json);
}