import './modal.css';

export class Modal {

  modal: HTMLElement;

  parent: HTMLElement;

  constructor() {
    this.parent = document.body;
    this.modal = document.createElement('div');    
    this.modal.classList.add('select-modal'); 
    this.modal.addEventListener('click', (e) => { if (e.target === this.modal) {this.clear();}});
  }

  render() {    
     
    this.modal.innerHTML = `
        Извините, все слоты заполнены
          `;
    this.parent.append(this.modal);        
         
  }

  clear() {
    if (this.parent == null) {
      throw new Error;      
    } else {
      this.modal.remove();
    }
  }
}