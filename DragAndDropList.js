export class DragAndDropList {
  
  /**
   * 
   * @param {'replace' | 'before'} dndMode 
   * @param {function} dndCallback 
   */
  constructor(dndMode = 'replace', dndCallback = () => {}) {
    this.dndMode = dndMode;
    this.dndCallback = dndCallback;
    
    this.insertStyles();
    this.bindListeners();
  }

  /**
   * insert all necessary styles to drag and drop elements
   */
  insertStyles() {
    const style = document.createElement('style');
    style.innerHTML = `
      ul { padding: 0px; }
      ul .draggable { will-change: transform; cursor: move; transition: all 200ms; user-select: none; position: relative; }
      ul .draggable:after { content:'\\002630'; left: -20px; font-size: 10px; position: absolute; cursor: pointer; line-height: 5; transition: all 200ms; transition-timing-function: cubic-bezier(0.48, 0.72, 0.62, 1.5); transform: translateX(120%); opacity: 0; }
      ul .draggable:hover:after { opacity: 1; transform: translate(0); }
      .over { transform: scale(1.1, 1.1); }
    `;
    document.body.appendChild(style);
  }

  /**
   * bind all methos into addEventListeners drag and drop events
   */ 
  bindListeners() {
    this.dragDrop = this.dragDrop.bind(this);
    this.dragEnd = this.dragEnd.bind(this);
    this.dragEnter = this.dragEnter.bind(this);
    this.dragLeave = this. dragLeave.bind(this);
    this.dragOver = this.dragOver.bind(this);
    this.dragStart = this.dragStart.bind(this);
  }

  /**
   * 
   * @param {event} ev 
   */
  dragStart(ev) {
    ev.target.style.opacity = '0.4';
    this.dragSrcEl = ev.target;
    ev.dataTransfer.effectAllowed = 'move';
    ev.dataTransfer.setData('text/html', this.innerHTML);
  }

  /**
   * 
   * @param {event} ev 
   */
  dragEnter(ev) {
    ev.target.classList.add('over');
  }
 
  /**
   * 
   * @param {event} ev 
   */
  dragLeave(ev) {
    ev.stopPropagation();
    ev.target.classList.remove('over');
  }
 
  /**
   * 
   * @param {event} ev 
   */
  dragOver(ev) {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = 'move';
    return false;
  }
 
  /**
   * 
   * @param {event} ev 
   */
  dragDrop(ev) {
    if (this.dragSrcEl != ev.target) {
      if (this.dndMode === 'before') {
        ev.target.parentNode.insertBefore(this.dragSrcEl, ev.target);
      } else {
        console.log(ev.target.innerHTML);
        [this.dragSrcEl.innerHTML, ev.target.innerHTML] = [ev.target.innerHTML, this.dragSrcEl.innerHTML];
      }
      this.dndCallback();
    }
    return false;
  }
 
  /**
   * 
   * @param {event} ev 
   */
  dragEnd(ev) {
    const draggableElements = [...ev.target.parentNode.querySelectorAll('.draggable')];
    draggableElements.forEach((item) => {
      item.classList.remove('over');
    });
    ev.target.style.opacity = '1';
  }
 
  /**
   * Add all events to drag and drop the element received by param
   * @param {DOMObject} el 
   */
  addEventsDragAndDrop(el) {
    el.addEventListener('dragstart', this.dragStart, false);
    el.addEventListener('dragenter', this.dragEnter, false);
    el.addEventListener('dragover', this.dragOver, false);
    el.addEventListener('dragleave', this.dragLeave, false);
    el.addEventListener('drop', this.dragDrop, false);
    el.addEventListener('dragend', this.dragEnd, false);
  }

  /**
   * init method to make draganddropable all li element into and ul with data-id=draggable
   */
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