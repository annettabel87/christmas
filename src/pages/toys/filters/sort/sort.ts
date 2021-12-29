import './sort.css';
import { CardsField } from '../../cardsField/cardsField';
import { filterByValue } from '../value/valueFilter';
import data from '../../../../data';
import {startFilterValue} from '../../toys';

export let sortOption: string;
export class SortCards {   

  private container: HTMLElement;  
  
  title: HTMLElement;

  select: HTMLElement;

  optionNameMax: HTMLOptionElement; 

  optionNameMin: HTMLOptionElement;

  optionCountMax: HTMLOptionElement;

  optionCountMin: HTMLOptionElement;

  btnReset: HTMLElement;

  constructor() {     
    this.container = document.createElement('div');    
    this.container.classList.add('sort');     
    this.title = document.createElement('div');    
    this.title.classList.add('sort-title');   
    this.select = document.createElement('select');    
    this.select.classList.add('sort-select');     
    this.optionNameMax = document.createElement('option'); 
    this.optionNameMax.value = 'sort-name-max';
    this.optionNameMax.innerText = 'По названию от А до Я';
    this.optionNameMin = document.createElement('option'); 
    this.optionNameMin.value = 'sort-name-min';
    this.optionNameMin.innerText = 'По названию от А до Я';
    this.optionCountMax = document.createElement('option'); 
    this.optionCountMax.value = 'sort-count-max';
    this.optionCountMax.innerText = 'По возрастанию количества';
    this.optionCountMin = document.createElement('option'); 
    this.optionCountMin.value = 'sort-count-min';
    this.optionCountMin.innerText = 'По убыванию количества';
    this.btnReset = document.createElement('button');    
    this.btnReset.classList.add('reset');  
    this.btnReset.innerText = 'Сброс фильтров';
    
    this.select.addEventListener('change', (e: Event) =>  {      
      if (e.target) {
        sortOption = (<HTMLSelectElement>e.target).value;    
        this.update(); 
      }         
    });

    this.btnReset.addEventListener('click', () => {
      const oldCardsField: HTMLElement | null = document.querySelector('.cards-container');
      const cardField = new CardsField(startFilterValue, data ).render(sortOption );
      if (oldCardsField !== null){
        const parentNode: HTMLElement | null = oldCardsField.parentElement;       
        parentNode?.replaceChild(cardField, oldCardsField);        
      }
      const parentNode: HTMLElement | null = document.querySelector('.toys-page');
      parentNode?.append(cardField);     
    });
  } 
  
  render() {    
   
    this.container.append(this.title);
    this.container.append(this.select);
    this.select.append(this.optionNameMax);
    this.select.append(this.optionNameMin);
    this.select.append(this.optionCountMax);
    this.select.append(this.optionCountMin);
    this.container.append(this.btnReset);
   
    return (this.container);     
  } 
  
  update() {
    const oldCardsField: HTMLElement | null = document.querySelector('.cards-container');
    const cardField = new CardsField(filterByValue, data ).render(sortOption );
    if (oldCardsField !== null){
      const parentNode: HTMLElement | null = oldCardsField.parentElement;       
      parentNode?.replaceChild(cardField, oldCardsField);        
    }
    const parentNode: HTMLElement | null = document.querySelector('.toys-page');
    parentNode?.append(cardField);
  }
  

}