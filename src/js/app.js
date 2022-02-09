// import jQuery from "jquery";
// window.$ = window.jQuery = jQuery;

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import '/src/scss/app.scss'
import '@fortawesome/fontawesome-free/css/all.min.css'
import axios from "axios";

let draw = false
let eraser = false
let size = 1
let colour = 'black'

let paintContainer = document.getElementById('paint-container')
let imagesContainer = document.getElementById('images-container')
let canvas = document.getElementById('graph');
canvas.height = 500
canvas.width = paintContainer.offsetWidth
let ctx = canvas.getContext('2d');

//навигация
let colourPicker = document.getElementById('colourPicker')
let sizeRange = document.getElementById('sizeRange')
let pencilBtn = document.getElementById('pencilBtn')
let eraserBtn = document.getElementById('eraserBtn')
let saveBtn = document.getElementById('saveBtn')
let clearBtn = document.getElementById('clearBtn')


colourPicker.addEventListener('input',e=>{
    colour = e.currentTarget.value
})

sizeRange.addEventListener('input',e=>{
    size = e.currentTarget.value
})

pencilBtn.addEventListener('click',e=>{
    eraserBtn.classList.remove('active')
    pencilBtn.classList.add('active')
    eraser = false
})

eraserBtn.addEventListener('click',e=>{
    pencilBtn.classList.remove('active')
    eraserBtn.classList.add('active')
    eraser = true
})

saveBtn.addEventListener('click', e=>{
    let dataURL = canvas.toDataURL("image/png");
    axios({
        url: 'saveImage.php',
        method: 'POST',
        data: {
            data:dataURL
        }
    }).then(function (response) {

    })
        .catch(function (error) {
            console.log(error);
        })


    let image = `
    <div class="col">
        <div class="card">
            <img src="${dataURL}" class="card-img-top">
        </div>
    </div>
    `
    imagesContainer.insertAdjacentHTML('beforeend',image)
})

clearBtn.addEventListener('click', e=>{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
})

canvas.addEventListener('mousemove',(e)=>{

    if (draw){
        ctx.beginPath();
        ctx.moveTo(e.offsetX, e.offsetY);
        ctx.lineTo(e.offsetX-e.movementX, e.offsetY-e.movementY);
        ctx.closePath();
        ctx.strokeStyle = eraser?'white':colour;
        ctx.lineWidth = size;
        ctx.stroke();
    }

})

canvas.addEventListener('mousedown',(e)=>{
    draw = true

})
canvas.addEventListener('mouseup',(e)=>{
    draw = false

})