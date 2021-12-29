import './settings.css';
import { MainTree } from '../mainTree/mainTree';
const colorGarland = ['multiColor', 'blue', 'red', 'yellow', 'white'];

interface ITreeSettings {
  background: string,
  tree: string,
  garland?: string,
}

export const treeSettings: ITreeSettings = {
  background: '1',
  tree: '1',
  garland: 'red',
};


export class Settings {
    
  container: HTMLDivElement;

  audioSnowContainer: HTMLDivElement;

  audioBtn: HTMLButtonElement;

  snowBtn: HTMLButtonElement;

  treesContainer: HTMLDivElement;

  treesContainerTitle: HTMLParagraphElement;

  backgroundContainerTitle: HTMLParagraphElement;

  backgroundContainer: HTMLDivElement;

  garlandContainer: HTMLDivElement;

  garlandContainerTitle: HTMLParagraphElement;

  garlandBtnContainer: HTMLDivElement;
  
  garlandSwitchContainer: HTMLDivElement;

  garlandSwitchInput: HTMLInputElement;

  garlandSwitchLabel: HTMLLabelElement;

  garlandSwitchLabelRound: HTMLDivElement;

  audio: HTMLAudioElement;

  constructor() {

    
    this.container = document.createElement('div');
    this.container.classList.add('settings-container');

    this.audioSnowContainer = document.createElement('div');
    this.audioSnowContainer.classList.add('audio-snow-container');

    this.audioBtn = document.createElement('button');
    this.audioBtn.classList.add('button-audio');
    this.audio = new Audio('../../../assets/audio/audio.mp3');
    this.audio.volume = 0.3;
    this.audioBtn.addEventListener('click', () => this.playAudio());

    this.snowBtn = document.createElement('button');
    this.snowBtn.classList.add('button-snow');
    this.snowBtn.addEventListener('click', () => this.toggleSnow());

    this.treesContainer = document.createElement('div');
    this.treesContainer.classList.add('trees-container');

    this.treesContainerTitle = document.createElement('p');
    this.treesContainerTitle.classList.add('container-title');
    this.treesContainerTitle.innerText = 'Выберите ёлку';

    this.treesContainer.append(this.treesContainerTitle);
    const treesCount = 6;

    for (let i = 1; i <= treesCount; i++) {
      
      const tree  = document.createElement('div') ;
      tree.classList.add('tree');
      tree.dataset.tree = `${i}`;
      tree.style.backgroundImage = `url(../../../assets/tree/${i}.png)`;
      this.treesContainer.append(tree);
    }
    this.treesContainer.addEventListener('click', (e) => {
      const treeElement  = <HTMLDivElement>e.target;
      const tree = treeElement.dataset.tree; 
      if (tree) {
        treeSettings.tree = tree;
        this.update();
      }    
    });


    this.backgroundContainer = document.createElement('div');
    this.backgroundContainer.classList.add('background-container');

    this.backgroundContainerTitle = document.createElement('p');
    this.backgroundContainerTitle.classList.add('container-title');
    this.backgroundContainerTitle.innerText = 'Выберите фон';

    this.backgroundContainer.append(this.treesContainerTitle);
    const backgroundCount = 10;

    for (let i = 1; i <= backgroundCount; i++) {
      const bg = document.createElement('div');
      bg.classList.add('background');
      bg.dataset.bg = `${i}`;
      bg.style.backgroundImage = `url(../../../assets/bg/${i}.jpg)`;
      this.backgroundContainer.append(bg);
    }

    this.backgroundContainer.addEventListener('click', (e) => {
      const bgElement  = <HTMLDivElement>e.target;
      const bg = bgElement.dataset.bg; 
      if (bg) {
        treeSettings.background = bg;
        this.update();
      }    
    });

    this.garlandContainer = document.createElement('div');
    this.garlandContainer.classList.add('garland-container');

    this.garlandContainerTitle = document.createElement('p');
    this.garlandContainerTitle.classList.add('container-title');
    this.garlandContainerTitle.innerText = 'Гирлянда';

    this.garlandBtnContainer = document.createElement('div');
    this.garlandBtnContainer.classList.add('garland-btn-container');

    for (let i = 0; i < colorGarland.length; i++) {
      const garlandBtn = document.createElement('button');
      garlandBtn.classList.add('garland-btn');
      garlandBtn.dataset.color = `${colorGarland[i]}`;     
      garlandBtn.classList.add(`${colorGarland[i]}-btn`);
      this.garlandBtnContainer.append(garlandBtn);
    }
    this.garlandBtnContainer.addEventListener('click', (e) => {
      const garlandElement  = <HTMLDivElement>e.target;
      const garlandColor = garlandElement.dataset.color; 
      if (garlandColor) {
        treeSettings.garland = garlandColor;
        this.update();
      }    
    });
    this.garlandSwitchContainer = document.createElement('div');
    this.garlandSwitchContainer.classList.add('garland-switch-container');

    this.garlandSwitchInput = document.createElement('input');
    this.garlandSwitchInput.type = 'checkbox';
    this.garlandSwitchInput.name = 'switch';
    this.garlandSwitchInput.classList.add('switch-input');
    this.garlandSwitchInput.id = 'switchCarland';
    this.garlandSwitchInput.checked = true;
    
    this.garlandSwitchInput.addEventListener('change', (e) => {      
      const garlandContainer = document.querySelector('.garland-tree-container');
     
      const checkedEl = <HTMLInputElement>e.target;
      const chekValue = checkedEl.checked;
      if (chekValue) {
        garlandContainer?.classList.remove('hide');
        
      } else {
        garlandContainer?.classList.add('hide');
       
      }
    });


    this.garlandSwitchLabel = document.createElement('label');
    this.garlandSwitchLabel.setAttribute('for', 'switchCarland');   
    this.garlandSwitchLabel.classList.add('switch-label');

    this.garlandSwitchLabelRound = document.createElement('div');
    this.garlandSwitchLabelRound.classList.add('garland-switch-slider');
    this.garlandSwitchLabelRound.classList.add('round');
  }

