// Vercel Serverless Function pour envoyer des emails
export default async function handler(req, res) {
  // Autoriser uniquement POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Vérifier l'origine (CORS)
  const allowedOrigins = [
  
    'https://treecode-two.vercel.app',
    'https://treecode-nine.vercel.app',
  
  ];
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

    // Vérifier que les variables d'environnement existent
    // Support both VITE_ prefixed and non-prefixed variables
    const serviceId = process.env.VITE_EMAILJS_SERVICE_ID || process.env.EMAILJS_SERVICE_ID;
    const templateId = process.env.VITE_EMAILJS_TEMPLATE_ID || process.env.EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.VITE_EMAILJS_PUBLIC_KEY || process.env.EMAILJS_PUBLIC_KEY;
    
    console.log('Vérification des variables d\'environnement...');
    console.log('SERVICE_ID:', serviceId ? 'OK' : 'MANQUANT');
    console.log('TEMPLATE_ID:', templateId ? 'OK' : 'MANQUANT');
    console.log('PUBLIC_KEY:', publicKey ? 'OK' : 'MANQUANT');
    console.log('Available env vars:', Object.keys(process.env).filter(k => k.includes('EMAIL')));
    
    if (!serviceId || !templateId || !publicKey) {
      console.error('Variables d\'environnement manquantes');
      return res.status(500).json({ 
        error: 'Configuration serveur manquante',
        missing: {
          service: !serviceId,
          template: !templateId,
          publicKey: !publicKey
        },
        hint: 'Configurez les variables dans Vercel Dashboard: VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY'
      });
    }

    // Appel à EmailJS depuis le serveur
    const emailData = {
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: {
        from_name,
        from_email,
        message,
      },
    };

    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Erreur EmailJS:', response.status, errorText);
      throw new Error(`Erreur EmailJS: ${response.status}`);
    }

    return res.status(200).json({ success: true, message: 'Email envoyé avec succès' });
  } catch (error) {
    console.error('Erreur complète:', error);
    return res.status(500).json({ 
      error: 'Erreur lors de l\'envoi de l\'email',
      details: error.message 
    });
  }
}
