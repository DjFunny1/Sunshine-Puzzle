const puzzleGrid = document.getElementById('puzzle-grid');
        const piecesContainer = document.getElementById('pieces-container');
        const imageUrl = './media/puzzlePicture.jpg'; // Imagen de 500x500 para el rompecabezas

        // Crear las celdas del rompecabezas
        for (let i = 1; i <= 25; i++) {
            const cell = document.createElement('div');
            cell.classList.add('grid-cell');
            cell.setAttribute('data-correct-piece', i);
            cell.addEventListener('dragover', allowDrop);
            cell.addEventListener('drop', drop);
            puzzleGrid.appendChild(cell);
        }

        // Crear y mezclar las piezas
        const pieceOrder = Array.from({length: 25}, (_, i) => i + 1);
        shuffle(pieceOrder);
        for (let i of pieceOrder) {
            const piece = document.createElement('div');
            piece.classList.add('puzzle-piece');
            piece.setAttribute('draggable', true);
            piece.setAttribute('data-piece-id', i);
            piece.style.backgroundImage = `url(${imageUrl})`;
            const row = Math.floor((i - 1) / 5);
            const col = (i - 1) % 5;
            piece.style.backgroundPosition = `${-col * 100}px ${-row * 100}px`;
            piece.addEventListener('dragstart', drag);
            piecesContainer.appendChild(piece);
        }

        // Funciones para arrastrar y soltar
        function allowDrop(event) {
            event.preventDefault();
        }

        function drag(event) {
            event.dataTransfer.setData("text", event.target.getAttribute('data-piece-id'));
        }

        function drop(event) {
            event.preventDefault();
            const pieceId = event.dataTransfer.getData("text");
            const correctPiece = event.target.getAttribute('data-correct-piece');
            if (pieceId === correctPiece) {
                const piece = document.querySelector(`.puzzle-piece[data-piece-id="${pieceId}"]`);
                event.target.appendChild(piece);
                piece.setAttribute('draggable', false);
                checkPuzzleComplete();
            }
        }

        // Verificar si el rompecabezas está completo
        function checkPuzzleComplete() {
            const gridCells = document.querySelectorAll('.grid-cell');
            for (let cell of gridCells) {
                if (cell.children.length === 0) {
                    return;
                }
            }
            document.getElementById('profile').style.display = 'block';
        }

        // Función para mezclar las piezas
        function shuffle(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }

        // FUNCION PARA EL SLIDER DE IMAGENES

const slider = document.getElementById('slider');
const images = slider.querySelectorAll('img');
const toggleBtn = document.getElementById('toggle');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

let index = 0;
let isPaused = false;

function updateSlider() {
    slider.style.transform = `translateX(-${index * 100}%)`;
}

function nextSlide() {
    if (!isPaused) {
    index = (index + 1) % images.length;
    updateSlider();
    }
}

function prevSlide() {
    index = (index - 1 + images.length) % images.length;
    updateSlider();
}

let interval = setInterval(nextSlide, 5000);

toggleBtn.addEventListener('click', () => {
    isPaused = !isPaused;
    toggleBtn.textContent = isPaused ? '❚❚/▶' : '❚❚/▶';
});

nextBtn.addEventListener('click', () => {
    index = (index + 1) % images.length;
    updateSlider();
});

prevBtn.addEventListener('click', () => {
    prevSlide();
});

  // Modal logic
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const closeBtn = document.querySelector('.close');

images.forEach(img => {
    img.addEventListener('click', () => {
    modal.style.display = "block";
    modalImg.src = img.src;
    });
});

closeBtn.addEventListener('click', () => {
    modal.style.display = "none";
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
    modal.style.display = "none";
    }
});

// MOUSE EFFECTS 
const canvas1 = document.getElementById('canvas1');
const ctx = canvas1.getContext('2d');
canvas1.width= window.innerWidth;
canvas1.height=/* this. */window.innerHeight;
const particlesarray=[];
window.addEventListener('resize',function () {
    canvas1.width= window.innerWidth;
    canvas1.height=/* this. */window.innerHeight;
})
const mouse= {
    x:null,
    y:null
}
canvas1.addEventListener('mousemove',function(event){
    mouse.x=event.x;
    mouse.y=event.y;
    for(let i=0;i<5;i++){       //change i<5 to any number to inc or dec the sparkles !!DO NOT SET THE NUMBER TOO HIGH IT WILL HANG THE BROWSER
        particlesarray.push(new particles());
    }
})
class particles{
    constructor(){
        this.x=mouse.x;
        this.y=mouse.y;
        this.size = Math.random()*5+1;
        this.speedx=Math.random()*3-1.5;
        this.speedy=Math.random()*3-1.5;
    }
    update(){
        this.x+=this.speedx;
        this.y+=this.speedy;
        if(this.size>0){
            this.size-=0.1;
        }
    }
    draw(){
        ctx.fillStyle='white';
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size,0,6);
        ctx.fill();
    }
};
function handleparticles(){
    for(let i=0;i<particlesarray.length;i++){
        particlesarray[i].update();
        particlesarray[i].draw();
        if(particlesarray[i].size<=0.1){
            particlesarray.splice(i,1);
            --i;
        }
    }
}
function animate(){
    ctx.clearRect(0,0,canvas1.width,canvas1.height);
    handleparticles();
    requestAnimationFrame(animate);
}
animate();