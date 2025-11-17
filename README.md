# 🧪 Démo: Tests Automatisés

> **Module 4**: Démonstration live de la pyramide de tests avec TypeScript + Vitest

## 🎯 Objectif de la démo

Montrer en live comment mettre en place une suite de tests complète :
- ✅ Tests unitaires (rapides, isolés)
- ✅ Tests d'intégration (composants multiples)
- ✅ Tests E2E (simulation utilisateur)
- ✅ Couverture de code + rapport HTML
- ✅ Métriques et interprétation des résultats

## 📦 Application de démo

**Calculatrice financière** avec :
- Opérations de base (add, subtract, multiply, divide)
- Calculs avancés (pourcentages, TVA, intérêts composés)
- Validation des entrées
- Historique des calculs

## 🗂️ Structure du projet

```
demo-tests/
├── README.md                    # Ce fichier (script de démo)
├── package.json                 # Dépendances (Vitest, Playwright)
├── vitest.config.ts             # Configuration Vitest
├── src/
│   ├── calculator.ts            # Logique métier
│   ├── validator.ts             # Validation des entrées
│   └── history.ts               # Gestionnaire d'historique
├── tests/
│   ├── unit/                    # Tests unitaires (rapides)
│   │   ├── calculator.test.ts
│   │   └── validator.test.ts
│   ├── integration/             # Tests d'intégration
│   │   └── calculator-with-history.test.ts
│   └── e2e/                     # Tests E2E (Playwright)
│       └── calculator.spec.ts
└── coverage/                    # Rapport de couverture (généré)
```

## 🎬 Script de la démo (15 min)

### Partie 1: Structure du projet (2 min)

**À dire**:
> "Je vais vous montrer comment organiser une suite de tests complète. Nous avons trois niveaux de tests, comme dans la pyramide que nous avons vue dans les slides."

**À montrer**:
```bash
# Afficher la structure
tree src/ tests/

# Montrer les dépendances
cat package.json | grep -A 5 "devDependencies"
```

**Points clés**:
- Tests unitaires = base de la pyramide (nombreux, rapides)
- Tests d'intégration = milieu (moins nombreux, plus lents)
- Tests E2E = sommet (peu nombreux, les plus lents)

---

### Partie 2: Tests Unitaires (4 min)

**À dire**:
> "Les tests unitaires testent une seule fonction de manière isolée. Ils sont rapides et faciles à debugger."

**À montrer**:
```bash
# Ouvrir calculator.test.ts
cat tests/unit/calculator.test.ts

# Lancer UNIQUEMENT les tests unitaires
bun test tests/unit --reporter=verbose
```

**Code à montrer** (`calculator.test.ts`):
```typescript
import { describe, it, expect } from 'vitest'
import { add, multiply, calculateTVA } from '../../src/calculator'

describe('Calculator - Basic Operations', () => {
  it('should add two numbers correctly', () => {
    expect(add(2, 3)).toBe(5)
    expect(add(-1, 1)).toBe(0)
    expect(add(0.1, 0.2)).toBeCloseTo(0.3)
  })

  it('should multiply two numbers correctly', () => {
    expect(multiply(3, 4)).toBe(12)
    expect(multiply(-2, 5)).toBe(-10)
  })
})

describe('Calculator - Advanced Operations', () => {
  it('should calculate TVA correctly', () => {
    expect(calculateTVA(100, 20)).toBe(20)  // 20% de 100 = 20
    expect(calculateTVA(50, 10)).toBe(5)    // 10% de 50 = 5
  })
})
```

**Points clés**:
- ✅ Tests rapides (< 1ms par test)
- ✅ Faciles à comprendre et maintenir
- ✅ Détectent rapidement les régressions
- ⚠️ Ne testent PAS les interactions entre composants

---

### Partie 3: Tests d'Intégration (3 min)

**À dire**:
> "Les tests d'intégration vérifient que plusieurs composants fonctionnent bien ensemble. Ici, on teste Calculator + History."

**À montrer**:
```bash
# Lancer les tests d'intégration
bun test tests/integration --reporter=verbose
```

**Code à montrer** (`calculator-with-history.test.ts`):
```typescript
import { describe, it, expect, beforeEach } from 'vitest'
import { Calculator } from '../../src/calculator'
import { History } from '../../src/history'

describe('Calculator with History - Integration', () => {
  let calc: Calculator
  let history: History

  beforeEach(() => {
    calc = new Calculator()
    history = new History()
  })

  it('should save calculation results to history', () => {
    const result = calc.add(5, 3)
    history.save('add', [5, 3], result)

    const lastEntry = history.getLast()
    expect(lastEntry).toEqual({
      operation: 'add',
      inputs: [5, 3],
      result: 8,
      timestamp: expect.any(Date)
    })
  })

  it('should retrieve calculation history', () => {
    calc.add(5, 3)
    history.save('add', [5, 3], 8)

    calc.multiply(4, 2)
    history.save('multiply', [4, 2], 8)

    expect(history.getAll()).toHaveLength(2)
  })
})
```

**Points clés**:
- ✅ Testent les interactions réelles
- ✅ Détectent les problèmes d'intégration
- ⚠️ Plus lents que les tests unitaires
- ⚠️ Plus complexes à debugger

---

### Partie 4: Tests E2E (3 min)

**À dire**:
> "Les tests E2E simulent un vrai utilisateur. Avec Playwright, on peut tester l'interface comme si on cliquait dessus."

**À montrer**:
```bash
# Lancer les tests E2E (si temps)
bunx playwright test
```

