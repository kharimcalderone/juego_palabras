let draggable = null;
const cols = document.querySelectorAll(`#columns .column`);
const cols2 = document.querySelectorAll(`#columns2 .column`);
let vidas = 5;
let aciertos = 0;

cols.forEach((col) => {
  col.addEventListener(`dragstart`, handleDragStart);
  col.addEventListener(`dragenter`, handleDragEnter);
  col.addEventListener(`dragover`, handleDragOver);
  col.addEventListener(`dragleave`, handleDragLeave);
  col.addEventListener(`drop`, handleDrop);
  col.addEventListener(`dragend`, handleDragEnd);
});

cols2.forEach((col) => {
  col.addEventListener(`dragstart`, handleDragStart);
  col.addEventListener(`dragenter`, handleDragEnter);
  col.addEventListener(`dragover`, handleDragOver);
  col.addEventListener(`dragleave`, handleDragLeave);
  col.addEventListener(`drop`, handleDrop);
  col.addEventListener(`dragend`, handleDragEnd);
});

function handleDragStart({ target, dataTransfer }) {
  if (target.className.includes(`column`)) {
    draggable = target;
    draggable.classList.add(`dragging`);

    dataTransfer.effectAllowed = `move`;
    dataTransfer.setData(`text`, draggable.innerHTML);
  }
}

function handleDragOver(evt) {
  if (draggable) {
    evt.preventDefault();
    evt.dataTransfer.dropEffect = `move`;
  }
}

function handleDragEnter({ target }) {
  if (draggable) {
    target.classList.add(`over`);
  }
}

function handleDragLeave({ target }) {
  if (draggable) {
    target.classList.remove(`over`);
  }
}

function handleDragEnd() {

  draggable = null;
  cols.forEach((col) => col.classList.remove(`over`));
  cols2.forEach((col) => col.classList.remove(`over`));
}

function handleDrop(evt) {
  if (draggable === null) return;
  evt.stopPropagation();
  evt.stopImmediatePropagation();
  evt.preventDefault();
  
  if (draggable !== this) {

    // Acceder al h1 que esta dentro de draggable 
    let thisH1 = this.querySelector(`h1`);
    let draggableH1 = draggable.querySelector(`h1`);

    //comprobar si draggable tiene la clase pieza
    if(!thisH1.classList.contains('transparente')){
      console.log("transparente", thisH1.innerHTML);
      return;
    }

    //comprobar si thisH1 tiene la letra que se esta arrastrando
    if(thisH1.innerHTML != draggableH1.innerHTML){
      console.log("no es la misma letra", thisH1.innerHTML);
  
      mostrarError(this);

      return;
    }else{
      mostrarExito(draggable);
      aciertos++;
      this.style.opacity = '10%';
      if(aciertos >= 8){ //8
        Swal.fire({
          title: 'Felicidades!',
          text: 'Has ganado!',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then((result) => {
          //Mostrar exito a todas las piezas
          const todas = document.querySelectorAll(`.column`);

          todas.forEach((col) => {
            mostrarExito(col);
          });
        });
      }
      /* if(aciertos >= 8){

      } */

      console.log("es la misma letra", thisH1.innerHTML);
    }


    //comprobar si thisH1 tiene cierta clase
    if(thisH1.style.display == 'none'){
      thisH1.style.display = '';
    }else{
      thisH1.style.display = 'none';
    }

    swapDom(draggable, this);
    
  }
}

function swapDom(a, b) {
  let aParent = a.parentNode;
  let bParent = b.parentNode;
  let aHolder = document.createElement(`div`);
  let bHolder = document.createElement(`div`);
  aParent.replaceChild(aHolder, a);
  bParent.replaceChild(bHolder, b);
  aParent.replaceChild(b, aHolder);
  bParent.replaceChild(a, bHolder);
}

function shuffleColumns() {

  //obtener todos los h1 que tienen la clase pieza
  let piezas = document.querySelectorAll('.pieza');  

  //crear un array de letras con el txto de los h1 que tienen la clase pieza
  let letras = [];
  piezas.forEach(pieza => {
    letras.push(pieza.innerHTML);
  });

  //mezclar las letras
  letras = shuffle(letras);

  //asignar las letras a los h1 que tienen la clase pieza
  piezas.forEach((pieza, index) => {
    pieza.innerHTML = letras[index];
  });
}

function shuffle(array) {
  let currentIndex = array.length;
  let randomIndex;
  let temporaryValue;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function mostrarError(elemento) {
  // Agrega la clase de error
  elemento.classList.add("error");
  
  // Remueve la clase de error después de 1 segundo
  setTimeout(() => {
    elemento.classList.remove("error");
  }, 1000);
}

// Función para mostrar el efecto de éxito en un recuadro específico
function mostrarExito(elemento) {
  console.log("mostrarExito");
  // Agrega la clase de éxito
  elemento.classList.add("success");
  
  // Remueve la clase de éxito después de 1 segundo
  setTimeout(() => {
    elemento.classList.remove("success");
  }, 1000);
}

// Ejemplo de uso: Llama a esta función con el recuadro que quieres mostrar como éxito
// mostrarExito(document.querySelector(".box"));


// Llamar a la función cuando se cargue la página
window.onload = shuffleColumns;
