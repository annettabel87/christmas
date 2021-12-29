import './cardsField.css';
import  { Card }  from '../cards/card';
import { IFilterValue } from '../filters/value/valueFilter';


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


export class CardsField {
  private container: HTMLElement;

  filterOptions: IFilterValue;
  
  data: CardsProp[];

  constructor(filterOptions: IFilterValue, data: CardsProp[]){
    this.container = document.createElement('div');    
    this.container.classList.add('cards-container');  
    this.filterOptions = filterOptions;
    this.data = data;
  }

  render(sortOptions?: string) {
    this.data.sort((a: CardsProp, b: CardsProp)  => {
      if (sortOptions == 'sort-name-max') {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      }
      if (sortOptions == 'sort-name-min') {
        if (a.name > b.name) {
          return -1;
        }
        if (a.name < b.name) {
          return 1;
        }
        return 0;
      }
      if (sortOptions == 'sort-count-max') {
        if (a.count < b.count) {
          return -1;
        }
        if (a.count > b.count) {
          return 1;
        }
        return 0;
      }
      if (sortOptions == 'sort-count-min') {
        if (a.count > b.count) {
          return -1;
        }
        if (a.count < b.count) {
          return 1;
        }
        return 0;
      }   
    }).filter( (elem: CardsProp) => {
      return this.filterFunc(this.filterOptions.shape, elem.shape);
    })  
      .filter( (elem: CardsProp) => {
        return this.filterFunc(this.filterOptions.color, elem.color);
      }) 
      .filter( (elem: CardsProp) => {
        return this.filterFunc(this.filterOptions.size, elem.size);
      })   
      .filter( (elem: CardsProp) => {
        return this.filterFavoriteFunc(this.filterOptions.favorite, elem.favorite);
      })  
      .filter( (elem: CardsProp) => {
        return this.rangesFilter(this.filterOptions.count, elem.count);
      })  
      .filter( (elem: CardsProp) => {
        if (this.filterOptions.search !== '') {
          return this.searchFilter(this.filterOptions.search, elem.name);
        }
        return true;
      })   
      .filter( (elem: CardsProp) => {
        return this.rangesFilter(this.filterOptions.year, elem.year);
      })   
      .map((item: CardsProp) => {       
        const card: HTMLElement = new Card(item).render();
        this.container.append(card);

      });    
    
    return (this.container);
  }
  
  filterFunc(filterState: string[], elemValue: string) {
    if (filterState.length !== 0){
      for (let i = 0; i < filterState.length; i++) {
        if (filterState[i] === elemValue) {
          return true;
        }
      }
    } else {
      return true;
    }   
  }

  filterFavoriteFunc(filterValue: boolean, stateFavoriteValue: boolean) {
    if (filterValue) {
      if (filterValue === stateFavoriteValue) {
        return true;
      }
    } else {
      return true;
    }
  }

  rangesFilter(filterState: { min: number, max: number }, elemValue: string){
    const { min, max } = filterState;
    if (+elemValue >= min &&  +elemValue <= max) {
      return true;
    }
  }

  searchFilter(filterValue: string, elemValue: string){     
    if ((elemValue.toLowerCase()).includes((filterValue.toLowerCase()))){
      return true;
    }        
  }
}