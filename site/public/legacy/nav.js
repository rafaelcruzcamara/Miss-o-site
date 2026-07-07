document.addEventListener("DOMContentLoaded", () => {
        const btnMenu = document.querySelector('.hamburger-menu');
        const navLinksGroups = document.querySelectorAll('.nav-links'); 
        
        if (btnMenu) {
            // 1. Limpa tudo e força os 3 riscos logo de cara
            btnMenu.innerHTML = '<i class="fa-solid fa-bars"></i>';
            let menuAberto = false;

            // 2. O que acontece ao clicar
            btnMenu.addEventListener('click', (e) => {
                e.preventDefault(); // Evita dar pulos na tela do celular
                menuAberto = !menuAberto;
                const icone = btnMenu.querySelector('i');

                if (menuAberto) {
                    // SE ABRIU: Mostra a caixa de links e vira X
                    navLinksGroups.forEach(group => group.classList.add('menu-aberto'));
                    icone.className = 'fa-solid fa-xmark';
                } else {
                    // SE FECHOU: Esconde a caixa e vira 3 riscos
                    navLinksGroups.forEach(group => group.classList.remove('menu-aberto'));
                    icone.className = 'fa-solid fa-bars';
                }
            });
        }
    });