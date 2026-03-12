let students = []
let filteredStudents = []
let sortDirection = 1

const nameInput = document.getElementById("name")
const scoreInput = document.getElementById("score")

const searchInput = document.getElementById("search")
const filterRank = document.getElementById("filterRank")

const tableBody = document.getElementById("tableBody")
const noResult = document.getElementById("noResult")

function getRank(score){

if(score >= 8.5) return "Giỏi"
if(score >= 7) return "Khá"
if(score >= 5) return "Trung bình"
return "Yếu"

}

function addStudent(){

let name = nameInput.value.trim()
let score = parseFloat(scoreInput.value)

if(name === ""){
alert("Tên không được trống")
return
}

if(isNaN(score) || score <0 || score >10){
alert("Điểm phải từ 0-10")
return
}

students.push({
name:name,
score:score
})

nameInput.value=""
scoreInput.value=""

applyFilters()

}

document.getElementById("addBtn").addEventListener("click",addStudent)

function applyFilters(){

let keyword = searchInput.value.toLowerCase()

let rankFilter = filterRank.value

filteredStudents = students.filter(sv=>{

let matchName = sv.name.toLowerCase().includes(keyword)

let rank = getRank(sv.score)

let matchRank = rankFilter === "all" || rank === rankFilter

return matchName && matchRank

})

filteredStudents.sort((a,b)=> (a.score - b.score)*sortDirection)

renderTable()

}

function renderTable(){

tableBody.innerHTML=""

if(filteredStudents.length === 0){
noResult.style.display="block"
return
}
else{
noResult.style.display="none"
}

filteredStudents.forEach((sv,index)=>{

let rank = getRank(sv.score)

let row = `
<tr class="${sv.score<5 ? 'low-score':''}">
<td>${index+1}</td>
<td>${sv.name}</td>
<td>${sv.score}</td>
<td>${rank}</td>
<td><button data-index="${students.indexOf(sv)}">Xóa</button></td>
</tr>
`

tableBody.innerHTML += row

})

}

searchInput.addEventListener("input",applyFilters)

filterRank.addEventListener("change",applyFilters)

document.getElementById("scoreHeader").addEventListener("click",function(){

sortDirection *= -1

this.textContent = sortDirection === 1 ? "Điểm ▲" : "Điểm ▼"

applyFilters()

})

tableBody.addEventListener("click",function(e){

if(e.target.tagName === "BUTTON"){

let index = e.target.dataset.index

students.splice(index,1)

applyFilters()

}

})