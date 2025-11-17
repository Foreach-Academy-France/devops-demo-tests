/**
 * Calculatrice financière - Logique métier
 */

// Opérations de base
export function add(a: number, b: number): number {
  return a + b
}

export function subtract(a: number, b: number): number {
  return a - b
}

export function multiply(a: number, b: number): number {
  return a * b
}

export function divide(a: number, b: number): number {
  if (b === 0) {
    throw new Error('Division by zero is not allowed')
  }
  return a / b
}

// Opérations avancées
export function calculatePercentage(value: number, percentage: number): number {
  return (value * percentage) / 100
}

export function calculateTVA(prixHT: number, tauxTVA: number): number {
  return calculatePercentage(prixHT, tauxTVA)
}

export function calculatePrixTTC(prixHT: number, tauxTVA: number): number {
  return prixHT + calculateTVA(prixHT, tauxTVA)
}

export function calculateInteretsComposes(
  capital: number,
  tauxAnnuel: number,
  nombreAnnees: number
): number {
  if (capital < 0) {
    throw new Error('Capital cannot be negative')
  }
  if (tauxAnnuel < 0 || tauxAnnuel > 100) {
    throw new Error('Interest rate must be between 0 and 100')
  }
  if (nombreAnnees < 0) {
    throw new Error('Number of years cannot be negative')
  }

  const taux = tauxAnnuel / 100
  return capital * Math.pow(1 + taux, nombreAnnees)
}

// Classe Calculator avec état
export class Calculator {
  private currentValue: number = 0

  getValue(): number {
    return this.currentValue
  }

  reset(): void {
    this.currentValue = 0
  }

  add(value: number): this {
    this.currentValue = add(this.currentValue, value)
    return this
  }

  subtract(value: number): this {
    this.currentValue = subtract(this.currentValue, value)
    return this
  }

  multiply(value: number): this {
    this.currentValue = multiply(this.currentValue, value)
    return this
  }

  divide(value: number): this {
    this.currentValue = divide(this.currentValue, value)
    return this
  }
}
