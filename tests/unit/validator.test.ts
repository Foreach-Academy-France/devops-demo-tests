import { describe, it, expect } from 'vitest'
import {
  validateNumber,
  validatePositiveNumber,
  validatePercentage,
  validateDivision
} from '../../src/validator'

describe('Validator - validateNumber()', () => {
  it('should validate valid numbers', () => {
    expect(validateNumber(5).isValid).toBe(true)
    expect(validateNumber(0).isValid).toBe(true)
    expect(validateNumber(-5).isValid).toBe(true)
    expect(validateNumber(3.14).isValid).toBe(true)
  })

  it('should reject non-numbers', () => {
    const result = validateNumber('5')
    expect(result.isValid).toBe(false)
    expect(result.error).toBe('Value must be a number')
  })

  it('should reject NaN', () => {
    const result = validateNumber(NaN)
    expect(result.isValid).toBe(false)
    expect(result.error).toBe('Value cannot be NaN')
  })

  it('should reject Infinity', () => {
    const result = validateNumber(Infinity)
    expect(result.isValid).toBe(false)
    expect(result.error).toBe('Value must be finite')
  })

  it('should reject -Infinity', () => {
    const result = validateNumber(-Infinity)
    expect(result.isValid).toBe(false)
    expect(result.error).toBe('Value must be finite')
  })
})

describe('Validator - validatePositiveNumber()', () => {
  it('should validate positive numbers', () => {
    expect(validatePositiveNumber(5).isValid).toBe(true)
    expect(validatePositiveNumber(0).isValid).toBe(true)
    expect(validatePositiveNumber(3.14).isValid).toBe(true)
  })

  it('should reject negative numbers', () => {
    const result = validatePositiveNumber(-5)
    expect(result.isValid).toBe(false)
    expect(result.error).toBe('Value must be positive')
  })

  it('should inherit base number validation', () => {
    expect(validatePositiveNumber(NaN).isValid).toBe(false)
    expect(validatePositiveNumber(Infinity).isValid).toBe(false)
  })
})

describe('Validator - validatePercentage()', () => {
  it('should validate valid percentages', () => {
    expect(validatePercentage(0).isValid).toBe(true)
    expect(validatePercentage(50).isValid).toBe(true)
    expect(validatePercentage(100).isValid).toBe(true)
    expect(validatePercentage(20.5).isValid).toBe(true)
  })

  it('should reject percentages below 0', () => {
    const result = validatePercentage(-1)
    expect(result.isValid).toBe(false)
    expect(result.error).toBe('Percentage must be between 0 and 100')
  })

  it('should reject percentages above 100', () => {
    const result = validatePercentage(101)
    expect(result.isValid).toBe(false)
    expect(result.error).toBe('Percentage must be between 0 and 100')
  })

  it('should inherit base number validation', () => {
    expect(validatePercentage(NaN).isValid).toBe(false)
    expect(validatePercentage(Infinity).isValid).toBe(false)
  })
})

describe('Validator - validateDivision()', () => {
  it('should validate valid division', () => {
    expect(validateDivision(10, 2).isValid).toBe(true)
    expect(validateDivision(0, 5).isValid).toBe(true)
    expect(validateDivision(-10, 2).isValid).toBe(true)
  })

  it('should reject division by zero', () => {
    const result = validateDivision(10, 0)
    expect(result.isValid).toBe(false)
    expect(result.error).toBe('Division by zero is not allowed')
  })

  it('should validate both numerator and denominator', () => {
    expect(validateDivision(NaN, 5).isValid).toBe(false)
    expect(validateDivision(5, NaN).isValid).toBe(false)
    expect(validateDivision(Infinity, 5).isValid).toBe(false)
  })
})
