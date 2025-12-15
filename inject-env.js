// Script pour injecter les variables d'environnement dans index.html
const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// Créer le script d'injection des variables d'environnement
const envScript = `
    <script>
        window.ENV = {
            EMAILJS_PUBLIC_KEY: "${process.env.VITE_EMAILJS_PUBLIC_KEY || ''}",
            EMAILJS_SERVICE_ID: "${process.env.VITE_EMAILJS_SERVICE_ID || ''}",
            EMAILJS_TEMPLATE_ID: "${process.env.VITE_EMAILJS_TEMPLATE_ID || ''}"
        };
    </script>`;

// Injecter avant la balise </head>
html = html.replace('</head>', `${envScript}\n</head>`);

fs.writeFileSync(indexPath, html);
console.log('✅ Variables d\'environnement injectées avec succès');
