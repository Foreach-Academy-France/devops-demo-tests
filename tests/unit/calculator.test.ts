import { describe, it, expect, beforeEach } from 'vitest'
import {
  add,
  subtract,
  multiply,
  divide,
  calculatePercentage,
  calculateTVA,
  calculatePrixTTC,
  calculateInteretsComposes,
  Calculator
} from '../../src/calculator'

describe('Calculator - Basic Operations', () => {
  describe('add()', () => {
    it('should add two positive numbers correctly', () => {
      expect(add(2, 3)).toBe(5)
      expect(add(10, 25)).toBe(35)
    })

    it('should handle negative numbers', () => {
      expect(add(-1, 1)).toBe(0)
      expect(add(-5, -3)).toBe(-8)
      expect(add(-10, 5)).toBe(-5)
    })

    it('should handle decimal numbers', () => {
      expect(add(0.1, 0.2)).toBeCloseTo(0.3)
      expect(add(1.5, 2.3)).toBeCloseTo(3.8)
    })

    it('should handle zero', () => {
      expect(add(0, 0)).toBe(0)
      expect(add(5, 0)).toBe(5)
      expect(add(0, 5)).toBe(5)
    })
  })

  describe('subtract()', () => {
    it('should subtract two numbers correctly', () => {
      expect(subtract(5, 3)).toBe(2)
      expect(subtract(10, 4)).toBe(6)
    })

    it('should handle negative results', () => {
      expect(subtract(3, 5)).toBe(-2)
      expect(subtract(0, 10)).toBe(-10)
    })

    it('should handle negative numbers', () => {
      expect(subtract(-5, -3)).toBe(-2)
      expect(subtract(-5, 3)).toBe(-8)
    })
  })

  describe('multiply()', () => {
    it('should multiply two numbers correctly', () => {
      expect(multiply(3, 4)).toBe(12)
      expect(multiply(5, 6)).toBe(30)
    })

    it('should handle negative numbers', () => {
      expect(multiply(-2, 5)).toBe(-10)
      expect(multiply(-3, -4)).toBe(12)
    })

    it('should handle zero', () => {
      expect(multiply(5, 0)).toBe(0)
      expect(multiply(0, 5)).toBe(0)
    })

    it('should handle decimal numbers', () => {
      expect(multiply(2.5, 4)).toBe(10)
      expect(multiply(0.5, 0.5)).toBe(0.25)
    })
  })

  describe('divide()', () => {
    it('should divide two numbers correctly', () => {
      expect(divide(10, 2)).toBe(5)
      expect(divide(15, 3)).toBe(5)
    })

    it('should handle decimal results', () => {
      expect(divide(10, 4)).toBe(2.5)
      expect(divide(7, 2)).toBe(3.5)
    })

    it('should throw error when dividing by zero', () => {
      expect(() => divide(10, 0)).toThrow('Division by zero is not allowed')
      expect(() => divide(0, 0)).toThrow('Division by zero is not allowed')
    })

    it('should handle negative numbers', () => {
      expect(divide(-10, 2)).toBe(-5)
      expect(divide(10, -2)).toBe(-5)
      expect(divide(-10, -2)).toBe(5)
    })
  })
})

describe('Calculator - Advanced Operations', () => {
  describe('calculatePercentage()', () => {
    it('should calculate percentage correctly', () => {
      expect(calculatePercentage(100, 10)).toBe(10)
      expect(calculatePercentage(200, 25)).toBe(50)
      expect(calculatePercentage(50, 20)).toBe(10)
    })

    it('should handle 0%', () => {
      expect(calculatePercentage(100, 0)).toBe(0)
    })

    it('should handle 100%', () => {
      expect(calculatePercentage(100, 100)).toBe(100)
    })
  })

  describe('calculateTVA()', () => {
    it('should calculate TVA correctly (20%)', () => {
      expect(calculateTVA(100, 20)).toBe(20)
      expect(calculateTVA(50, 20)).toBe(10)
    })

    it('should calculate TVA correctly (10%)', () => {
      expect(calculateTVA(100, 10)).toBe(10)
      expect(calculateTVA(50, 10)).toBe(5)
    })

    it('should calculate TVA correctly (5.5%)', () => {
      expect(calculateTVA(100, 5.5)).toBe(5.5)
    })
  })

  describe('calculatePrixTTC()', () => {
    it('should calculate TTC price correctly', () => {
      expect(calculatePrixTTC(100, 20)).toBe(120)
      expect(calculatePrixTTC(50, 10)).toBe(55)
    })
  })

  describe('calculateInteretsComposes()', () => {
    it('should calculate compound interest correctly', () => {
      // 1000€ à 5% pendant 2 ans = 1102.50€
      expect(calculateInteretsComposes(1000, 5, 2)).toBeCloseTo(1102.5, 1)

      // 1000€ à 10% pendant 3 ans = 1331€
      expect(calculateInteretsComposes(1000, 10, 3)).toBeCloseTo(1331, 1)
    })

    it('should handle 0% interest rate', () => {
      expect(calculateInteretsComposes(1000, 0, 5)).toBe(1000)
    })

    it('should throw error for negative capital', () => {
      expect(() => calculateInteretsComposes(-1000, 5, 2))
        .toThrow('Capital cannot be negative')
    })

    it('should throw error for invalid interest rate', () => {
      expect(() => calculateInteretsComposes(1000, -5, 2))
        .toThrow('Interest rate must be between 0 and 100')
      expect(() => calculateInteretsComposes(1000, 150, 2))
        .toThrow('Interest rate must be between 0 and 100')
    })

    it('should throw error for negative years', () => {
      expect(() => calculateInteretsComposes(1000, 5, -2))
        .toThrow('Number of years cannot be negative')
    })
  })
})

describe('Calculator Class (Stateful)', () => {
  let calc: Calculator

  beforeEach(() => {
    calc = new Calculator()
  })

  it('should initialize with zero', () => {
    expect(calc.getValue()).toBe(0)
  })

  it('should add values correctly', () => {
    calc.add(5)
    expect(calc.getValue()).toBe(5)

    calc.add(3)
    expect(calc.getValue()).toBe(8)
  })

  it('should subtract values correctly', () => {
    calc.add(10)
    calc.subtract(3)
    expect(calc.getValue()).toBe(7)
  })

  it('should multiply values correctly', () => {
    calc.add(5)
    calc.multiply(3)
    expect(calc.getValue()).toBe(15)
  })

  it('should divide values correctly', () => {
    calc.add(20)
    calc.divide(4)
    expect(calc.getValue()).toBe(5)
  })

  it('should reset to zero', () => {
    calc.add(10)
    calc.multiply(5)
    expect(calc.getValue()).toBe(50)

    calc.reset()
    expect(calc.getValue()).toBe(0)
  })

  it('should chain operations correctly', () => {
    calc
      .add(10)
      .multiply(2)
      .subtract(5)
      .divide(3)

    expect(calc.getValue()).toBeCloseTo(5, 1)
  })
})
