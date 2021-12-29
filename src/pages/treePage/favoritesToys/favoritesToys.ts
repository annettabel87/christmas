import './favoritesToys.css';
import { selectCardsArr } from '../../toys/cards/card';


export class FavoritesToys {
  
  container: HTMLDivElement;

  toysContainer: HTMLDivElement;

  toysContainerTitle: HTMLParagraphElement;

  decoratedContainer: HTMLDivElement;

  decoratedContainerTitle: HTMLParagraphElement;

  decoratedTreeContainer: HTMLDivElement;


  constructor() {

    this.container = document.createElement('div');
    this.container.classList.add('favorite-container');

    this.toysContainer = document.createElement('div');
    this.toysContainer.classList.add('toys-container');

    this.toysContainerTitle = document.createElement('p');
    this.toysContainerTitle.classList.add('container-title');
    this.toysContainerTitle.innerText = 'Игрушки';

    this.toysContainer.append(this.toysContainerTitle);
    
    const nonSelectArr = ['1', '1', '2', '2', '2', '2', '2', '3', '3', '3', '4', '4', '5', '5', '5', '5', '6', '6', '6', '6'];
    
   
    if (selectCardsArr.length !== 0) {
      this.renderCard(selectCardsArr);
     
    } else {
      this.renderCard(nonSelectArr);     
    }     

    this.decoratedContainer = document.createElement('div');
    this.decoratedContainer.classList.add('decorated-container');

    this.decoratedContainerTitle = document.createElement('p');
    this.decoratedContainerTitle.classList.add('container-title');
    this.decoratedContainerTitle.innerText = 'Вы нарядили';

    

    this.decoratedTreeContainer = document.createElement('div');
    this.decoratedTreeContainer.classList.add('decorated-tree-container');

    const treesCount = 6;

    for (let i = 1; i <= treesCount; i++) {
      
      const tree  = document.createElement('div') ;
      tree.classList.add('decorated-tree');
      tree.dataset.tree = `${i}`;
     // tree.style.backgroundImage = `url(../../../assets/tree/${i}.png)`;
      const decoratedTreeImg = document.createElement('img') ;
      decoratedTreeImg.src = `../../../assets/tree/${i}.png`;
      decoratedTreeImg.alt = 'decorated tree';
      decoratedTreeImg.classList.add('decorated-tree-img');
      tree.append(decoratedTreeImg);
      this.decoratedTreeContainer.append(tree);
    }


    this.decoratedContainer.append(this.decoratedContainerTitle, this.decoratedTreeContainer);
  }

  render() {
    this.container.append( this.toysContainer, this.decoratedContainer)  ;
    return this.container;
  }

  renderCard(selectArr: string[]) {
    const toysCount = (new Set(selectArr)).size;
    interface ISelect { 
      [key: string]: number,
    }
    const countDuplicate: ISelect = {};
    for (let i = 0; i < selectArr.length; i++){ 
      if (countDuplicate[selectArr[i]]){
        countDuplicate[selectArr[i]] += 1;
      } else {
        countDuplicate[selectArr[i]] = 1;
      }
    }      
      
    for (let i = 0; i < toysCount; i++) {
      const imgNum = Object.keys(countDuplicate)[i];
      const imgCount = countDuplicate[imgNum];
      const toysCard  = document.createElement('div') ;
      toysCard.classList.add('toys-card');
  
      const toysCardCount  = document.createElement('span') ;
      toysCardCount.classList.add('count-card');
      toysCard.append(toysCardCount);
          
        
      toysCard.dataset.toyNum = `${imgNum}`;   
      toysCardCount.innerText = imgCount.toString();
        
      for (let j = 1; j <= imgCount; j++) {
        const toysImg =  document.createElement('img');
        toysImg.classList.add('favorete-card-img');
        toysImg.src = `../../../assets/toys/${imgNum}.png`;
        toysImg.alt = 'toy';
        toysImg.draggable = true;
        toysImg.dataset.imgNum = imgNum;
        toysImg.id = `${imgNum}-${j}`;
        toysCard.append(toysImg);
     
        
      
        toysImg.onmousedown = function (event) {
          const area = document.querySelector('area');
          const shiftX = event.clientX - toysImg.getBoundingClientRect().left;
          const shiftY = event.clientY - toysImg.getBoundingClientRect().top;
        
         
          toysImg.style.zIndex = '1000';
          toysImg.style.width = '50px';

          toysCardCount.innerText = `${(imgCount - 1)}`;
          area?.append(toysImg);
                
        
          
          function moveAt(pageX: number, pageY: number) {
            toysImg.style.left = pageX - shiftX + 'px';
            toysImg.style.top = pageY - shiftY + 'px';
          }

          moveAt(event.pageX, event.pageY);

          function onMouseMove(e: MouseEvent) {
            moveAt(e.pageX, e.pageY);
           
          }
        
          
          document.addEventListener('mousemove', onMouseMove);
        
          
          toysImg.onmouseup = function () {
           
            document.removeEventListener('mousemove', onMouseMove);
            toysImg.onmouseup = null;
          };
        
        };
        
        toysImg.ondragstart = function () {
          return false;
        };
      }
      this.toysContainer.append(toysCard);
    }
  }
}