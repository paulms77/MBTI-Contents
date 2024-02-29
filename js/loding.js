const loader = document.querySelector('.loader');
const html = document.querySelector('html');


html.style.overflow = 'hidden';

window.addEventListener('load', ()=>{

     setTimeout(() => {
    
        loader.style.opacity = '0';
    html.style.overflow = 'auto';
        
        setTimeout(() => {
          loader.style.display = 'none';
      }, 400);
        
  }, 2000);
})