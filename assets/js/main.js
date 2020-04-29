// # LOADING

// const loadingContainer = document.querySelector('#loading');

// window.addEventListener('load', function() {
//   loadingContainer.classList.add('loaded');
// });

// # MENU FIXO

const menuContainer = document.querySelector('.page-topbar-container');

function showMenubar() {
  if(window.scrollY >= window.innerHeight * 0.5)
    menuContainer.classList.add('fixed');
  else
    menuContainer.classList.remove('fixed');
}

// Caso o Usuário abra a página mais abaixo, a função aparesentará o menu
showMenubar();

window.addEventListener('scroll', function() {
  showMenubar();
});

// # NAVEGAÇÃO

// Menu responsivo

const menuIcon = document.querySelector('#menu-icon');
const menuItemsContainer = document.querySelector('.page-topbar-menu');

function toggleResponsiveMenu() {
  menuIcon.classList.toggle('show-menu');
  menuItemsContainer.classList.toggle('show-menu');
}

menuIcon.addEventListener('click', function() {
  toggleResponsiveMenu();
});

// Navegção comum

const menuItems = document.querySelectorAll('a[section-target]');
const menuHeight = 50;
const safeArea = window.innerHeight * 0.2;

menuItems.forEach(function(item) {
  var sectionTarget = document.getElementById(item.getAttribute('section-target'));
  var sectionTargetPosition = window.scrollY + sectionTarget.getBoundingClientRect().y;
  
  // Atualizar valores
  window.addEventListener('resize', function() {
    sectionTargetPosition = window.scrollY + sectionTarget.getBoundingClientRect().y;
  });

  // Evento de clique do menu
  item.addEventListener('click', function(e) {
    e.preventDefault();

    toggleResponsiveMenu();

    window.scrollTo({
      top: sectionTargetPosition,
      behavior: "smooth"
    });

  });
  
  // Modificação dos items do menus
  window.addEventListener('scroll', function() {
    if(
      window.scrollY >= (sectionTargetPosition - safeArea) && 
      window.scrollY <= (sectionTargetPosition + sectionTarget.getBoundingClientRect().height - safeArea)
    ) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

});

// # ANIMNAÇÃO DE SCROLL

const itemsToAnimate = document.querySelectorAll('[animated-display]');
const animatedClass = 'animated';

function setAnimation() {
  itemsToAnimate.forEach(function(item) {
    let safeArea = window.innerHeight * 0.9;
    let itemPosition = item.getBoundingClientRect().y + window.scrollY - safeArea;

    if(item.getAttribute('animated-display-delay')) {
      item.style.transitionDelay = item.getAttribute('animated-display-delay') + 's';
    }

    let waitingItems = null;
    if(item.getAttribute('animated-display-trigger'))
      waitingItems = document.querySelectorAll('[animated-display-wait="'+ item.getAttribute('animated-display-trigger') +'"]')

    if(window.scrollY >= itemPosition) {
      item.classList.add(animatedClass);

      if(waitingItems) {
        waitingItems.forEach(function(item) {
          item.classList.add(animatedClass);
        })
      }
    }
  });
}

window.addEventListener('load', function() {
  setAnimation();

  window.addEventListener('scroll', function() {
    setAnimation();
  });

});

// # RODAPÉ FIXO

const footerContainer = document.querySelector('footer.fixed-footer');
const beforeFooterContainer = footerContainer.previousElementSibling;
function setStylesBeforeFooterElement() {
  beforeFooterContainer.style.position = 'relative';
  beforeFooterContainer.style.zIndex = 2;
  beforeFooterContainer.style.marginBottom = footerContainer.getBoundingClientRect().height + 'px';
}

setStylesBeforeFooterElement();

window.addEventListener('resize', function(){ setStylesBeforeFooterElement(); });
