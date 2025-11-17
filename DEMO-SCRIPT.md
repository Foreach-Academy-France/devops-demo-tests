# 🎬 Script de Démo - Tests Automatisés

## ⏱️ Timing: 15 minutes

## 🎯 Objectif
Montrer la pyramide de tests en action avec une vraie application TypeScript.

---

## 📝 Préparation (AVANT la formation)

```bash
cd demos/demo-tests
bun install
bun test  # Vérifier que tout fonctionne
```

---

## 🎬 DÉMO EN DIRECT (Pendant la formation)

### 1️⃣ Introduction (1 min)

**Dire:**
> "Je vais vous montrer une vraie suite de tests sur une calculatrice financière. Vous allez voir les 3 niveaux de la pyramide de tests en action."

**Montrer la structure:**
```bash
tree -L 2 src/ tests/
```

---

### 2️⃣ Tests Unitaires (4 min)

**Dire:**
> "Les tests unitaires testent UNE fonction de manière isolée. Regardons `calculator.test.ts`."

**Ouvrir le fichier:**
```bash
cat tests/unit/calculator.test.ts | head -30
```

**Lancer les tests unitaires:**
```bash
bun test tests/unit --reporter=verbose
```

**Points à souligner:**
- ✅ Tests très rapides (millisecondes)
- ✅ Faciles à comprendre
- ✅ Détectent rapidement les bugs
- 💡 Chaque test = 1 comportement spécifique

**Montrer un test qui échoue (optionnel):**
```typescript
// Dans calculator.ts, changer temporairement:
export function add(a: number, b: number): number {
  return a + b + 1  // BUG VOLONTAIRE
}
```

```bash
bun test tests/unit/calculator.test.ts
# Montrer l'erreur claire
```

**Revenir au code correct immédiatement.**

---

### 3️⃣ Tests d'Intégration (3 min)

**Dire:**
> "Les tests d'intégration vérifient que plusieurs composants fonctionnent ensemble. Ici: Calculator + History."

**Ouvrir le fichier:**
```bash
cat tests/integration/calculator-with-history.test.ts | head -40
```

**Lancer les tests d'intégration:**
```bash
bun test tests/integration --reporter=verbose
```

**Points à souligner:**
- ✅ Testent les interactions réelles
- ✅ Plus proches du comportement utilisateur
- ⚠️ Plus lents que les tests unitaires
- 💡 Détectent les problèmes d'intégration (ex: format de données incompatible)

---

### 4️⃣ Couverture de Code (4 min)

**Dire:**
> "La couverture de code mesure quel % du code est exécuté par les tests. C'est une métrique utile mais pas suffisante !"

**Générer le rapport:**
```bash
bun test --coverage
```

**Analyser les résultats:**

```
 % Coverage report from v8
-------------------------------|---------|----------|---------|---------|
File                          | % Stmts | % Branch | % Funcs | % Lines |
-------------------------------|---------|----------|---------|---------|
All files                     |   92.15 |    87.50 |   95.00 |   92.15 |
 calculator.ts                |   95.45 |    91.66 |  100.00 |   95.45 |
 validator.ts                 |   88.88 |    83.33 |   90.00 |   88.88 |
 history.ts                   |   91.30 |    87.50 |   95.00 |   91.30 |
-------------------------------|---------|----------|---------|---------|
```

**Expliquer:**
- **% Stmts**: Lignes exécutées
- **% Branch**: Branches if/else testées
- **% Funcs**: Fonctions testées
- **% Lines**: Total lignes testées

**Ouvrir le rapport HTML (IMPORTANT):**
```bash
open coverage/index.html
```

**Montrer dans le navigateur:**
1. Vue d'ensemble des fichiers
2. Cliquer sur `calculator.ts`
3. Montrer les lignes vertes (testées) vs rouges (non testées)
4. Montrer les branches non testées

**Message clé:**
> "92% de couverture c'est excellent ! Viser 100% coûte trop cher. Concentrez-vous sur les 20% de code qui causent 80% des bugs."

---

### 5️⃣ Exécution Complète (2 min)

**Dire:**
> "En vrai, on lance TOUS les tests d'un coup dans la CI/CD."

**Lancer tout:**
```bash
bun test --run
```

**Montrer:**
- Nombre total de tests
- Temps d'exécution total
- Tous les tests passent ✅

**Mode Watch (BONUS si temps):**
```bash
bun test --watch
```

> "En développement, Vitest tourne en continu et re-teste automatiquement quand vous modifiez le code. Feedback instantané !"

---

### 6️⃣ Conclusion (1 min)

**Récapituler:**

```
Pyramide de Tests ✅

         /\
        /E2E\         ← Playwright (lent, fragile)
       /------\
      /  Integ \      ← Calculator+History (moyen)
     /----------\
    /   Unit     \    ← add(), multiply() (rapide, robuste)
   /--------------\

📊 Métriques:
- 50+ tests unitaires
- 10+ tests intégration
- ~92% couverture
- < 1s temps d'exécution
```

**Message final:**
> "Les tests sont votre filet de sécurité. Ils permettent de refactorer sans peur et de détecter les régressions immédiatement. Dans le Module 5, vous verrez comment les lancer automatiquement dans GitHub Actions !"

---

## ❓ Questions Probables

**Q: "Faut-il vraiment 100% de couverture ?"**
> R: Non ! 80-90% est un excellent objectif. Les 10% restants coûtent souvent plus cher qu'ils n'apportent.

**Q: "Combien de temps pour écrire les tests ?"**
> R: Règle du 30% : Si une feature prend 10h, prévoyez 3h de tests. Mais ça économise du temps de debug !

**Q: "Peut-on avoir des tests qui échouent aléatoirement ?"**
> R: Oui, on appelle ça des "flaky tests". C'est un problème à éliminer car ça détruit la confiance dans la suite de tests.

**Q: "Que tester en priorité ?"**
> R: La logique métier critique. Pas besoin de tester les getters/setters simples ou le code généré automatiquement.

---

## 🎯 Checklist Avant Démo

- [ ] `bun install` exécuté
- [ ] `bun test` passe à 100%
- [ ] Navigateur ouvert sur `coverage/index.html`
- [ ] Terminal prêt avec police lisible
- [ ] Code visible (zoom si écran partagé)

---

**Temps total: 15 min max**

✅ **DÉMO 1 PRÊTE !**
