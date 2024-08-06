export function generarLinkWhatsApp(numero, mensaje) {
    // Asegúrate de que el número esté en formato internacional
    const numeroFormato = numero.replace(/\D/g, ''); // Elimina cualquier carácter no numérico
    const mensajeFormato = encodeURIComponent(mensaje); // Codifica el mensaje para la URL

    // Genera el enlace
    const enlaceWhatsApp = `https://api.whatsapp.com/send?phone=57${numeroFormato}&text=${mensajeFormato}`;
    
    return enlaceWhatsApp;
}