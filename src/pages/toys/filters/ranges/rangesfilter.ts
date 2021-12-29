import './rangesFilter.css';
import { filterByValue } from '../value/valueFilter';
import { CardsField } from '../../cardsField/cardsField';
import data from '../../../../data';
import { sortOption } from '../sort/sort';
export class RangesFilter {
 

  private container: HTMLElement;  
  
  rangesTitle: HTMLElement;

  countContainer: HTMLElement;

  rangesCountSubitle: HTMLElement;

  rangesCountInput1: HTMLInputElement;

  rangesCountInput2: HTMLInputElement;

  yearContainer: HTMLElement;

  rangesYeartSubitle: HTMLElement;

  rangesYearInput1: HTMLInputElement;

  rangesYearInput2: HTMLInputElement;

  rangesCountOutput1: HTMLOutputElement;

  rangesCountOutput2: HTMLOutputElement;

  rangesYearOutput1: HTMLOutputElement;

  rangesYearOutput2: HTMLOutputElement;

  constructor() {
  
      
    this.container = document.createElement('div');    
    this.container.classList.add('ranges');     
    
    this.rangesTitle = document.createElement('div');    
    this.rangesTitle.classList.add('ranges-title');
    this.rangesTitle.innerText = 'Фильтры по диапозону';

    this.countContainer = document.createElement('div');    
    this.countContainer.classList.add('count-container');

    this.rangesCountSubitle = document.createElement('p');    
    this.rangesCountSubitle.classList.add('ranges-subtitle');
    this.rangesCountSubitle.innerText = 'Количество экземпляров';
    
    this.rangesCountOutput1 = document.createElement('output');    
    this.rangesCountOutput1.id = 'count-ranges-output1';
    this.rangesCountOutput1.classList.add('output');

    this.rangesCountInput1 = document.createElement('input');    
    this.rangesCountInput1.id = 'count-ranges1';
    this.rangesCountInput1.type = 'range';
    this.rangesCountInput1.min = '1';
    this.rangesCountInput1.max = '12';
    this.rangesCountInput1.value = '1';
    this.rangesCountOutput1.innerText = `${this.rangesCountInput1.value}`;    

    
    this.rangesCountInput2 = document.createElement('input');    
    this.rangesCountInput2.id = 'count-ranges2';
    this.rangesCountInput2.type = 'range';
    this.rangesCountInput2.min = '1';
    this.rangesCountInput2.max = '12';
    this.rangesCountInput2.value = '12';   

    this.rangesCountOutput2 = document.createElement('output');    
    this.rangesCountOutput2.id = 'count-ranges-output2';
    this.rangesCountOutput2.classList.add('output');
    this.rangesCountOutput2.innerText = `${this.rangesCountInput2.value}`; 

   
    this.rangesCountInput1.addEventListener('input', () => {
      if ( +this.rangesCountInput1.value > + this.rangesCountInput2.value) {
        this.rangesCountInput2.value =  this.rangesCountInput1.value;             
      }
      this.rangesCountOutput1.innerText = `${this.rangesCountInput1.value}`;  
      filterByValue.count.min =  +this.rangesCountInput1.value;  
      this.update();
    });
    
    this.rangesCountInput2.addEventListener('input', () => {
      if ( +this.rangesCountInput2.value < + this.rangesCountInput1.value) {
        this.rangesCountInput1.value =  this.rangesCountInput2.value;            
      }
      this.rangesCountOutput2.innerText = `${this.rangesCountInput2.value}`;  
      filterByValue.count.max =  +this.rangesCountInput2.value;    
      this.update();
     
    });

    this.yearContainer = document.createElement('div');    
    this.yearContainer.classList.add('year-container');

    this.rangesYeartSubitle = document.createElement('p');    
    this.rangesYeartSubitle.classList.add('ranges-subtitle');
    this.rangesYeartSubitle.innerText = 'Количество экземпляров';
    
    this.rangesYearOutput1 = document.createElement('output');    
    this.rangesYearOutput1.id = 'year-ranges-output1';
    this.rangesYearOutput1.classList.add('output');

    this.rangesYearInput1 = document.createElement('input');    
    this.rangesYearInput1.id = 'year-ranges1';
    this.rangesYearInput1.type = 'range';
    this.rangesYearInput1.min = '1940';
    this.rangesYearInput1.max = '2020';
    this.rangesYearInput1.value = '1940';

    this.rangesYearOutput1.innerText = `${this.rangesYearInput1.value}`; 
    this.rangesYearInput1.addEventListener('input', () => {
      if ( +this.rangesCountInput1.value > + this.rangesYearInput2.value) {
        this.rangesYearInput2.value =  this.rangesYearInput1.value;             
      }
      this.rangesYearOutput1.innerText = `${this.rangesYearInput1.value}`; 
      filterByValue.year.min =  +this.rangesYearInput1.value;    
      this.update();
         
    });
    

    this.rangesYearOutput2 = document.createElement('output');    
    this.rangesYearOutput2.id = 'year-ranges-output2';
    this.rangesYearOutput2.classList.add('output');

    this.rangesYearInput2 = document.createElement('input');    
    this.rangesYearInput2.id = 'year-ranges2';
    this.rangesYearInput2.type = 'range';
    this.rangesYearInput2.min = '1940';
    this.rangesYearInput2.max = '2020';
    this.rangesYearInput2.value = '2020';

    this.rangesYearOutput2.innerText = `${this.rangesYearInput2.value}`; 
    this.rangesYearInput2.addEventListener('input', () => {
      if ( +this.rangesYearInput2.value < + this.rangesYearInput1.value) {
        this.rangesYearInput1.value =  this.rangesYearInput2.value;            
      }
      this.rangesYearOutput2.innerText = `${this.rangesYearInput2.value}`; 
      filterByValue.year.max =  +this.rangesYearInput2.value;    
      this.update();
    });  
  }
  
  render() {      
    this.container.append(this.rangesTitle, this.rangesCountSubitle, this.countContainer, this.rangesYeartSubitle, this.yearContainer);
    this.countContainer.append( this.rangesCountOutput1, this.rangesCountInput1,  this.rangesCountInput2, this.rangesCountOutput2);
    this.yearContainer.append(  this.rangesYearOutput1, this.rangesYearInput1,  this.rangesYearInput2,  this.rangesYearOutput2);
    return (this.container);   
  }

  update(){
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