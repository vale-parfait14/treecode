// Configuration EmailJS avec fallback pour développement local
const EMAIL_CONFIG = {
    publicKey: window.ENV?.EMAILJS_PUBLIC_KEY || "Set8x3yZcAh_Qj2Sh",
    serviceId: window.ENV?.EMAILJS_SERVICE_ID || "service_3ais5uh",
    templateId: window.ENV?.EMAILJS_TEMPLATE_ID || "template_e88k90u"
};
