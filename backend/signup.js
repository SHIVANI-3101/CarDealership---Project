let process = document.getElementById("result");

const { connectToDatabase, closeDatabaseConnection, client } = require('./db_connect');


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


function checkInput(firstname,num,mail,pass,conpass)
{
    console.log(firstname);
    console.log(num);
    console.log(mail);
    console.log(pass);
    console.log(conpass);

    if(firstname.length===0 || num.length===0 || mail.length===0 || pass.length===0 || conpass.length===0)
    {
        process.innerText = "All Fields Mandatory";
        process.setAttribute('id','error');

        setTimeout(()=>{
            process.innerText ="";
            process.removeAttribute('id','error');
        },3000);

        return false;
    }


    let num_check = /.*\d.*/;
    if((num_check.test(firstname)))
    {
        process.innerText = "Names cannot contain digit";
        process.setAttribute('id','error');

        setTimeout(()=>{
            process.innerText ="";
            process.removeAttribute('id','error');
            return false;
        },3000);
        
    }

    if(num.length!==10)
    {
        process.innerText = "Invalid Number";
        process.setAttribute('id','error');

        setTimeout(()=>{
            process.innerText ="";
            process.removeAttribute('id','error');
            return false;
        },3000);
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
                return false;
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
                    return true;
                },3000)
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

async function validateAndSaveUserData(firstname,num,mail,pass,conpass) 
{
    console.log(firstname,num,mail,pass,conpass);
    if(checkInput(firstname,num,mail,pass,conpass))
    {
        try{

            const userData = {
                name: firstname,
                contact: num,
                email: mail,
                password: pass
            }

            console.log(userData);
            // Connect to the MongoDB database
            await connectToDatabase();
            console.log('after');

            // Add user data to the database
            const database = client.db('carbuydata'); 
            const collection = database.collection('users');

            // Assuming userData is an object with fields like 'username', 'email', etc.
            await collection.insertOne(userData);

            console.log('User data saved to MongoDB');
        } 
        catch (error) 
        {
            console.error('Error saving user data:', error);
        } 
        finally 
        {
            // Close the MongoDB connection
            await closeDatabaseConnection();
        }   
    }
}


function handleSubmit(val)
{
    let firstname = document.getElementById("firstname").value;
    let num = document.getElementById("phonenum").value;
    let mail = document.getElementById("user_mail").value;
    let pass = document.getElementById("user_pass").value;
    let conpass = document.getElementById("conf_pass").value;
    console.log(val);

    validateAndSaveUserData(firstname,num,mail,pass,conpass);
}
