import './footer.css';


export class Footer {
  
  footer: HTMLElement;

  footerGithub: HTMLElement;

  footerGithubLink: HTMLAnchorElement;

  footerYear: HTMLElement;

  footerRss: HTMLElement;

  footerRssLink: HTMLAnchorElement;


  constructor() {
    this.footer = document.createElement('footer');
    this.footer.classList.add('footer');
    this.footerGithub =  document.createElement('div');
    this.footerGithub.classList.add('footer-item');

    this.footerGithubLink = document.createElement('a');
    this.footerGithubLink.classList.add('footer-link');
    this.footerGithubLink.classList.add('github');
    this.footerGithubLink.href = 'https://github.com/annettabel87';

    this.footerYear =  document.createElement('div');
    this.footerYear.classList.add('footer-item');
    this.footerYear.innerText = '© 2021';

    this.footerRss =  document.createElement('div');
    this.footerRss.classList.add('footer-item');

    this.footerRssLink = document.createElement('a');
    this.footerRssLink.classList.add('footer-link');
    this.footerRssLink.classList.add('rss');
    this.footerRssLink.href = 'https://rs.school/js/';

  }

  render() {
    this.footer.append( this.footerGithub, this.footerYear,  this.footerRss);
    this.footerGithub.append( this.footerGithubLink);
    this.footerRss.append(this.footerRssLink);

    return this.footer;
  }
}



