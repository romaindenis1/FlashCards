# FlashCards - Guide d'installation

Bienvenue dans le projet **FlashCards** ! Ce fichier vous guidera à travers le processus d'installation pour configurer l'environnement de développement et démarrer l'application, en utilisant **Docker** pour MySQL.

## Prérequis

Avant de commencer, vous devez vous assurer que les logiciels suivants sont installés sur votre machine :

- **Docker**  
  Vous pouvez télécharger Docker [ici](https://www.docker.com/get-started) et l'installer selon les instructions de votre système d'exploitation.

  Vérifiez votre installation de Docker avec la commande suivante :

  ```sh
  docker --version
  ```

- **Node.js (version >= 16.x.x)**  
  Vous pouvez télécharger la dernière version stable de Node.js [ici](https://nodejs.org/en/).

  Vérifiez votre installation avec :

  ```sh
  node -v
  ```

- **npm (version >= 6.x.x)**  
  npm est livré avec Node.js, donc il devrait être installé automatiquement.

  Vérifiez la version de npm avec :

  ```sh
  npm -v
  ```

## Installation de l'environnement

Une fois les prérequis installés, suivez les étapes ci-dessous pour configurer et lancer l'application FlashCards avec Docker pour MySQL.

### 1. Cloner le repository

Cloner le repository du projet depuis GitHub :

```sh
git clone https://github.com/romaindenis1/P_BULLE_Adonis.js
cd flashcards
```

### 2. Installer les dépendances

Dans le répertoire du projet, exécutez la commande suivante pour installer les dépendances nécessaires :

```sh
npm install
```

Cette commande télécharge toutes les bibliothèques nécessaires à l'application, telles qu'AdonisJS, Vite, MySQL, etc.

### 3. Configurer Docker pour MySQL

Nous utilisons Docker pour configurer et exécuter MySQL dans un conteneur. Suivez ces étapes pour démarrer MySQL avec Docker.

#### 3.1. Démarrer MySQL avec Docker Compose

Le fichier `docker-compose.yml` est déjà inclus dans le repository cloné. Vous n'avez donc pas besoin de le créer manuellement.

Ouvrez un terminal **dans le répertoire du projet cloné**, puis exécutez la commande suivante pour démarrer MySQL avec Docker :

```sh
docker-compose up -d
```

Cela va télécharger l'image Docker de MySQL (si elle n'est pas encore présente) et lancer le conteneur en arrière-plan.

### 4. Lancer le serveur de développement

Une fois les dépendances installées et les configurations terminées, démarrez le serveur de développement avec la commande suivante :

```sh
npm run dev
```

Le serveur démarrera et sera disponible à l'adresse suivante :

```
http://localhost:3333
```

### 5. Accéder à l'application

Ouvrez votre navigateur et accédez à l'URL suivante pour consulter la page d'accueil de l'application FlashCards :

```
http://localhost:3333
```

Si tout est configuré correctement, vous devriez voir la page d'accueil de FlashCards dans votre navigateur, sans aucune erreur.

## Conclusion

Si toutes les étapes sont suivies correctement, vous devriez avoir l'environnement FlashCards installé et fonctionnel sur votre machine, avec MySQL fonctionnant dans un conteneur Docker. Vous pouvez maintenant commencer à utiliser l'application !

- Projet fait par Romain Denis
