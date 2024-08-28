document.addEventListener("DOMContentLoaded", () => {
    const avatarText = document.getElementById('avatarText');

    // Recuperar las iniciales del localStorage
    const userInitials = localStorage.getItem('userInitials');

    if (userInitials) {
        // Actualizar el contenido del span con las iniciales
        avatarText.textContent = userInitials;
    } else {
        console.log('No se encontraron iniciales de usuario en localStorage.');
    }
});