# Configuration des Variables d'Environnement sur Vercel

## 🔐 Sécurité des Clés EmailJS

Pour protéger vos clés EmailJS, suivez ces étapes :

## 📝 Étapes de Configuration

### 1. Accéder aux Paramètres Vercel

1. Allez sur [vercel.com](https://vercel.com)
2. Sélectionnez votre projet **treecode**
3. Cliquez sur **Settings** (Paramètres)
4. Allez dans **Environment Variables**

### 2. Ajouter les Variables

Ajoutez ces 3 variables d'environnement :

| Nom | Valeur |
|-----|--------|
| `VITE_EMAILJS_PUBLIC_KEY` | `Set8x3yZcAh_Qj2Sh` |
| `VITE_EMAILJS_SERVICE_ID` | `service_3ais5uh` |
| `VITE_EMAILJS_TEMPLATE_ID` | `template_e88k90u` |

**Important :** Cochez les environnements :
- ✅ Production
- ✅ Preview
- ✅ Development

### 3. Redéployer

Après avoir ajouté les variables :
1. Allez dans l'onglet **Deployments**
2. Cliquez sur les 3 points (...) du dernier déploiement
3. Sélectionnez **Redeploy**

## ✅ Vérification

Une fois redéployé, votre site utilisera les variables d'environnement sécurisées au lieu des clés en dur dans le code.

## 🔄 Développement Local

Pour le développement local, les clés sont dans le fichier `.env` (qui n'est pas commité sur Git).

Le système utilise automatiquement :
- Les variables d'environnement Vercel en production
- Les valeurs du fichier `.env` en local
- Des valeurs par défaut en fallback

## 📌 Note sur la Sécurité EmailJS

Les clés publiques EmailJS (`publicKey`) sont **conçues pour être exposées** côté client. La vraie sécurité vient de :
- La configuration des domaines autorisés dans EmailJS
- Les limites de taux d'envoi
- La validation côté serveur EmailJS

Cependant, utiliser des variables d'environnement reste une bonne pratique pour :
- Faciliter la rotation des clés
- Séparer la configuration du code
- Gérer différents environnements (dev/prod)
