/* One local controller; no scroll listeners, timers or animation queues. */
(() => {
  'use strict';
  const root=document.querySelector('#faq.home-faq-fold');
  if(!root)return;
  const stage=root.querySelector('.hf-stage');
  const tabs=root.querySelector('.hf-tabs');
  const paper=root.querySelector('.hf-paper');
  const buttons=[...root.querySelectorAll('.hf-tab')];
  const panels=[...root.querySelectorAll('.hf-answer')];
  const mobile=matchMedia('(max-width: 700px)');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let selected=0,contentAnimation=null;

  function select(index,{animate=true,focus=false}={}){
    if(selected===index && !panels[index].hidden)return;
    selected=index;
    contentAnimation?.cancel();
    contentAnimation=null;
    stage.dataset.active=String(index);
    buttons.forEach((button,i)=>{
      const active=i===index;
      button.classList.toggle('is-selected',active);
      button.setAttribute(mobile.matches?'aria-expanded':'aria-selected',String(active));
      button.tabIndex=mobile.matches||active?0:-1;
      panels[i].hidden=!active;
    });
    if(animate&&!reduced.matches){
      contentAnimation=panels[index].querySelector('.hf-answer-copy').animate(
        [{opacity:0,transform:'translateY(6px)'},{opacity:1,transform:'translateY(0)'}],
        {duration:180,easing:'ease-out'}
      );
    }
    if(focus)buttons[index].focus();
  }
  function layout(){
    contentAnimation?.cancel();
    contentAnimation=null;
    if(!mobile.matches&&panels[selected].hidden){
      panels[selected].hidden=false;
      buttons[selected].classList.add('is-selected');
    }
    buttons.forEach((button,i)=>{
      if(mobile.matches){
        paper.insertBefore(button,panels[i]);
        button.removeAttribute('role');
        button.removeAttribute('aria-selected');
        button.setAttribute('aria-expanded',String(i===selected));
        button.tabIndex=0;
        panels[i].setAttribute('role','region');
        panels[i].removeAttribute('tabindex');
      }else{
        tabs.append(button);
        button.setAttribute('role','tab');
        button.removeAttribute('aria-expanded');
        button.setAttribute('aria-selected',String(i===selected));
        button.tabIndex=i===selected?0:-1;
        panels[i].setAttribute('role','tabpanel');
        panels[i].tabIndex=0;
      }
    });
    tabs.hidden=mobile.matches;
  }
  root.addEventListener('click',event=>{
    const button=event.target.closest('[data-hf-index]');
    if(!button||!root.contains(button))return;
    const index=Number(button.dataset.hfIndex);
    if(mobile.matches&&index===selected&&!panels[index].hidden){
      contentAnimation?.cancel();contentAnimation=null;
      panels[index].hidden=true;
      button.classList.remove('is-selected');
      button.setAttribute('aria-expanded','false');
    }else select(index);
  });
  tabs.addEventListener('keydown',event=>{
    if(!event.target.closest('[data-hf-index]'))return;
    let next=selected;
    if(event.key==='ArrowRight')next=(selected+1)%3;
    else if(event.key==='ArrowLeft')next=(selected+2)%3;
    else if(event.key==='Home')next=0;
    else if(event.key==='End')next=2;
    else return;
    event.preventDefault();select(next,{focus:true});
  });
  mobile.addEventListener('change',layout);
  reduced.addEventListener('change',()=>{if(reduced.matches)contentAnimation?.cancel();});
  function refresh(language){
    tabs.setAttribute('aria-label',language==='en'?'Project questions':'项目问答');
    root.querySelectorAll('.hf-steps').forEach(list=>list.setAttribute('aria-label',language==='en'?'Work sequence':'工作安排'));
  }
  layout();
  window.EllisHomeFaq={refresh};
})();
