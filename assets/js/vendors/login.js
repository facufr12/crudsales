document.addEventListener("DOMContentLoaded", () => {
    function getInitials(name, username) {
        const nameParts = name.split(' ');
        const initialsFromName = nameParts.length > 1 
            ? nameParts[0][0] + nameParts[nameParts.length - 1][0] 
            : nameParts[0][0];
        
        const initialsFromUsername = username[0];
        
        return (initialsFromName + initialsFromUsername).toUpperCase();
    }

    function createAvatar(initials) {
        const avatar = document.createElement('div');
        avatar.className = 'avatar';
        avatar.textContent = initials;

        // Estilo básico para el avatar
        avatar.style.width = '40px';
        avatar.style.height = '40px';
        avatar.style.borderRadius = '50%';
        avatar.style.backgroundColor = '#007bff'; // Color de fondo
        avatar.style.color = '#fff'; // Color del texto
        avatar.style.display = 'flex';
        avatar.style.alignItems = 'center';
        avatar.style.justifyContent = 'center';
        avatar.style.fontSize = '16px';
        avatar.style.fontWeight = 'bold';
        avatar.style.textTransform = 'uppercase';

        return avatar;
    }

    const form = document.querySelector("form.needs-validation");
    const responseDiv = document.getElementById("response");
    const navAvatarContainer = document.getElementById("nav-avatar"); // Contenedor del avatar en la barra de navegación

    const handleResponse = async (response) => {
        if (!response.ok) {
            throw new Error(`Error en la respuesta de la red: ${response.statusText}`);
        }
        const data = await response.json();
        console.log("Datos parseados de la respuesta:", data); // Muestra los datos aquí
        return data;
    };

    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevenir el envío del formulario de manera predeterminada

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const loginData = {
            username: username,
            password: password
        };

        try {
            const response = await fetch('https://pvjhxvdg-8080.brs.devtunnels.ms/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData),
                credentials: 'include'
            });

            const data = await handleResponse(response);

            const initials = getInitials(data.name, data.username);
            localStorage.setItem('userInitials', initials); // Guarda las iniciales en localStorage

            localStorage.setItem('authToken', data.token || ''); // Guarda el token si existe
            localStorage.setItem('userData', JSON.stringify(data)); // Guarda todos los datos del usuario

            setTimeout(() => {
                window.location.href = '/secciones/admin-students.html';
            }, 5000);

            const cookies = document.cookie;
            console.log(`Cookies: ${cookies}`);

        } catch (error) {
            console.error("Error en el envío de datos:", error);
            responseDiv.textContent = `Error: en inicio de sesión`;
        }
    });
});
