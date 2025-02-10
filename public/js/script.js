    /*********Show Password Button***********/
    function showPassword() {
        const pswdBtn = 
        document.querySelector('#pswdBtn');
        pswdBtn.addEventListener('click', function() {
            const pswdInput = 
            document.getElementById('password');
            let type = pswdInput.getAttribute("type");
        
        if (type === 'password') {
            pswdInput.setAttribute("type", "text");
            pswdBtn.innerHTML = 'Hide Password';
        } else { 
            pswdInput.setAttribute("type", "password");
            pswdBtn.innerHTML = 'Show Password';
        }
    });
    }
showPassword() 

console.log("Hello.")
const pswdInput = 
document.getElementById('password');
console.log(pswdInput)