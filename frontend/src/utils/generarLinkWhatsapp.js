export function generarLinkWhatsApp(numero, mensaje) {
    const mensajeFormato = encodeURIComponent(mensaje); // Codifica el mensaje para la URL

    // Genera el enlace
    const enlaceWhatsApp = `https://api.whatsapp.com/send?phone=57${numeroFormato}&text=${mensajeFormato}`;
    lo
    
    return enlaceWhatsApp;
}