
import './treePage.css';
import { Settings } from './settings/settings';
import { MainTree } from './mainTree/mainTree';
import { FavoritesToys } from './favoritesToys/favoritesToys'
export class TreePages {

  private parent: HTMLElement | null;

  private container: HTMLElement;  

  settings:  HTMLElement;

  mainTree:  HTMLElement;

  treeContainer: HTMLElement;
 
  favoritesToys: HTMLDivElement;
 
  constructor() {
    
    this.parent = document.querySelector('.main');
    this.container = document.createElement('div');
    this.container.classList.add('tree-page');  
    this.treeContainer = document.createElement('div');
    this.treeContainer.classList.add('treePage-container');   
    this.settings = new Settings().render();     
    this.mainTree = new MainTree().render();
    this.favoritesToys = new FavoritesToys().render();
    
  }

  render() {
    
    if (this.parent == null) {
      throw new Error;
    } else {      
      this.container.append(this.treeContainer);
      this.treeContainer.append(this.settings, this.mainTree, this.favoritesToys);
       
      this.parent.append(this.container);      
    }
  }

  clear() {
    this.container.remove();
  }
}