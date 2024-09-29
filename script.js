$(document).ready(function() {

    function cargarContenido(url) {
        $.ajax({
            url: url,
            method: 'GET',
            success: function(data) {
                $('body').html(data);
                history.pushState(null, '', url); 
                resaltarSeccionActiva(url); 
            },
            error: function(xhr, status, error) {
                console.error('Error al cargar el contenido:', error);
                $('body').html('<p>Error al cargar el contenido.</p>'); 
            }
        });
    }

 
    function resaltarSeccionActiva(url) {
        const navLinks = document.querySelectorAll('.header__nav__item a');
        navLinks.forEach(link => {

            link.classList.remove('active');
 
            if (link.getAttribute('data-target') === url) {
                link.classList.add('active'); 
            }
        });
    }


    $('#enlace-proyecto').on('click', function(event) {
        event.preventDefault();
        cargarContenido('proyecto.html');
    });

  
    $('.nav-link').on('click', function(event) {
        event.preventDefault();
        const targetUrl = $(this).data('target'); 
        cargarContenido(targetUrl); 
    });

   
    window.onpopstate = function() {
        cargarContenido(document.location.href); 
    };


    document.querySelectorAll('.header__nav__list a').forEach(enlace => {
        enlace.addEventListener('click', function () {
            document.getElementById('menu-toggle').checked = false;
        });
    });

    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    };

   
    resaltarSeccionActiva(document.location.href);
});
