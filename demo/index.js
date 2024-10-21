let draggable = null;
const cols = document.querySelectorAll(`#columns .column`);
const cols2 = document.querySelectorAll(`#columns2 .column`);

cols.forEach((col) => {
  col.addEventListener(`dragstart`, handleDragStart);
  col.addEventListener(`dragenter`, handleDragEnter);
  col.addEventListener(`dragover`, handleDragOver);
  col.addEventListener(`dragleave`, handleDragLeave);
  col.addEventListener(`drop`, handleDrop);
  // col.addEventListener(`dragend`, handleDragEnd);
});

cols2.forEach((col) => {
  col.addEventListener(`dragstart`, handleDragStart);
  col.addEventListener(`dragenter`, handleDragEnter);
  col.addEventListener(`dragover`, handleDragOver);
  col.addEventListener(`dragleave`, handleDragLeave);
  col.addEventListener(`drop`, handleDrop);
  // col.addEventListener(`dragend`, handleDragEnd);
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
  const columns2 = document.querySelector("#columns2");
  const letters = Array.from(columns2.children);

  // Algoritmo de Fisher-Yates para mezclar el array
  for (let i = letters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [letters[i], letters[j]] = [letters[j], letters[i]];
  }

  // Limpiar el contenedor y agregar las letras mezcladas
  columns2.innerHTML = "";
  letters.forEach(letter => columns2.appendChild(letter));
}

// Llamar a la función cuando se cargue la página
window.onload = shuffleColumns;
