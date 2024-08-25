
// LOGIN simple logic
$(document).ready(function () {
    $("form").submit(function (e) {
        e.preventDefault();
        let password = $('#password')
        let email = $('#email')
        if (email.val() === "admin@gmail.com" && password.val() === "admin123") {
            window.location.href = '/view/shared/console.html';
        } else {
            email.val('')
            password.val('')

        }
    });
})

// console redirect logic

document.querySelectorAll('.menu-btn').forEach(button => {
    button.addEventListener('click', () => {
        const target = button.getAttribute('data-target');

        // Remove active state from all buttons
        document.querySelectorAll('.menu-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        // Add active state to the clicked button
        button.classList.add('active');

        // Hide all containers and remove active class
        document.querySelectorAll('.console__container').forEach(container => {
            container.classList.remove('active');
        });

        // Show the target container and add active class
        document.getElementById(target).classList.add('active');
    });
});
// loader
window.addEventListener('load', function(){
    const loader = document.getElementById('loader')
    const content = document.getElementById('content') 
    loader.style.display = 'none'
    content.style.display = 'block'
})


// wallet switcher 
const cryptoBtn = document.getElementById('cryptoBtn');
const fiatBtn = document.getElementById('fiatBtn');
const cryptoWallets = document.getElementById('cryptoWallets');
const fiatWallets = document.getElementById('fiatWallets');

cryptoBtn.addEventListener('click', () => {
    cryptoBtn.classList.add('active');
    fiatBtn.classList.remove('active');
    cryptoWallets.classList.remove('hidden');
    fiatWallets.classList.add('hidden');
});

fiatBtn.addEventListener('click', () => {
    fiatBtn.classList.add('active');
    cryptoBtn.classList.remove('active');
    fiatWallets.classList.remove('hidden');
    cryptoWallets.classList.add('hidden');
}); 