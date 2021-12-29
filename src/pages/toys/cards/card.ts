import './card.css';
import { Modal } from './modal';

type CardsProp = {    
    
  num: string,
  name: string,
  count: string,
  year: string,
  shape: string,
  color: string,
  size: string,
  favorite: boolean,
      
};
export const selectCardsArr: string[] = [];
export class Card {
 

  private container: HTMLDivElement;    

  num: string;

  name: string;

  count: string;

  year: string;

  shape: string;

  color: string;

  size: string;

  favorite: boolean;

  headerSelect: HTMLElement | null; 
  
  
  
  constructor(cardsData: CardsProp) {
    
    this.num = cardsData.num;  
    this.name = cardsData.name;  
    this.count = cardsData.count;  
    this.year = cardsData.year;  
    this.shape = cardsData.shape;  
    this.color = cardsData.color;  
    this.size = cardsData.size;  
    this.favorite = cardsData.favorite;  
    this.container = document.createElement('div');    
    this.container.classList.add('card');     
    this.container.dataset.num = this.num;    
    this.headerSelect = document.querySelector('.select-toys span');
    this.container.addEventListener('click',  ()=> this.selectCards());   
    
  }
    
  render() {    
     
    this.container.innerHTML = `
       <h2 class="card-title">${this.name}</h2>
       <img class="card-img" src="./assets/toys/${this.num}.png" alt="toy">
       <div class="card-info">
         <p class="count">Количество: <span>${this.count}</span></p>
         <p class="year">Год покупки: <span>${this.year}</span></p>
         <p class="shape">Форма: <span>${this.shape}</span></p>
         <p class="color">Цвет: <span>${this.color}</span></p>
         <p class="size">Размер: <span>${this.size}</span></p>
         <p class="favorite">Любимая: <span> ${this.favorite ? 'да' : 'нет'}</span></p>
       </div>
      `;
    return (this.container);        
     
  }

  selectCards() {  
    const cardNumber = this.container.dataset.num;  
    let count ;
    const countEl = this.container.querySelector('.count span'); 
    if (countEl && countEl.textContent) {
      count = +(countEl.textContent);
    }    
    
    if (this.container.classList.contains('select')) {
      this.container.classList.remove('select');         
      while (selectCardsArr.indexOf(cardNumber) !== -1) {  
        const index = selectCardsArr.indexOf(cardNumber);      
        selectCardsArr.splice(index, 1);      
      }
      localStorage.setItem('selectcardsarr', JSON.stringify(selectCardsArr));
      this.renewHeaderSelect();
    
    }  else  {
     
      this.container.classList.add('select'); 
      if (count && cardNumber && selectCardsArr.length < 20) {
        for ( let i = 0; i < count; i++) {          
          selectCardsArr.push(cardNumber);  
          while (selectCardsArr.length > 20) {
            selectCardsArr.pop();
          }         
          localStorage.setItem('selectcardsarr', JSON.stringify(selectCardsArr));
          if (selectCardsArr.length != 0 && selectCardsArr.length == 20) {
            new Modal().render();      
            console.log('Извините, все слоты заполнены');
          }
          this.renewHeaderSelect();
          
        }
      }
     
    }   
  }
  
  renewHeaderSelect() {
    if ( this.headerSelect == null ) {
      throw new Error;
    } else {
      this.headerSelect.innerText = 
        (!localStorage.getItem('selectcardsarr') ? '0' :
          (JSON.parse(localStorage.getItem('selectcardsarr'))).length);
    }   
  }
 
  
}

