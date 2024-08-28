document.getElementById('prospectForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Evitar el envío por defecto del formulario

    // Obtener los valores del formulario
    const data = {
        "nombre": document.getElementById('nombre').value,
        "Edad": document.getElementById('Edad').value,
        "tipoafiliacion": document.getElementById('tipoafiliacion').value,
        "grupofamiliar": document.getElementById('grupofamiliar').value,
        "Celular": document.getElementById('Celular').value,
        "Correo": document.getElementById('Correo').value,
        "Partido": document.getElementById('Partido').value,
    };

    console.log('Data being sent:', data);

    // Verifica si todos los campos necesarios tienen un valor antes de enviar
    for (let key in data) {
        if (!data[key]) {
            alert(`Por favor completa el campo: ${key}`);
            return;
        }
    }

    // Enviar los datos al Google Apps Script
    fetch('https://script.google.com/macros/s/AKfycbwGk76iswl4Yw9ltRsmMr-uBCoS8Hrw4ef_Mn4VfCBcXb3GYUZMiyVFVwh-W5fF0Tpn/exec', {
        method: 'POST',
        mode: 'no-cors',  // Corregido de 'no-corfs' a 'cors'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.text())  // Leer como texto primero
    .then(text => {
        console.log('Raw response:', text);  // Ver la respuesta cruda en la consola

        try {
            const result = JSON.parse(text);
            if (result.success) {
                alert('Datos guardados exitosamente');
            } else {
                alert('Error: ' + result.error);
            }
        } catch (error) {
            throw new Error('Error parsing JSON: ' + text);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error al guardar los datos');
    });
});