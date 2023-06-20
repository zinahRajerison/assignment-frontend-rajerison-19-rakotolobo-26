# assignment-frontend-rajerison-19-rakotolobo-26
Frontend du projet assignement de 
- Rajerison Lalao Zinah 19 
- Rakotolobo Oelintsoa Vonjy Tahiana 26

## Fonctionnalites

### Authentification à l'aide de JSON Web Tokens (JWT)

#### Premier scenario: utilisateur etudiant
- L'utilisateur verra la liste de tous ses devoirs.
- Il pourra en creer un et voir les details de l'un d'eux.

#### Deuxieme scenario: utilisateur enseignant (admin)
- L'utilisateur verra la liste des devoirs (des matieres qu'il enseigne) non rendus a gauche et ceux deja rendus a droite.
- Il pourra effectuer une modification, c'est-a-dire attribuer une note et laisser une remarque, sur un devoir en le deplacant de gauche a droite (drag & drop).
- L'attribution de la note et de la remarque se fera a partir d'un pop-up.
- Il a aussi la possibilite de modifier et de supprimer le devoir.

#### Erreur: username ou password incorrect
Un message d'erreur sera affiche en cas d'erreur d'authentification.


### Toolbar / SideBar
Le site contient un menu de navigation deroulant donnant un choix sur `La liste des devoirs` ou `Ajouter devoir` et affichant le Nom et Prenom de l'utilisateur.


### Donnees de test

#### Enseignant (Admin):
- Username `Smith` Password `1234` Matiere `Big Data`

#### Etudiant:
- Username `Claude` Password `1234`
- Username `Julie` Password `1234`

### Base de donnees
- Ajout de nouvelles proprietes aux modeles

## Liens des sites
Front : https://assignment-frontend-19-26.onrender.com/

Back : https://assignment-backend-19-26.onrender.com/ 
