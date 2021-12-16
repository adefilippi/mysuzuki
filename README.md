MySuzuki
========

## Introduction

Application mySuzuki scindée en 3 applications:
* une UI d'admin
* une API REST
* un front React

## Suppression des utilisateurs

Le WebService a la possibilité de supprimer des utilisateurs MySuzuki pour des raisons RGPD grâce à une API dédiée.

La documentation est disponible [ici](https://widopjira.atlassian.net/wiki/spaces/MSZ/pages/1488617473/Webhook+Suppression+d+un+utilisateur+dans+la+base+MySuzuki).

Les clés d'API se trouvent dans 1Password.

Enfin, un fichier de logs dédié à cette fonctionnalité a été créé.

## Déployer un environnement de recette

Pour chaque release, nous créons une branche git.

Grâce à [platform.sh](https://platform.sh) nous pouvons déployer cette branche pour créer un environnement
de recette séparé.

:warning: Nous sommes limités à 3 environnements de dev + 1 de prod. Nous avons en permanence `master` et `develop`
ce qui nous laisse 2 environnements "libres". Tout environnement supplémentaire est facturé 
($21/mois les 3 envrionnements supplémentaires).

Cela se fait en 3 étapes :
* changer l'environnement parent
* activer l'environnement
* changer les variables d'environnement

Tout d'abord, se rendre dans la console [platform.sh](https://console.platform.sh/) et sélectionner le projet. 

Dans la liste des environnements, sélectionner la branche que nous voulons déployer.

### Changer l'environnement parent

Aller dans `Settings`, puis dans `General` cliquer sur `Edit` dans la zone `Envrionment name`.

Dans le menu déroulant, choisir l'envionnement parent. C'est de cet environnement que nous allons hériter
les données et les variables d'environnements. Il s'agira souvent de `develop`.

Sauvegarder.

### Activer l'environnement

Sur la même page, cliquer sur `Edit` dans la zone `Status is inactive` et cliquer sur le bouton `Activate`.

Revenir dans la section `Overview` et attendre que le déploiement soit terminé.

### Changer les variables d'environnement

Toujours dans `Overview`, cliquer sur `URLs` en haut à droite et copier l'URL https de l'API.

Puis dans `Settings`, sélectionner `Variables` dans le menu à droite.

Editer la variable `env:REACT_APP_PRODUCTION_API_ROOT` en cliquant sur `Edit` puis `Override` et copier
dans le champ `Value`, copier l'URL de l'API sans le `/` à la fin.

Sauvegarder.

Tester l'environnement. Les identifiants utilisés sur l'environnement parent (front et admin) peuvent être 
réutilisés sur cet environnement. Si ce n'est pas le cas, se référer à la partie suivante.

### Sync avec le parent

Pour mettre à jour les données de l'environnement avec celles du parent, platform.sh propose le `Sync`.

Se rendre dans `Overview`, puis cliquer sur `Sync` en haut à droite.

Dans la popin, cocher `Replace the data (e.g. databases, uploaded files) of <branch name> with that from <parent branch>.` et valider.

### Ajouter du ciblage à une entité 

Pour ajouter du ciblage à une entité, il faut utiliser le trait `TargetableTrait`
(`use TargetableTrait`) dans l'entité.

Ce trait utilise le `TargetEnumTrait` et `TargetFileTrait` qui sont séparés 
(utile dans le cas où il sera nécessaire de hiérarchiser, comme avec `Offer` qui est 
un parent de `ManualOffer` et `AutomaticOffer`, `Offer` utilise `TargetEnumTrait` car 
les deux classes enfant utilisent l'Enum mais Offer n'utilisent pas le contenu
de `TargetFileTrait`)

Il faut aussi implémenter l'interface `Targetable`

Ensuite il faut ajouter l'attribut Users (qui est une ManyToMany configuré avec doctrine)
dans l'entité à laquelle on ajoute du ciblage. (voir annotations ci-dessous)
```
     * @ORM\JoinTable(
     *     name="nomdelentite_users",
     *     joinColumns={@ORM\JoinColumn(name="nomdelentite_id", referencedColumnName="id", onDelete="CASCADE")},
     *     inverseJoinColumns={@ORM\JoinColumn(name="user_id", referencedColumnName="id", onDelete="CASCADE")}
     * )
```

Dans la classe admin il est nécessaire d'étendre de `TargetableAdmin` qui offre
le nécessaire pour cibler. 

Lors de l'ajout d'une nouvelle entité ciblée, si cette dernière doit apparaitre dans les 
featured content, il faut ajouter le code nécessaire dans le provider `FeaturedContentProvider`.

Enfin, l'extension `CurrentUserExtension` va se charger de filtrer les résultats l'API lorsqu'une 
classe implémentera l'interface `Targetable`

Ressources :
------

* JIRA : https://widopjira.atlassian.net/secure/RapidBoard.jspa?rapidView=77&projectKey=MSZ
* Repository : https://github.com/widop/mysuzuki

