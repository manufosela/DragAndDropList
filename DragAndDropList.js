export class DragAndDropList {
  constructor(dndMode = 'replace') {
    this.dndMode = dndMode;
    
    const style = document.createElement('style');
    style.innerHTML = `
      ul { padding: 0px; }
      ul .draggable { will-change: transform; font-family: "Raleway", sans-serif; font-weight: 800; height: 50px; list-style-type: none; margin: 10px; background-color: white; color: #212121; width: 250px; line-height: 3.2; padding-left: 10px; cursor: move; transition: all 200ms; user-select: none; margin: 10px auto; position: relative; }
      ul .draggable:after { content:'\\002630'; left: -20px; font-size: 10px; position: absolute; cursor: pointer; line-height: 5; transition: all 200ms; transition-timing-function: cubic-bezier(0.48, 0.72, 0.62, 1.5); transform: translateX(120%); opacity: 0; }
      ul .draggable:hover:after { opacity: 1; transform: translate(0); }
      .over { transform: scale(1.1, 1.1); }
    `;
    document.body.appendChild(style);

    this.dragDrop = this.dragDrop.bind(this);
    this.dragEnd = this.dragEnd.bind(this);
    this.dragEnter = this.dragEnter.bind(this);
    this.dragLeave = this. dragLeave.bind(this);
    this.dragOver = this.dragOver.bind(this);
    this.dragStart = this.dragStart.bind(this);
  }
 
  dragStart(ev) {
    ev.target.style.opacity = '0.4';
    this.dragSrcEl = ev.target;
    ev.dataTransfer.effectAllowed = 'move';
    ev.dataTransfer.setData('text/html', this.innerHTML);
  }
 
  dragEnter(ev) {
    ev.target.classList.add('over');
  }
 
  dragLeave(ev) {
    ev.stopPropagation();
    ev.target.classList.remove('over');
  }
 
  dragOver(ev) {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = 'move';
    return false;
  }
 
  dragDrop(ev) {
    if (this.dndMode === 'replace') {
      if (this.dragSrcEl != ev.target) {
        console.log(ev.target.innerHTML);
        [this.dragSrcEl.innerHTML, ev.target.innerHTML] = [ev.target.innerHTML, this.dragSrcEl.innerHTML];
      }
    }
    if (this.dndMode === 'before') {
      ev.target.parentNode.insertBefore(this.dragSrcEl, ev.target);
    }
    return false;
  }
 
  dragEnd(ev) {
    const draggableElements = [...ev.target.parentNode.querySelectorAll('.draggable')];
    draggableElements.forEach((item) => {
      item.classList.remove('over');
    });
    ev.target.style.opacity = '1';
  }
 
  addEventsDragAndDrop(el) {
    el.addEventListener('dragstart', this.dragStart, false);
    el.addEventListener('dragenter', this.dragEnter, false);
    el.addEventListener('dragover', this.dragOver, false);
    el.addEventListener('dragleave', this.dragLeave, false);
    el.addEventListener('drop', this.dragDrop, false);
    el.addEventListener('dragend', this.dragEnd, false);
  }

  init() {
    const draggablesList = [...document.querySelectorAll('ul[data-draggable="true"]')];
    draggablesList.forEach((draggableList) => {
      const draggableElements = draggableList.querySelectorAll('li');
      draggableElements.forEach((element) => {
        element.classList.add('draggable');
        element.setAttribute('draggable', true);
        this.addEventsDragAndDrop(element);
      });
    });
  }
}