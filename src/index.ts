import './global.css';
import { App } from './pages/app/app';
import { Header } from './pages/header/header';
import { Footer } from './pages/footer/footer';

const header = new Header().render();
const app = new App().render();
const footer = new Footer().render();

const parent = document.body;
parent.append(header, app, footer);


