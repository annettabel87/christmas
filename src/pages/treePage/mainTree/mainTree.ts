import './mainTree.css';
import { treeSettings } from '../settings/settings';

export class MainTree {

  container: HTMLDivElement;

  treeContainer: HTMLImageElement;

  snowFlackesContainer: HTMLDivElement;

  map: HTMLMapElement;

  treeArea: HTMLAreaElement;

  garlandContainer: HTMLDivElement;

  constructor() {

    this.container = document.createElement('div');
    this.container.classList.add('mainTree-container');
    this.container.style.backgroundImage = `url(../../../assets/bg/${treeSettings.background}.jpg)`;

    this.map = document.createElement('map');
    this.map.name = 'tree-map';

    this.treeArea = document.createElement('area');
    this.treeArea.shape = 'polly';
    this.treeArea.coords = '113,218,6,555,120,690,255,704,358,701,491,553,393,232,252,0';
    this.map.append(this.treeArea);
    this.treeContainer = document.createElement('img');
    this.treeContainer.classList.add('tree-container');   
    this.treeContainer.src = `../../../assets/tree/${treeSettings.tree}.png`;
    this.treeContainer.alt = 'tree';

    this.snowFlackesContainer = document.createElement('div');
    this.snowFlackesContainer.classList.add('snowflakes-container');
    this.snowFlackesContainer.classList.add('hide');

    
    this.garlandContainer = document.createElement('div');
    this.garlandContainer.classList.add('garland-tree-container');
    

    const garlandRows = 8;
    let lampCount = 4;
    let width = 70;
    let translate = 35;
    for (let i = 0; i < garlandRows; i++) {
      const row = document.createElement('ul');
      row.classList.add('ligth');
      width += 50;
      row.style.width = `${width }px`;
      row.style.height = `${width }px`;
      this.garlandContainer.append(row);
      lampCount += 2;
      translate += 25;
      
      let rotate = 43;
      for (let j = 0; j < lampCount; j++) {
        const lamp = document.createElement('li');
        lamp.classList.add(`${treeSettings.garland}`);
        lamp.classList.add('lamp');
        lamp.style.animationName = `${(treeSettings.garland !== 'multiColor') ? treeSettings.garland : ''}`;
        
        rotate += 10;
        lamp.style.transform = `rotate(${rotate}deg) translate(${translate}px) rotate(-${rotate}deg)`;
      
        row.append(lamp);
      }
    }

  }

  render() {

    this.container.append(this.map, this.garlandContainer, this.treeContainer, this.snowFlackesContainer);
    return this.container;
  }
}