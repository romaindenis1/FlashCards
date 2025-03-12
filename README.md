# Flash-Card_RomainDenis

Créer une application pour faire des flashcards

## **Logiciels requis**

L'application utilise les versions suivantes des logiciels :

- Node.js v22.13.1
- npm 10.9.2

## **Lancer l'application**

1. **Cloner le repo**  
   Exécutez la commande suivante pour cloner le repository :
   ```
   git clone https://github.com/romaindenis1/FlashCards.git
   cd ./FlashCards/flashcards/
   ```

## 2. Installer les dépendances

Installer les dépendances:

```
npm install
```

## 3. Configurer le .env

Il faut renommer le fichier .env.example en .env
On peux ou le faire a la main ou le faire avec la commande suivante depuis le /flashcards

```
cd ./flashcards
mv .env.example .env
```

## 4. Executer les deux dernière commandes

Il faut generer une clef d'application et lancer le server.

```
node ace generate:key
npm run dev
```

Le serveur est maintenant accessible sur http://localhost:3333/
