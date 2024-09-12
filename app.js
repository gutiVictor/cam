// Obtén elementos de la página
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const captureButton = document.getElementById('capture');
const saveButton = document.getElementById('save');
const context = canvas.getContext('2d');
const filenameInput = document.getElementById('filename');

// Solicita acceso a la cámara del dispositivo
async function startCamera(deviceId = null) {
    try {
        const constraints = {
            video: {
                deviceId: deviceId ? { exact: deviceId } : undefined,
                facingMode: "environment" // Sugerimos el uso de la cámara trasera, pero no lo forzamos
            }
        };
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        video.srcObject = stream;
    } catch (error) {
        if (error.name === "OverconstrainedError") {
            console.error("La cámara no pudo ser accedida con las restricciones actuales:", error);
            alert("No se pudo acceder a la cámara con las restricciones actuales. Intenta seleccionar otra cámara.");
            // Puedes listar las cámaras aquí si lo necesitas
        } else {
            console.error("Error al acceder a la cámara: ", error);
            alert("Es necesario conceder permisos de cámara para usar esta funcionalidad.");
        }
    }
}

// Captura la foto cuando se hace clic en el botón
captureButton.addEventListener('click', () => {
    context.drawImage(video, 0, 0, 1000, 1000); // Mantiene el tamaño de 1000x1000
});

// Función para comprimir la imagen
function compressImage(canvas, quality = 0.6) {
    // Retorna el URL de la imagen comprimida con la calidad especificada (0.6 equivale al 60% de la calidad original)
    return canvas.toDataURL('image/jpeg', quality);
}

// Guarda la foto cuando se hace clic en el botón
saveButton.addEventListener('click', () => {
    const filename = filenameInput.value.trim() || 'foto';
    const compressedImage = compressImage(canvas, 0.6); // 60% calidad, mantiene 1000x1000
    const link = document.createElement('a');
    
    link.href = compressedImage;
    link.download = `${filename}.jpg`;
    link.click();
});

// Inicia la cámara con la configuración por defecto
startCamera();
