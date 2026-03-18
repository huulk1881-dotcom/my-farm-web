// ================= CHUYỂN GIAO DIỆN =================
function showSection(id){

let sections = document.querySelectorAll('.section');
sections.forEach(s => s.classList.add('hidden'));

document.getElementById(id).classList.remove('hidden');

// 👉 THÊM DÒNG NÀY
if(id === 'nhietdo'){
createChart();
}

// lưu lịch sử
addHistory(id);
}


// ================= NHIỆT ĐỘ VÀ ĐỘ ẨM =================

// thời gian realtime
setInterval(()=>{
let timeEl = document.getElementById("time");
if(timeEl){
let now = new Date();
timeEl.innerText = now.toLocaleTimeString();
}
},1000);


// dữ liệu
let tempData = [];
let humData = [];
let labels = [];

let chart;

// tạo biểu đồ khi mở mục nhiệt độ
function createChart(){

let canvas = document.getElementById("chart");
if(!canvas || chart) return;

let ctx = canvas.getContext("2d");

chart = new Chart(ctx, {
type: 'line',
data: {
labels: labels,
datasets: [
{
label: 'Nhiệt độ (°C)',
data: tempData,
borderColor: 'red',
fill: false,
tension: 0.4
},
{
label: 'Độ ẩm (%)',
data: humData,
borderColor: 'blue',
fill: false,
tension: 0.4
}
]
}
});
}


// cập nhật dữ liệu realtime
setInterval(()=>{

let tempEl = document.getElementById("temp");
let humEl = document.getElementById("hum");

if(tempEl && humEl){

// tạo dữ liệu giả
let t = (25 + Math.random()*5).toFixed(1);
let h = (60 + Math.random()*10).toFixed(1);

// hiển thị
tempEl.innerText = t + " °C";
humEl.innerText = h + " %";

// thêm vào biểu đồ
let now = new Date().toLocaleTimeString();

labels.push(now);
tempData.push(t);
humData.push(h);

// giới hạn 10 điểm
if(labels.length > 10){
labels.shift();
tempData.shift();
humData.shift();
}

// cập nhật chart
if(chart){
chart.update();
}

}
},2000);


// ================= SINH TRƯỞNG & THU HOẠCH =================
// (sau này bạn thêm logic vào đây)


// ================= MÁY BƠM =================

let pumpState = "OFF";

function batBom(){

pumpState = "ON";
document.getElementById("trangthai").innerText = "Trạng thái: ON";

luuLichSuBom("Bật");

}

function tatBom(){

pumpState = "OFF";
document.getElementById("trangthai").innerText = "Trạng thái: OFF";

luuLichSuBom("Tắt");

}


// lưu lịch sử
function luuLichSuBom(action){

let table = document.getElementById("pumpTable");
if(!table) return;

// tạo dòng mới
let row = table.insertRow(1); // thêm lên đầu (dưới header)

let cell1 = row.insertCell(0);
let cell2 = row.insertCell(1);

// thời gian
let time = new Date().toLocaleTimeString();
cell1.innerText = time;

// trạng thái
cell2.innerText = action;

// màu cho đẹp
if(action === "Bật"){
cell2.style.color = "green";
}else{
cell2.style.color = "red";
}

}


// ================= LỊCH SỬ TRUY CẬP =================
function addHistory(section){

// 🔥 KHÔNG ghi nếu là lịch sử
if(section === "lichsu") return;

let table = document.getElementById("historyTable");
if(!table) return;

// tạo dòng mới (thêm lên đầu)
let row = table.insertRow(1);

let cell1 = row.insertCell(0);
let cell2 = row.insertCell(1);

// thời gian
let time = new Date().toLocaleTimeString();
cell1.innerText = time;

// tên mục (hiển thị đẹp hơn)
let name = "";

if(section === "nhietdo") name = "Nhiệt độ & Độ ẩm";
if(section === "sintruong") name = "Sinh trưởng và Thu hoạch";
if(section === "maybom") name = "Máy bơm";

// hiển thị
cell2.innerText = name;

}