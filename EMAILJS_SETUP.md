# Configuration EmailJS pour le formulaire de contact

## Étapes pour configurer EmailJS :

### 1. Créer un compte EmailJS
- Va sur https://www.emailjs.com/
- Crée un compte gratuit (100 emails/mois gratuits)

### 2. Ajouter un service email
- Dans le dashboard, va dans "Email Services"
- Clique sur "Add New Service"
- Choisis ton fournisseur d'email (Gmail, Outlook, etc.)
- Connecte ton compte email
- Note le **Service ID** (ex: service_abc123)

### 3. Créer un template d'email
- Va dans "Email Templates"
- Clique sur "Create New Template"
- Utilise ce template :

**Subject:** Nouveau message de {{from_name}}

**Content:**
```
Vous avez reçu un nouveau message depuis votre portfolio :

Nom: {{from_name}}
Email: {{from_email}}

Message:
{{message}}
```

- Note le **Template ID** (ex: template_xyz789)

### 4. Obtenir ta clé publique
- Va dans "Account" > "General"
- Copie ta **Public Key** (ex: user_abc123xyz)

### 5. Mettre à jour le code
Dans le fichier `script.js`, remplace :
- `YOUR_PUBLIC_KEY` par ta clé publique
- `YOUR_SERVICE_ID` par ton Service ID
- `YOUR_TEMPLATE_ID` par ton Template ID

Exemple :
```javascript
emailjs.init("user_abc123xyz");
emailjs.sendForm('service_abc123', 'template_xyz789', contactForm)
```

### 6. Tester
- Ouvre ton portfolio
- Remplis le formulaire de contact
- Vérifie que tu reçois l'email

## Limites du plan gratuit :
- 100 emails par mois
- Parfait pour un portfolio personnel

## Alternative si tu veux plus d'emails :
- Upgrade vers un plan payant (à partir de 7$/mois pour 1000 emails)

## Sécurité et protection :

### EmailJS est-il sûr ?
✅ **OUI**, EmailJS est un service légitime et sécurisé :
- Utilisé par des milliers de développeurs professionnels
- Ne stocke pas tes mots de passe
- N'a pas accès à ton compte email
- Envoie juste des emails via leur API

### Protections recommandées :

1. **Activer CAPTCHA** (dans les paramètres EmailJS)
   - Empêche les robots de spammer ton formulaire
   - Protection gratuite avec reCAPTCHA

2. **Limiter le taux d'envoi**
   - Dans EmailJS, tu peux limiter à X emails par heure
   - Exemple : 10 emails max par heure

3. **Filtrer les domaines autorisés**
   - Dans EmailJS, ajoute ton domaine (ex: treecode.com)
   - Bloque les requêtes venant d'autres sites

4. **Validation côté client**
   - Le code vérifie déjà que les champs sont remplis
   - Empêche les envois vides

### Que se passe-t-il si quelqu'un vole ta clé publique ?
- ❌ Il ne peut PAS accéder à ton email
- ❌ Il ne peut PAS lire tes messages
- ✅ Il peut juste envoyer des emails via ton compte EmailJS
- 🛡️ Solution : Active CAPTCHA et limite le taux d'envoi

### Alternatives si tu veux plus de contrôle :
1. **Formspree** (similaire à EmailJS)
2. **Netlify Forms** (si tu héberges sur Netlify)
3. **Backend personnalisé** (Node.js + Nodemailer)
   - Plus complexe mais contrôle total
   - Nécessite un serveur

### Recommandation :
Pour un portfolio personnel, EmailJS est **parfaitement sûr** avec CAPTCHA activé.
