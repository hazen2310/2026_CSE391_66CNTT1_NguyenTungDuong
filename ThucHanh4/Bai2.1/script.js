const form = document.getElementById("registerForm")

const fullname = document.getElementById("fullname")
const email = document.getElementById("email")
const phone = document.getElementById("phone")
const password = document.getElementById("password")
const confirmPassword = document.getElementById("confirmPassword")
const terms = document.getElementById("terms")

const successMessage = document.getElementById("successMessage")

function showError(id,message){
document.getElementById(id).innerText = message
}

function clearError(id){
document.getElementById(id).innerText = ""
}

function validateFullname(){

let value = fullname.value.trim()

let regex = /^[A-Za-zÀ-ỹ\s]+$/

if(value === ""){
showError("fullnameError","Không được để trống")
return false
}

if(value.length < 3){
showError("fullnameError","Ít nhất 3 ký tự")
return false
}

if(!regex.test(value)){
showError("fullnameError","Chỉ chứa chữ cái")
return false
}

clearError("fullnameError")
return true

}

function validateEmail(){

let value = email.value.trim()

let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

if(value === ""){
showError("emailError","Không được để trống")
return false
}

if(!regex.test(value)){
showError("emailError","Email không hợp lệ")
return false
}

clearError("emailError")
return true

}

function validatePhone(){

let value = phone.value.trim()

let regex = /^0\d{9}$/

if(value === ""){
showError("phoneError","Không được để trống")
return false
}

if(!regex.test(value)){
showError("phoneError","SĐT phải 10 số và bắt đầu bằng 0")
return false
}

clearError("phoneError")
return true

}

function validatePassword(){

let value = password.value

let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/

if(value === ""){
showError("passwordError","Không được để trống")
return false
}

if(!regex.test(value)){
showError("passwordError","Ít nhất 8 ký tự, có chữ hoa, thường và số")
return false
}

clearError("passwordError")
return true

}

function validateConfirmPassword(){

if(confirmPassword.value !== password.value){
showError("confirmPasswordError","Mật khẩu không khớp")
return false
}

clearError("confirmPasswordError")
return true

}

function validateGender(){

let gender = document.querySelector('input[name="gender"]:checked')

if(!gender){
showError("genderError","Vui lòng chọn giới tính")
return false
}

clearError("genderError")
return true

}

function validateTerms(){

if(!terms.checked){
showError("termsError","Bạn phải đồng ý điều khoản")
return false
}

clearError("termsError")
return true

}

form.addEventListener("submit",function(e){

e.preventDefault()

let valid =
validateFullname() &
validateEmail() &
validatePhone() &
validatePassword() &
validateConfirmPassword() &
validateGender() &
validateTerms()

if(valid){

form.style.display = "none"

successMessage.innerHTML =
"Đăng ký thành công! 🎉<br>Xin chào " + fullname.value

}

})

fullname.addEventListener("blur",validateFullname)
email.addEventListener("blur",validateEmail)
phone.addEventListener("blur",validatePhone)
password.addEventListener("blur",validatePassword)
confirmPassword.addEventListener("blur",validateConfirmPassword)

fullname.addEventListener("input",()=>clearError("fullnameError"))
email.addEventListener("input",()=>clearError("emailError"))
phone.addEventListener("input",()=>clearError("phoneError"))
password.addEventListener("input",()=>clearError("passwordError"))
confirmPassword.addEventListener("input",()=>clearError("confirmPasswordError"))