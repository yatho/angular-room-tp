* Chapitre 0 :

- Création du projet à l'aide d'angular cli
- Migrer les tests unitaires pour la librairie jest
- Ajouter la librairie material
- Mise à jour du projet généré pour utiliser les standalones components (Optional)
- Procédé à l'affichage d'une navbar material et d'un titre
- Vérifier que les tests sont ok

* Chapitre 1 :

- Création du CRUD "local" pour la gestion des salles pour une future interface d'administration:
- La suppression doit demander une validation de l'action, puis recharger la liste en cas de suppression
- Suite à l'action de mise à jour ou de création, on retourne sur la liste des salles.
- La gestion des salles est faite de façon à pouvoir brancher une API par la suite.

Object room ->
```json
{
    id -> int
    capacity -> int
    accessibility -> boolean
    equipments: [
        TABLE,
        VISIO
    ],
    address: string,
    telephone: string
}
```

Voici un exemple des écrans attendus :

La liste des salles :
![Liste des salles](tp-sample-interface/admin-list.png)

Création d'une salle :
![Création d'une salle](tp-sample-interface/create-room.png)

Mise à jour d'une salle :
![Détails d'une salle](tp-sample-interface/room-detail.png)

* Chapitre 2 :

- Mise à jour du CRUD pour se connecter à un backend non sécurisé.

* Chapitre 3 : 

Ajouter la partie authentification avec :
    - Création d'une page de login.
    - Création du service d'authentification.
    - Sécurisation de l'appel au CRUD déjà fait dans le chapitre 2.
    - Message d'erreur et redirection vers la page de login en cas d'erreur d'authentification.

* Chapitre 4 :

- Ajouter des tests automatisers

* Chapitre 5 :

- Améliorer les performances (diminuer la taille des bundles générés + Optimiser le cycle de vie des objets angular).
- Augmenter la réutilisabilité du code.
- Déplacer les portions de code réutilisable dans une librairie séparée.