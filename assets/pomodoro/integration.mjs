import {mountTimer} from './widget.mjs?v=equal-controls9';

// Scope every accepted preview selector inside one shadow tree. No global
// button/input/.track styles, preview fixtures, or account/backend ownership.
export async function initPomodoro(options={}) {
  if(document.getElementById('midoriPomodoro'))return;
  if(['transparent','chromakey'].includes(document.documentElement.dataset.bg))return;
  const [htmlResponse,cssResponse]=await Promise.all([
    fetch(new URL('./widget.html?v=equal-controls9',import.meta.url)),
    fetch(new URL('./widget.css?v=equal-controls9',import.meta.url)),
  ]);
  if(!htmlResponse.ok||!cssResponse.ok)throw new Error('Pomodoro assets unavailable');
  const [html,css]=await Promise.all([htmlResponse.text(),cssResponse.text()]);
  const host=document.createElement('div');host.id='midoriPomodoro';
  const root=host.attachShadow({mode:'open'});
  const style=document.createElement('style');style.textContent=css;root.append(style);
  const template=document.createElement('template');template.innerHTML=html;root.append(template.content.cloneNode(true));
  const syncTheme=()=>{host.dataset.theme=document.documentElement.dataset.theme;};syncTheme();
  const observer=new MutationObserver(syncTheme);observer.observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
  document.body.append(host);
  mountTimer(root,options);
}
