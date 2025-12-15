# 📦 Guide de Distribution de l'APK

## 📱 Lien de Téléchargement Actuel

**Google Drive:** https://drive.google.com/file/d/145PVX-j2TKC37Ruhwyvq2rb6R3Pl-FB-/view?usp=drive_link

## ✅ Option Alternative : GitHub Releases

### Avantages de GitHub Releases

- ✨ **Gratuit** - Pas de limite de taille raisonnable
- 🔒 **Fiable** - Hébergé par GitHub
- 📊 **Statistiques** - Voir le nombre de téléchargements
- 🏷️ **Versioning** - Gérer plusieurs versions de votre app
- 🚀 **CDN** - Téléchargement rapide partout dans le monde

## 🎯 Étapes à suivre

### 1. Créer une Release sur GitHub

1. Allez sur : `https://github.com/vale-parfait14/treecode`
2. Cliquez sur **"Releases"** (dans la barre latérale droite)
3. Cliquez sur **"Create a new release"**

### 2. Remplir les informations

```
Tag version: v1.0.0
Release title: SAM Digitale App v1.0.0
Description: 
  Application mobile SAM Digitale
  - Disponible uniquement au Sénégal
  - Version Android
  - Taille: ~100MB
```

### 3. Attacher le fichier APK

- Faites glisser `app-release.apk` dans la zone "Attach binaries"
- Ou cliquez pour sélectionner le fichier

### 4. Publier

- Cliquez sur **"Publish release"**

### 5. Votre lien sera :

```
https://github.com/vale-parfait14/treecode/releases/download/v1.0.0/app-release.apk
```

## 🔄 Pour les futures mises à jour

Créez simplement une nouvelle release avec un nouveau tag :
- v1.0.1 - Corrections de bugs
- v1.1.0 - Nouvelles fonctionnalités
- v2.0.0 - Version majeure

## ✅ Prochaines étapes

Après avoir créé la release :

```powershell
# 1. Supprimer l'APK du cache Git
git rm --cached app-release.apk

# 2. Commit les changements
git add .
git commit -m "Utiliser GitHub Releases pour l'APK"

# 3. Push vers GitHub
git push -u origin main --force

# 4. Déployer sur Vercel
vercel --prod
```

## 📊 Bonus : Voir les statistiques

GitHub vous montrera :
- Nombre de téléchargements
- Date de publication
- Taille du fichier
- Historique des versions

---

**Note :** J'ai déjà mis à jour le lien dans `index.html` pour pointer vers la release v1.0.0
