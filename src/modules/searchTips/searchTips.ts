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

  async render() {
    const tipsData = [
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
    
    const hintElements = this.view.searchTips.querySelectorAll('.search-tip');

    hintElements.forEach((element: HTMLLinkElement, i: number) => {
      element.innerHTML = tipsData[i].name;
      element.href = tipsData[i].link;
    });
  }
}

export const searchtipsComp = new SearchTips();