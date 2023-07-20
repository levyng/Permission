function otpLoginForm() {
  const form = document.getElementById('form');
  const phoneNumber = document.getElementById('phoneNumber').value;

  fetch('http://localhost:3000/sms', {
      method: "POST",
      body: JSON.stringify({
          phoneNumber:phoneNumber
      }),
      headers: {
          "Content-type": "application/json"
      }
  }).then(data => {
    data.json()})
      .then(res => {       
        console.log('test: ',res.data); 
          if (res.status === 500) {
               alert("An error occurred, try again")
          } else {
              alert("We sent a verification code to "+phoneNumber);
              form.reset();
              window.location.href = "/sms/verify"
            }
        //       alert("We sent a verification code to "+phoneNumber);
        //       form.reset();
            //   window.location.href = "/sms/verify"
      })

}

function codeConfirmForm() {
  const form = document.getElementById('form');
  const code = document.getElementById('code').value;
  console.log("code")
  fetch('http://localhost:3000/sms/verify', {
      method: "POST",
      body: JSON.stringify({
          code
      }),
      headers: {
          "Content-type": "application/json"
      }
  }).then(data => data.json())
      .then(res => {
          if (res.status === 400) {
                alert(res.response)
           } else {
               alert("Login success");
               form.reset();
          }
      })
}