  render() {
    this.container.append(this.audioSnowContainer, this.treesContainer, this.backgroundContainer, this.garlandContainer);
    this.audioSnowContainer.append(this.audioBtn, this.snowBtn);
    this.garlandContainer.append( this.garlandContainerTitle, this.garlandBtnContainer, this.garlandSwitchContainer);
    this.garlandSwitchContainer.append( this.garlandSwitchLabel);
    this.garlandSwitchLabel.append(this.garlandSwitchInput, this.garlandSwitchLabelRound);
    return this.container;
  }

  update() {
    const oldMainTreePage = document.querySelector('.mainTree-container');
    if (oldMainTreePage) {
      oldMainTreePage.remove();
    }    
    const newMainTreePage = new MainTree().render();
    this.container.after(newMainTreePage);
  }

  toggleSnow() {
    const snowflakesContainer = document.querySelector('.snowflakes-container ');   
    if (snowflakesContainer && snowflakesContainer.classList.contains('hide')) {
      snowflakesContainer.classList.remove('hide');   
      this.snowBtn.classList.add('active'); 
      this.createSnowFlake();
    
    } else {
      if (snowflakesContainer) {
        snowflakesContainer.classList.add('hide');   
        this.snowBtn.classList.remove('active'); 
      }       
    }   
  }

  createSnowFlake(){
    const snowflakesContainer = document.querySelector('.snowflakes-container ');
    const countSnowflakes = 30;
    for (let i = 0; i < countSnowflakes; i++){
      const snowFlake = document.createElement('i');
      snowFlake.classList.add('snowflake');    
      snowFlake.style.left = Math.random() * 790 + 'px';
      snowFlake.style.animationDuration = Math.random() * 3 + 2 + 's'; 
      snowFlake.style.opacity = Math.random().toString();
      snowFlake.style.width = Math.random() * 10 + 10 + 'px';

      snowflakesContainer?.append(snowFlake);
    }    
  }

  playAudio() {
   
   
    if (this.audio.paused) {
      this.audio.play();
      this.audioBtn.classList.add('active');
    } else {
      this.audio.pause();
      this.audioBtn.classList.remove('active');
    }      
  }
  

}