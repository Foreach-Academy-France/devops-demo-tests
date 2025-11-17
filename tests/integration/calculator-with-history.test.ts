import { describe, it, expect, beforeEach } from 'vitest'
import { Calculator } from '../../src/calculator'
import { History } from '../../src/history'

describe('Calculator with History - Integration Tests', () => {
  let calc: Calculator
  let history: History

  beforeEach(() => {
    calc = new Calculator()
    history = new History()
  })

  describe('Basic Integration', () => {
    it('should save calculation results to history', () => {
      calc.add(5)
      const result = calc.getValue()
      history.save('add', [5], result)

      const lastEntry = history.getLast()
      expect(lastEntry).not.toBeNull()
      expect(lastEntry?.operation).toBe('add')
      expect(lastEntry?.inputs).toEqual([5])
      expect(lastEntry?.result).toBe(5)
      expect(lastEntry?.timestamp).toBeInstanceOf(Date)
    })

    it('should track multiple sequential operations', () => {
      // Opération 1: 0 + 5 = 5
      calc.add(5)
      history.save('add', [5], calc.getValue())

      // Opération 2: 5 * 3 = 15
      calc.multiply(3)
      history.save('multiply', [3], calc.getValue())

      // Opération 3: 15 - 5 = 10
      calc.subtract(5)
      history.save('subtract', [5], calc.getValue())

      const allEntries = history.getAll()
      expect(allEntries).toHaveLength(3)
      expect(allEntries[0].result).toBe(5)
      expect(allEntries[1].result).toBe(15)
      expect(allEntries[2].result).toBe(10)
    })

    it('should retrieve calculations by operation type', () => {
      calc.add(5)
      history.save('add', [5], calc.getValue())

      calc.multiply(2)
      history.save('multiply', [2], calc.getValue())

      calc.add(3)
      history.save('add', [3], calc.getValue())

      const addOperations = history.getByOperation('add')
      expect(addOperations).toHaveLength(2)
      expect(addOperations.every(entry => entry.operation === 'add')).toBe(true)

      const multiplyOperations = history.getByOperation('multiply')
      expect(multiplyOperations).toHaveLength(1)
    })
  })

  describe('Advanced Integration Scenarios', () => {
    it('should handle complex calculation workflow', () => {
      // Scénario: Calcul d'un prix TTC avec historique

      // 1. Prix HT
      calc.add(100)
      history.save('add', [100], calc.getValue())

      // 2. Calcul TVA (20%)
      const prixHT = calc.getValue()
      calc.reset()
      calc.add(prixHT)
      calc.multiply(0.20)
      const tva = calc.getValue()
      history.save('calculate-tva', [prixHT, 20], tva)

      // 3. Prix TTC
      calc.reset()
      calc.add(prixHT)
      calc.add(tva)
      const prixTTC = calc.getValue()
      history.save('calculate-ttc', [prixHT, tva], prixTTC)

      // Vérifications
      expect(prixTTC).toBe(120)
      expect(history.getSize()).toBe(3)

      const lastEntry = history.getLast()
      expect(lastEntry?.operation).toBe('calculate-ttc')
      expect(lastEntry?.result).toBe(120)
    })

    it('should export and import history correctly', () => {
      // Créer quelques calculs
      calc.add(10)
      history.save('add', [10], calc.getValue())

      calc.multiply(2)
      history.save('multiply', [2], calc.getValue())

      // Exporter
      const exported = history.export()
      expect(exported).toContain('"operation": "add"')
      expect(exported).toContain('"operation": "multiply"')

      // Créer un nouvel historique et importer
      const newHistory = new History()
      newHistory.import(exported)

      expect(newHistory.getSize()).toBe(history.getSize())
      expect(newHistory.getAll()).toHaveLength(2)
    })

    it('should respect history size limit', () => {
      const limitedHistory = new History(5) // Limite de 5 entrées

      // Ajouter 7 calculs
      for (let i = 1; i <= 7; i++) {
        calc.reset()
        calc.add(i)
        limitedHistory.save('add', [i], calc.getValue())
      }

      // Ne doit garder que les 5 derniers
      expect(limitedHistory.getSize()).toBe(5)

      const allEntries = limitedHistory.getAll()
      expect(allEntries[0].result).toBe(3) // Les 2 premiers (1,2) ont été supprimés
      expect(allEntries[4].result).toBe(7)
    })

    it('should handle calculator reset with history preservation', () => {
      calc.add(10)
      history.save('add', [10], calc.getValue())

      calc.multiply(5)
      history.save('multiply', [5], calc.getValue())

      // Reset calculator mais l'historique reste
      calc.reset()
      expect(calc.getValue()).toBe(0)
      expect(history.getSize()).toBe(2) // Historique non affecté

      // Nouveau calcul
      calc.add(100)
      history.save('add', [100], calc.getValue())

      expect(history.getSize()).toBe(3)
    })
  })

  describe('Error Handling in Integration', () => {
    it('should save error cases in history', () => {
      try {
        calc.add(10)
        calc.divide(0) // Va lancer une erreur
      } catch (error) {
        history.save('divide-error', [10, 0], NaN)
      }

      const lastEntry = history.getLast()
      expect(lastEntry?.operation).toBe('divide-error')
      expect(lastEntry?.result).toBeNaN()
    })

    it('should maintain history integrity after calculation errors', () => {
      calc.add(10)
      history.save('add', [10], calc.getValue())

      try {
        calc.divide(0)
      } catch (error) {
        // Error handled, calculator state unchanged
      }

      // Le dernier calcul réussi doit être toujours dans l'historique
      expect(history.getLast()?.result).toBe(10)
      expect(calc.getValue()).toBe(10) // State preserved
    })
  })

  describe('Performance Integration Tests', () => {
    it('should handle large number of calculations efficiently', () => {
      const startTime = Date.now()

      for (let i = 0; i < 1000; i++) {
        calc.reset()
        calc.add(i)
        history.save('add', [i], calc.getValue())
      }

      const endTime = Date.now()
      const duration = endTime - startTime

      // Devrait prendre moins de 100ms pour 1000 opérations
      expect(duration).toBeLessThan(100)
      expect(history.getSize()).toBe(100) // Limite par défaut: 100
    })

    it('should efficiently filter large history by operation', () => {
      // Créer 200 opérations mixtes
      for (let i = 0; i < 100; i++) {
        calc.reset()
        calc.add(i)
        history.save('add', [i], calc.getValue())

        calc.multiply(2)
        history.save('multiply', [2], calc.getValue())
      }

      const startTime = Date.now()
      const addOps = history.getByOperation('add')
      const endTime = Date.now()

      expect(endTime - startTime).toBeLessThan(10) // Filtrage rapide
      expect(addOps.length).toBeGreaterThan(0)
    })
  })
})
