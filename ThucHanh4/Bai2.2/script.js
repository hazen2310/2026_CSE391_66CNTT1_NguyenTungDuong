const form = document.getElementById("orderForm")

const product = document.getElementById("product")
const quantity = document.getElementById("quantity")
const deliveryDate = document.getElementById("deliveryDate")
const address = document.getElementById("address")
const note = document.getElementById("note")

const total = document.getElementById("total")

const confirmBox = document.getElementById("confirmBox")
const orderSummary = document.getElementById("orderSummary")

const successMessage = document.getElementById("successMessage")

const noteCount = document.getElementById("noteCount")

const prices = {
"Áo":150000,
"Quần":200000,
"Giày":500000
}

function showError(id,msg){
document.getElementById(id).innerText = msg
}

function clearError(id){
document.getElementById(id).innerText = ""
}

function validateProduct(){

if(product.value === ""){
showError("productError","Vui lòng chọn sản phẩm")
return false
}

clearError("productError")
return true

}

function validateQuantity(){

let q = parseInt(quantity.value)

if(isNaN(q) || q<1 || q>99){
showError("quantityError","Số lượng 1-99")
return false
}

clearError("quantityError")
return true

}

function validateDate(){

let selected = new Date(deliveryDate.value)
let today = new Date()

today.setHours(0,0,0,0)

let max = new Date()
max.setDate(today.getDate()+30)

if(deliveryDate.value === ""){
showError("dateError","Chọn ngày giao")
return false
}

if(selected < today){
showError("dateError","Không chọn ngày quá khứ")
return false
}

if(selected > max){
showError("dateError","Không quá 30 ngày")
return false
}

clearError("dateError")
return true

}

function validateAddress(){

let value = address.value.trim()

if(value.length < 10){
showError("addressError","Địa chỉ ít nhất 10 ký tự")
return false
}

clearError("addressError")
return true

}

function validateNote(){

let length = note.value.length

if(length > 200){
showError("noteError","Tối đa 200 ký tự")
return false
}

clearError("noteError")
return true

}

function validatePayment(){

let p = document.querySelector('input[name="payment"]:checked')

if(!p){
showError("paymentError","Chọn phương thức thanh toán")
return false
}

clearError("paymentError")
return true

}

function updateTotal(){

let p = product.value
let q = parseInt(quantity.value)

if(prices[p] && q){

let sum = prices[p]*q

total.innerText = Number(sum).toLocaleString("vi-VN")

}

}

product.addEventListener("change",updateTotal)
quantity.addEventListener("input",updateTotal)

note.addEventListener("input",function(){

let length = note.value.length

noteCount.innerText = length + "/200"

if(length >200){

noteCount.style.color="red"

}else{

noteCount.style.color="black"

}

})

form.addEventListener("submit",function(e){

e.preventDefault()

let valid =
validateProduct() &
validateQuantity() &
validateDate() &
validateAddress() &
validateNote() &
validatePayment()

if(valid){

let price = prices[product.value]

let sum = price * quantity.value

orderSummary.innerHTML = `
Sản phẩm: ${product.value}<br>
Số lượng: ${quantity.value}<br>
Tổng tiền: ${Number(sum).toLocaleString("vi-VN")} VNĐ<br>
Ngày giao: ${deliveryDate.value}
`

confirmBox.style.display="block"

}

})

document.getElementById("confirmBtn").addEventListener("click",function(){

confirmBox.style.display="none"

form.style.display="none"

successMessage.innerHTML="Đặt hàng thành công 🎉"

})

document.getElementById("cancelBtn").addEventListener("click",function(){

confirmBox.style.display="none"

})