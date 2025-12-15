// Vercel Serverless Function pour envoyer des emails
export default async function handler(req, res) {
  // Autoriser uniquement POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Vérifier l'origine (CORS)
  const allowedOrigins = ['https://treecode-lac.vercel.app', 'http://localhost:3000'];
  const origin = req.headers.origin;
  
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  try {
    const { from_name, from_email, message } = req.body;

    // Validation basique
    if (!from_name || !from_email || !message) {
      return res.status(400).json({ error: 'Tous les champs sont requis' });
    }

    // Appel à EmailJS depuis le serveur
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: process.env.VITE_EMAILJS_SERVICE_ID,
        template_id: process.env.VITE_EMAILJS_TEMPLATE_ID,
        user_id: process.env.VITE_EMAILJS_PUBLIC_KEY,
        template_params: {
          from_name,
          from_email,
          message,
        },
      }),
    });

    if (!response.ok) {
      throw new Error('Erreur EmailJS');
    }

    return res.status(200).json({ success: true, message: 'Email envoyé avec succès' });
  } catch (error) {
    console.error('Erreur:', error);
    return res.status(500).json({ error: 'Erreur lors de l\'envoi de l\'email' });
  }
}
