// ====================================
// INICIALIZAÇÃO QUANDO A PÁGINA CARREGA
// ====================================
window.addEventListener('load', () => {
    criarParticulas();
    inicializarObservadorScroll();
    configurarNavegacaoSuave();
    configurarEfeitosHover();
    configurarNavegacaoAtiva();
    inicializarControlesScroll();
});

// ====================================
// SISTEMA DE PARTÍCULAS ANIMADAS
// ====================================
function criarParticulas() {
    const containerParticulas = document.getElementById('particles');
    if (!containerParticulas) return;
    
    const quantidadeParticulas = 30; // Reduzido para melhor performance

    for (let i = 0; i < quantidadeParticulas; i++) {
        const particula = document.createElement('div');
        particula.className = 'particle';
        particula.style.left = Math.random() * 100 + '%';
        particula.style.animationDelay = Math.random() * 15 + 's';
        particula.style.animationDuration = (Math.random() * 10 + 10) + 's';
        containerParticulas.appendChild(particula);
    }
}

// ====================================
// ANIMAÇÃO DE REVELAÇÃO NO SCROLL
// ====================================
function inicializarObservadorScroll() {
    const opcoes = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach((entrada, indice) => {
            if (entrada.isIntersecting) {
                setTimeout(() => {
                    entrada.target.classList.add('revealed');
                }, indice * 100);
            }
        });
    }, opcoes);

    const elementos = document.querySelectorAll('.scroll-reveal');
    elementos.forEach(elemento => {
        observador.observe(elemento);
    });
}

// ====================================
// NAVEGAÇÃO SUAVE ENTRE SEÇÕES
// ====================================
function configurarNavegacaoSuave() {
    document.querySelectorAll('a[href^="#"]').forEach(ancora => {
        ancora.addEventListener('click', function (e) {
            e.preventDefault();
            const destino = document.querySelector(this.getAttribute('href'));
            if (destino) {
                destino.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ====================================
// EFEITOS SUAVES DE HOVER NOS CARDS
// ====================================
function configurarEfeitosHover() {
    const cards = document.querySelectorAll('.skill-card, .project-card');

    cards.forEach(card => {
        // Efeito 3D suave baseado na posição do mouse
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centroX = rect.width / 2;
            const centroY = rect.height / 2;
            const rotacaoX = (y - centroY) / 30;
            const rotacaoY = (centroX - x) / 30;
            card.style.transform = `perspective(1000px) rotateX(${rotacaoX}deg) rotateY(${rotacaoY}deg) translateZ(5px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
}

// ====================================
// NAVEGAÇÃO ATIVA BASEADA NO SCROLL
// ====================================
function configurarNavegacaoAtiva() {
    const secoes = document.querySelectorAll('section');
    const itensNav = document.querySelectorAll('.nav-item');

    const atualizarNavegacao = () => {
        let secaoAtual = '';
        secoes.forEach(secao => {
            const topoSecao = secao.offsetTop;
            if (scrollY >= (topoSecao - 200)) {
                secaoAtual = secao.getAttribute('id');
            }
        });

        itensNav.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${secaoAtual}`) {
                item.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', throttle(atualizarNavegacao, 100));
}

// ====================================
// CONTROLES DE SCROLL (HEADER E BOTÃO TOPO)
// ====================================
function inicializarControlesScroll() {
    let lastScrollY = 0;
    const nav = document.querySelector('.nav');
    const backToTopBtn = document.getElementById('backToTop');

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    const controlarScroll = () => {
        const currentScrollY = window.scrollY;

        // Controlar botão voltar ao topo
        if (backToTopBtn) {
            if (currentScrollY > 100) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }

        // Controlar header
        if (nav) {
            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                nav.classList.add('hidden');
            } else {
                nav.classList.remove('hidden');
            }
        }

        lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', throttle(controlarScroll, 10));
}

// ====================================
// FUNÇÃO UTILITÁRIA
// ====================================
function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}