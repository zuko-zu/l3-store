import { ViewTemplate } from '../../utils/viewTemplate';
import { View } from '../../utils/view';
import html from './searchTips.tpl.html';

export class SearchTips {
  view: View;

  constructor() {
    this.view = new ViewTemplate(html).cloneView();
  }

  attach($root: HTMLElement) {
    $root.innerHTML = '';
    $root.appendChild(this.view.root);
  }

  getTips() {
    return [
      {
        name: "чехол iphone 13 pro",
        link: '#'
      },
      {
        name: "коляски agex",
        link: '#'
      },
      {
        name: "яндекс станция 2",
        link: '#'
      },
    ]
  } 

  async render() {    
    const tips = this.getTips()
    const hintElements = this.view.searchTips.querySelectorAll('.search-tip');

    hintElements.forEach((element: HTMLLinkElement, i: number) => {
      element.innerHTML = tips[i].name;
      element.href = tips[i].link;
    });
  }
}

export const searchtipsComp = new SearchTips();