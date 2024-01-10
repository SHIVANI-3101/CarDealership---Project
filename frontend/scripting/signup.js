let process = document.getElementById("result");

function checkPass(val)
{
    let cap = /.*[A-Z].*/;
    let num = /.*\d.*/;
    let special = /.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-].*/;

    if((val.length<8))
    {
        return "Password too short";
    }

    if(!(cap.test(val)))
    {   
        return "Password not having capital letter";
    } 

    if(!(num.test(val)))
    {
        return "Password not having a digit";
    }

    if(!(special.test(val)))
    {
        return "Password not having a special character";
    }

    return true;
}


function checkInput(e)
{
    e.preventDefault();

    let firstname = document.getElementById("firstname").value;
    let lastname = document.getElementById("lastname").value;
    let num = document.getElementById("phonenum").value;
    let mail = document.getElementById("user_mail").value;
    let pass = document.getElementById("user_pass").value;
    let conpass = document.getElementById("conf_pass").value;

    console.log(firstname,lastname,num,mail,pass,conpass);

    if(firstname.length===0 || lastname.length===0 || num.length===0 || mail.length===0 || pass.length===0 || conpass.length===0)
    {
        process.innerText = "All Fields Mandatory";
        process.setAttribute('id','error');

        setTimeout(()=>{
            process.innerText ="";
            process.removeAttribute('id','error');
        },3000);

        return;
    }


    let num_check = /.*\d.*/;
    if((num_check.test(firstname) || num_check.test(lastname)))
    {
        process.innerText = "Names cannot contain digit";
        process.setAttribute('id','error');

        setTimeout(()=>{
            process.innerText ="";
            process.removeAttribute('id','error');
        },3000);
        return;
    }

    if(num.length!==10)
    {
        process.innerText = "Invalid Number";
        process.setAttribute('id','error');

        setTimeout(()=>{
            process.innerText ="";
            process.removeAttribute('id','error');
        },3000);
        return;
    }


    if(pass.length!==0)
    {
        if(pass!==conpass)
        {
            process.innerText = "Password Not Matched";
            process.setAttribute('id','error');

            setTimeout(()=>{
                process.innerText ="";
                process.removeAttribute('id','error');
            },3000);
        }
        else
        {
            let res = checkPass(pass);

            if(res===true)
            {
                process.innerText = "Submitting Form";
                process.setAttribute('id','correct');

                setTimeout(()=>{
                    process.innerText ="";
                    process.removeAttribute('id','correct');
                    // window.location.href = "http://127.0.0.1:5500/ThePandaStore/pages/landing%20page/index.html";
                    window.location.href = "/ThePandaStore/pages/landing page/index.html";
                },3000);
            }
            else
            {
                process.innerText = res;
                process.setAttribute('id','error');

                setTimeout(()=>{
                    process.innerText ="";
                    process.removeAttribute('id','error');
                },3000)
            }

        }
    }
}

function dynamicCheck() {
    const password = document.getElementById('user_pass').value;

    checkRule(password.length >= 8, 'rule1');
    checkRule(/[A-Z]/.test(password), 'rule2');
    checkRule(/\d/.test(password), 'rule3');
    checkRule(/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password), 'rule4');
}

function checkRule(condition, ruleId) {
    const ruleElement = document.getElementById(ruleId);

    if (condition) {
        ruleElement.classList.add('valid-rule');
    } else {
        ruleElement.classList.remove('valid-rule');
    }
}