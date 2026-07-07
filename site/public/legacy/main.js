// Lógica do Menu Mobile
    const hamburger = document.querySelector('.hamburger-menu');
    const body = document.querySelector('body');
    const overlay = document.querySelector('.mobile-overlay');

    function toggleMenu() {
        body.classList.toggle('menu-open');
        
        // Troca o ícone (Barras <-> X)
        const icon = hamburger.querySelector('i');
        if (body.classList.contains('menu-open')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    }

    if(hamburger) {
        hamburger.addEventListener('click', toggleMenu);
        // Fecha ao clicar fora (no overlay)
        overlay.addEventListener('click', toggleMenu);
    }