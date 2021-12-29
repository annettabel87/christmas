import './app.css';
import { Toys } from '../toys/toys';



export class App {
  private parent: HTMLElement | null;

  private button: HTMLElement;

  private container: HTMLElement;   
  

  constructor() {
    
    this.parent = document.createElement('main');
    this.parent.classList.add('main');
    this.button = document.createElement('button');
    this.container = document.createElement('div');
   
   
  }

  render() {
    if (this.parent == null) {
      throw new Error;
    } else {      
      this.container.classList.add('main-page');
      this.button.classList.add('start-btn');
      this.button.innerText = 'Начать';
      
      this.container.innerHTML = `
      <div class="title">Помоги бабушке «Наряди ёлку»</div>`;
      this.container.append(this.button);
      this.parent.append(this.container);
      this.button.addEventListener('click', () => this.toToys());
    }

    return this.parent;
  }

  clear() {    
    if (this.parent == null) {
      throw new Error;      
    } else {
      this.container.remove();
      
    }
  }
  
  toToys() {  
    if (this.parent == null) {
      throw new Error;
    } else {  
      this.clear();    
      new Toys().render();
    
    }
  }
}