**Code à montrer** (`calculator.spec.ts`):
```typescript
import { test, expect } from '@playwright/test'

test.describe('Calculator E2E', () => {
  test('should perform basic calculation', async ({ page }) => {
    await page.goto('http://localhost:3000')

    // Cliquer sur les boutons
    await page.click('button:has-text("5")')
    await page.click('button:has-text("+")')
    await page.click('button:has-text("3")')
    await page.click('button:has-text("=")')

    // Vérifier le résultat
    await expect(page.locator('#result')).toHaveText('8')
  })

  test('should show calculation in history', async ({ page }) => {
    await page.goto('http://localhost:3000')

    // Faire un calcul
    await page.click('button:has-text("5")')
    await page.click('button:has-text("+")')
    await page.click('button:has-text("3")')
    await page.click('button:has-text("=")')

    // Vérifier l'historique
    const historyEntry = page.locator('.history-item').first()
    await expect(historyEntry).toContainText('5 + 3 = 8')
  })
})
```

**Points clés**:
- ✅ Testent le comportement réel de l'application
- ✅ Détectent les problèmes UX et d'intégration UI
- ⚠️ Très lents (plusieurs secondes par test)
- ⚠️ Fragiles (changements UI cassent les tests)

---

### Partie 5: Couverture de Code (3 min)

**À dire**:
> "La couverture de code mesure quel pourcentage du code est testé. Attention : 100% de couverture ne signifie pas 0 bug !"

**À montrer**:
```bash
# Générer le rapport de couverture
bun test --coverage

# Afficher le résumé dans le terminal
# (Vitest affiche automatiquement)

# Ouvrir le rapport HTML
open coverage/index.html
```

**Résultat attendu** (dans le terminal):
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

**À expliquer**:
- **% Stmts** (Statements): Pourcentage de lignes exécutées
- **% Branch**: Pourcentage de branches (if/else) testées
- **% Funcs**: Pourcentage de fonctions testées
- **% Lines**: Pourcentage de lignes de code testées

**Points clés**:
- ✅ 80-90% de couverture = bon objectif
- ⚠️ 100% de couverture ≠ 0 bug
- ⚠️ Privilégier la qualité à la quantité
- 🎯 Tester les chemins critiques en priorité

---

## 🚀 Lancer la démo

### Prérequis
```bash
# Installer les dépendances
bun install

# (Optionnel) Vérifier que tout fonctionne
bun test
```

### Commandes de démo

```bash
# 1. Tests unitaires seuls
bun test tests/unit --reporter=verbose

# 2. Tests d'intégration seuls
bun test tests/integration --reporter=verbose

# 3. Tous les tests avec couverture
bun test --coverage

# 4. Tests E2E (si app frontend disponible)
bunx playwright test

# 5. Mode watch (développement)
bun test --watch

# 6. Reporter HTML
bun test --coverage --reporter=html
```

---

## 💡 Messages clés à faire passer

### La Pyramide de Tests

```
         /\
        /E2E\        ← Peu nombreux, lents, fragiles
       /------\
      /  Integ \     ← Modérément nombreux, moyennement rapides
     /----------\
    /   Unitaire \   ← Très nombreux, très rapides, robustes
   /--------------\
```

### Métriques à surveiller

1. **Couverture de code**: 80-90% (pas 100%)
2. **Temps d'exécution**: < 10s pour la suite complète
3. **Taux de succès**: Viser 100% (sinon le build échoue)
4. **Flakiness**: Tests qui échouent aléatoirement (à éliminer)

### Best Practices

✅ **DO**:
- Écrire des tests avant de coder (TDD optionnel mais utile)
- Tester les cas limites (edge cases)
- Nommer clairement les tests (`should ... when ...`)
- Isoler les tests (pas de dépendances entre eux)
- Utiliser des fixtures/mocks pour les dépendances externes

❌ **DON'T**:
- Tester les détails d'implémentation (tester le comportement)
- Avoir des tests qui dépendent de l'ordre d'exécution
- Ignorer les tests qui échouent (`test.skip`)
- Viser 100% de couverture au détriment de la qualité
- Oublier de tester les chemins d'erreur

---

## 📊 Temps estimé

| Partie | Durée | Détails |
|--------|-------|---------|
| Introduction + Structure | 2 min | Expliquer la pyramide, montrer l'arbo |
| Tests unitaires | 4 min | Montrer le code, lancer les tests |
| Tests d'intégration | 3 min | Expliquer la différence, démo |
| Tests E2E | 3 min | Montrer Playwright (optionnel si pas d'UI) |
| Couverture | 3 min | Générer rapport, expliquer métriques |
| **TOTAL** | **15 min** | Peut être réduit à 10 min si besoin |

---

## 🎓 Questions probables des élèves

**Q: "Faut-il vraiment 100% de couverture ?"**
> Non ! 80-90% est un bon objectif. 100% coûte très cher en temps pour peu de bénéfices.

**Q: "Combien de temps pour écrire des tests ?"**
> Règle du 30% : Si vous codez une feature en 10h, prévoyez 3h pour les tests.

**Q: "Les tests ralentissent le développement ?"**
> Au début oui, mais ils accélèrent ensuite car ils détectent les bugs tôt.

**Q: "Que tester en priorité ?"**
> La logique métier critique. Pas besoin de tester les getters/setters simples.

**Q: "TDD (Test-Driven Development) est obligatoire ?"**
> Non, mais c'est une bonne pratique. Commencez par écrire des tests après si vous débutez.

---

## 🔗 Ressources supplémentaires

- [Vitest Documentation](https://vitest.dev/)
- [Playwright Documentation](https://playwright.dev/)
- [Test Pyramid (Martin Fowler)](https://martinfowler.com/bliki/TestPyramid.html)
- [Google Testing Blog](https://testing.googleblog.com/)

---

**Prêt pour la démo ! 🚀**
