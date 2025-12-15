# 🔧 Correction du problème Git

## Étapes à suivre :

### 1. Supprimer le fichier APK du cache Git
```bash
git rm --cached app-release.apk
```

### 2. Ajouter les modifications
```bash
git add .gitignore
git commit -m "Exclure fichier APK volumineux"
```

### 3. Forcer le push (car le commit précédent contenait le gros fichier)
```bash
git push -u origin main --force
```

## Alternative : Si ça ne fonctionne toujours pas

### Réinitialiser complètement le repository local
```bash
# Supprimer le dossier .git
Remove-Item -Recurse -Force .git

# Réinitialiser
git init
git add .
git commit -m "Initial commit sans APK"
git branch -M main
git remote add origin https://github.com/vale-parfait14/treecode.git
git push -u origin main --force
```

## 💡 Solution recommandée pour l'APK

Hébergez votre fichier APK ailleurs :
- **Google Drive** - Créez un lien de téléchargement public
- **Dropbox** - Partagez le lien direct
- **GitHub Releases** - Utilisez les releases pour les gros fichiers
- **Firebase Storage** - Hébergement gratuit

Puis modifiez le lien dans index.html :
```html
<a href="VOTRE_LIEN_DIRECT" download class="project-link">Télécharger l'APK</a>
```
