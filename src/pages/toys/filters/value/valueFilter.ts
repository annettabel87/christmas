import './valueFilter.css';
import { sortOption } from '../sort/sort';
import { CardsField } from '../../cardsField/cardsField';
import data from '../../../../data';


export interface IFilterValue {
  count: {
    min: number,
    max: number,
  },
  year: {
    min: number,
    max: number,
  },
  shape: string[],
  color: string[],
  size: string[], 
  favorite: boolean, 
  search: string,
}

export const filterByValue: IFilterValue = {
  count: {
    min: 1,
    max: 12,
  },
  year: {
    min: 1940,
    max: 2020,
  },
  shape: [],
  color: [],
  size: [],  
  favorite: false,
  search: '',
};
export class ValueFilter {
 

  private container: HTMLElement;  
  
  shapeContainer: HTMLElement;
  
  colorContainer: HTMLElement;
  
  sizeContainer: HTMLElement;
  
  favoriteContainer: HTMLElement;
  
  title: HTMLElement;

  favoriteSubtitle: HTMLElement;
  
  favoriteForm: HTMLElement;

  favoriteINput: HTMLInputElement;

  favoriteLabel: HTMLLabelElement;


  constructor() {

    
    this.container = document.createElement('div');    
    this.container.classList.add('value');    

    this.title = document.createElement('div'); 
    this.title.classList.add('filter-title');  
    this.title.innerText = 'Фильтр по значению';

    this.shapeContainer = document.createElement('div');  
    this.shapeContainer.classList.add('filter-shape');
    this.shapeContainer.innerHTML = `
    <p class="filter-subtitle">Форма</p>
    <button data-value="шар" ></button>
    <button data-value="колокольчик"></button>
    <button data-value="шишка" ></button>
    <button data-value="снежинка" ></button>
    <button data-value="фигурка"></button>`;
    
    this.shapeContainer.addEventListener('click', (e: MouseEvent) => {
      if (e.target) {
        const elem  = <HTMLButtonElement>e.target ;
        const value = elem.dataset.value;       
        if (elem.classList.contains('active')) {
          elem.classList.remove('active'); 
          if (value){
            const index = filterByValue.shape.indexOf(value);
            if (index > -1) {
              filterByValue.shape.splice(index, 1);
            }             
            this.update();
          }
        } else {
          elem.classList.add('active'); 
          if (value){
            filterByValue.shape.push(value);             
            this.update();       
          }
        }        
      } 
      
    });


    this.colorContainer = document.createElement('div');  
    this.colorContainer.classList.add('filter-color');
    this.colorContainer.innerHTML = `
     <p class="filter-subtitle">Цвет</p>
    <button data-value="белый"></button>
    <button data-value="желтый"></button>
    <button data-value="красный"></button>
    <button data-value="синий"></button>
    <button data-value="зелёный"></button>
    `;
   
    this.colorContainer.addEventListener('click', (e: MouseEvent)=> {
      if (e.target) {
        const elem  = <HTMLButtonElement>e.target;
        const value = elem.dataset.value;       
        if (elem.classList.contains('active')) {
          elem.classList.remove('active'); 
          if (value){
            const index = filterByValue.color.indexOf(value);
            if (index > -1) {
              filterByValue.color.splice(index, 1);
            }             
            this.update();
          }
        } else {
          elem.classList.add('active'); 
          if (value){
            filterByValue.color.push(value);             
            this.update();       
          }
        }        
      } 
      
    });

    this.sizeContainer = document.createElement('div');  
    this.sizeContainer.classList.add('filter-size');
    this.sizeContainer.innerHTML = `
    <p class="filter-subtitle">Размер</p>
    <button data-value="большой"></button>
    <button data-value="средний"></button>
    <button data-value="малый"></button>
    `;

    this.sizeContainer.addEventListener('click', (e: MouseEvent)=> {
      if (e.target) {
        const elem  = <HTMLButtonElement>e.target;
        const value = elem.dataset.value;       
        if (elem.classList.contains('active')) {
          elem.classList.remove('active'); 
          if (value){
            const index = filterByValue.size.indexOf(value);
            if (index > -1) {
              filterByValue.size.splice(index, 1);
            }             
            this.update();
          }
        } else {
          elem.classList.add('active'); 
          if (value){
            filterByValue.size.push(value);             
            this.update();    
          }
        }        
      }       
    });


    this.favoriteContainer = document.createElement('div');  
    this.favoriteContainer.classList.add('filter-favorite');
    this.favoriteSubtitle = document.createElement('p');  
    this.favoriteSubtitle.classList.add('filter-subtitle');
    this.favoriteSubtitle.innerText = 'Только любимые';
    this.favoriteForm = document.createElement('div');  
    this.favoriteForm.classList.add('favorite-form');
    this.favoriteINput = document.createElement('input');  
    this.favoriteINput.classList.add('filter-favorite-input');
    this.favoriteINput.type = 'checkbox';
    this.favoriteINput.id = 'checkbox';
    this.favoriteLabel = document.createElement('label');  
    this.favoriteLabel.classList.add('filter-favorite-input-label');
    this.favoriteLabel.setAttribute('for', 'checkbox');    
    this.favoriteContainer.append(this.favoriteSubtitle, this.favoriteForm );
    this.favoriteForm.append(this.favoriteINput,  this.favoriteLabel );
    
    this.favoriteForm.addEventListener('click', (e:MouseEvent) => {          
      const checkboxFavorite = <HTMLFormElement>e.target ;
      if (checkboxFavorite.checked) {
        filterByValue.favorite = true;   
        this.update();          
      } else {
        filterByValue.favorite = false;
        this.update();
      }     
    });
  }
   
  render() {    
    this.container.append(this.title, this.shapeContainer, this.colorContainer, this.sizeContainer, this.favoriteContainer);
    return (this.container);       
  }

  update() {
    const oldCardsField: HTMLElement | null = document.querySelector('.cards-container');
    const cardField = new CardsField(filterByValue, data).render(sortOption) as HTMLElement;
    if (oldCardsField !== null){
      const parentNode: HTMLElement | null = oldCardsField.parentElement;       
      parentNode?.replaceChild(cardField, oldCardsField);
    }
    const parentNode: HTMLElement | null = document.querySelector('.toys-page');
    parentNode?.append(cardField);
  }
  
}