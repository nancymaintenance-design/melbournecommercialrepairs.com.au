/* A finite decoration reveal, scoped to the shared non-home footer seam. */
(() => {
  const edge=document.querySelector('.inner-footer-shell>.footer-transition');
  if(!edge||matchMedia('(prefers-reduced-motion: reduce)').matches||!('IntersectionObserver' in window))return;
  const observer=new IntersectionObserver(entries=>{
    if(!entries.some(entry=>entry.isIntersecting))return;
    edge.classList.add('ft-entered');
    observer.disconnect();
  },{rootMargin:'0px 0px 40px 0px',threshold:0});
  observer.observe(edge);
})();
