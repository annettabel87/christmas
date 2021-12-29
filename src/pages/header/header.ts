import './header.css';
import { CardsField } from '../toys/cardsField/cardsField';
import { filterByValue } from '../toys/filters/value/valueFilter';
import data from '../../data';
import { sortOption } from '../toys/filters/sort/sort';
import { Toys } from '../toys/toys';
import { TreePages } from '../treePage/treePage';
import { App } from '../app/app';
export class Header {  
  

  header: HTMLHeadElement;

  headerContainer: HTMLElement;

  nav: HTMLElement;

  navContainer: HTMLUListElement;

  navItemLogo: HTMLLIElement;

  navLinkLogo: HTMLAnchorElement;

  navItemToy: HTMLLIElement;

  navLinkToy: HTMLAnchorElement;

  navItemTree: HTMLLIElement;

  navLinkTree: HTMLAnchorElement;

  headerControls: HTMLElement;

  search: HTMLInputElement;

  selectToys: HTMLElement;



  constructor() {

    

    this.header = document.createElement('header');    
    this.header.classList.add('header'); 
        
    this.headerContainer = document.createElement('div');    
    this.headerContainer.classList.add('header-container');

    this.nav = document.createElement('nav');    
    this.nav.classList.add('navigation'); 

    this.navContainer = document.createElement('ul');    
    this.navContainer.classList.add('nav-container');

    this.navItemLogo = document.createElement('li');    
    this.navItemLogo.classList.add('nav-item');

    this.navLinkLogo = document.createElement('a');    
    this.navLinkLogo.classList.add('nav-link');
    this.navLinkLogo.classList.add('logo');
    this.navItemToy = document.createElement('li');    
    this.navItemToy.classList.add('nav-item');
    this.navLinkLogo.addEventListener( 'click', () => {     
      this.toStart();
    });

    this.navLinkToy = document.createElement('a');    
    this.navLinkToy.classList.add('nav-link');
    this.navLinkToy.innerText = 'Игрушки';
    this.navLinkToy.addEventListener( 'click', () => {
      this.navLinkToy.classList.add('active');
      this.navLinkTree.classList.remove('active');
      this.toToys();
    });

    this.navItemTree = document.createElement('li');    
    this.navItemTree.classList.add('nav-item');

    this.navLinkTree = document.createElement('a');    
    this.navLinkTree.classList.add('nav-link');
    this.navLinkTree.innerText = 'Ёлка';
    this.navLinkTree.addEventListener( 'click', () => {
      this.navLinkTree.classList.add('active');
      this.navLinkToy.classList.remove('active');
      this.toTree();
    });

         
    this.headerControls = document.createElement('div');    
    this.headerControls.classList.add('header-controls');

    this.search = document.createElement('input');    
    this.search.classList.add('search');
    this.search.type = 'search';
    this.search.autocomplete = 'off';
    this.search.placeholder = 'Введите название игрушки';
    this.search.addEventListener('keyup', (e: KeyboardEvent) =>{    
      if (e.target) {
        const value = (<HTMLInputElement>e.target).value;
        filterByValue.search = value;      
        this.update();
      }
    } );

    this.selectToys = document.createElement('div');    
    this.selectToys.classList.add('select-toys');
    this.selectToys.innerHTML = '<span>0</span>';
  }

  render() {
    this.header.append(this.headerContainer);
    this.headerContainer.append(this.nav,  this.headerControls);
    this.nav.append( this.navContainer);
    this.navContainer.append( this.navItemLogo,  this.navItemToy, this.navItemTree);
    this.navItemLogo.append( this.navLinkLogo);
    this.navItemToy.append( this.navLinkToy);
    this.navItemTree.append(this.navLinkTree);
    this.headerControls.append( this.search, this.selectToys);

    return this.header;
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

  clear() {    
    const parent = document.body.querySelector('.main');
    if (parent) {
      parent.innerHTML = '';
    }    
  }

  toToys() {  
   
    this.clear();    
    new Toys().render();   
    
  }

  toTree() {  
   
    this.clear();    
    new TreePages().render();   
    
  }

  toStart() {  
   
    const parent = document.body.querySelector('.main');   
    parent?.remove();
    const app = new App().render();   
    this.header.after(app);
  }
}



