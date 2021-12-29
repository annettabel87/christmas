
import './toys.css';
import  { IFilterValue, ValueFilter }  from './filters/value/valueFilter';
import  { RangesFilter }  from './filters/ranges/rangesfilter';
import  { SortCards }  from './filters/sort/sort';
import { CardsField } from './cardsField/cardsField';
import { sortOption } from '../toys/filters/sort/sort';
import data from '../../data';

export const startFilterValue: IFilterValue = {
  count: {
    min: 1,
    max: 12,
  },
  year: {
    min: 1940,
    max: 2020,
  },
  shape: ['шар', 'колокольчик', 'шишка', 'снежинка', 'фигурка'],
  color: ['белый', 'желтый', 'красный', 'синий', 'зелёный'],
  size: ['большой', 'средний', 'малый'], 
  favorite: false,   
  search: '',  
};

export class Toys {

  private parent: HTMLElement | null;

  private container: HTMLElement;  

  valueFilter:  HTMLElement;

  rangesFilter:  HTMLElement;

  cardsField:  HTMLElement ;

  sortCards:  HTMLElement;

  filtersContainer: HTMLElement;
 
 
  constructor() {
    
    this.parent = document.querySelector('.main');
    this.container = document.createElement('div');
    this.container.classList.add('toys-page');  
    this.filtersContainer = document.createElement('div');
    this.filtersContainer.classList.add('filters-container');   
    this.valueFilter = new ValueFilter().render();     
    this.rangesFilter = new RangesFilter().render();    
    this.sortCards = new SortCards().render();
    this.cardsField = new CardsField(startFilterValue, data).render(sortOption);    
  }

  render() {
    
    if (this.parent == null) {
      throw new Error;
    } else {      
      this.container.append(this.filtersContainer);
      this.filtersContainer.append( this.valueFilter);
      this.filtersContainer.append( this.rangesFilter);      
      this.filtersContainer.append( this.sortCards);
      this.container.append( this.cardsField);      
      this.parent.append(this.container);      
    }
  }

  clear() {
    this.container.remove();
  }
}