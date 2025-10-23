# Guide d'utilisation des routes API

Ce document explique comment utiliser les différentes routes de l'application backend pour gérer les utilisateurs et les administrateurs.

---

## Base URL

http://localhost:5000

---

## 1. Utilisateurs

### 1.1. Inscription

**Endpoint :**

POST /users/register


**Body :**

```json
{
  "first_name": "Emilie",
  "last_name": "Dupont",
  "email": "emilie@afec.fr",
  "password": "motdepasse123",
  "confirmPassword": "motdepasse123"
}

Réponse :

{
  "success": true,
  "message": "Utilisateur créé ! Vérifiez votre email ✅",
  "userId": 2
}

    Remarque : l'utilisateur sera en statut "pending" jusqu'à validation par un admin.

1.2. Vérification du compte

Endpoint :

GET /users/verify/:token

Paramètre :

    :token → le token envoyé par email lors de l'inscription.

Réponse :

{
  "success": true,
  "message": "Compte vérifié ✅"
}

1.3. Connexion

Endpoint :

POST /users/login

Body :

{
  "email": "emilie@afec.fr",
  "password": "motdepasse123"
}

Réponse :

{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "role": null
}

    Remarque : l'utilisateur doit être "approved" pour se connecter.

1.4. Rechercher un utilisateur par email

Endpoint :

GET /users/email?email=exemple@domaine.com

Réponse :

{
  "success": true,
  "user": {
    "id": 2,
    "first_name": "Emilie",
    "last_name": "Dupont",
    "email": "emilie@afec.fr",
    "status": "approved",
    "roles": null
  }
}

1.5. Récupérer tous les utilisateurs

Endpoint :

GET /users

Réponse :

{
  "success": true,
  "users": [
    {
      "id": 1,
      "first_name": "Borsalino",
      "last_name": "Kizaru",
      "email": "kizaru@marine.gov",
      "status": "approved",
      "roles": "super_admin"
    },
    ...
  ]
}

1.6. Récupérer un utilisateur par ID

Endpoint :

GET /users/:id

Réponse :

{
  "success": true,
  "user": {
    "id": 2,
    "first_name": "Emilie",
    "last_name": "Dupont",
    "email": "emilie@afec.fr",
    "status": "approved",
    "roles": null
  }
}

1.7. Supprimer un utilisateur

Endpoint :

DELETE /users/:id

Réponse :

{
  "success": true,
  "message": "Utilisateur supprimé avec succès"
}

1.8. Mettre à jour un utilisateur

Endpoint :

PUT /users/:id

Body :

{
  "first_name": "Emilie",
  "last_name": "Dupont",
  "email": "emilie@afec.fr",
  "status": "approved"
}

Réponse :

{
  "success": true,
  "message": "Utilisateur modifié avec succès"
}

2. Administrateurs

    Toutes les routes suivantes nécessitent un JWT de super_admin dans l’Authorization Header :
    Authorization: Bearer <token>

2.1. Récupérer tous les utilisateurs (admin)

Endpoint :

GET /admin/users

Réponse :

[
  {
    "id": 1,
    "first_name": "Borsalino",
    "last_name": "Kizaru",
    "email": "kizaru@marine.gov",
    "created_at": "2025-10-23T10:00:00.000Z"
  },
  ...
]

2.2. Valider un utilisateur

Endpoint :

PATCH /admin/users/:id/validate

Body :

{
  "status": "approved"
}

Réponse :

{
  "message": "Utilisateur approved"
}

    status peut être "approved" ou "rejected".