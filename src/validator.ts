/**
 * Validation des entrées utilisateur
 */

export interface ValidationResult {
  isValid: boolean
  error?: string
}

export function validateNumber(value: any): ValidationResult {
  if (typeof value !== 'number') {
    return {
      isValid: false,
      error: 'Value must be a number'
    }
  }

  if (isNaN(value)) {
    return {
      isValid: false,
      error: 'Value cannot be NaN'
    }
  }

  if (!isFinite(value)) {
    return {
      isValid: false,
      error: 'Value must be finite'
    }
  }

  return { isValid: true }
}

export function validatePositiveNumber(value: number): ValidationResult {
  const baseValidation = validateNumber(value)
  if (!baseValidation.isValid) {
    return baseValidation
  }

  if (value < 0) {
    return {
      isValid: false,
      error: 'Value must be positive'
    }
  }

  return { isValid: true }
}

export function validatePercentage(value: number): ValidationResult {
  const baseValidation = validateNumber(value)
  if (!baseValidation.isValid) {
    return baseValidation
  }

  if (value < 0 || value > 100) {
    return {
      isValid: false,
      error: 'Percentage must be between 0 and 100'
    }
  }

  return { isValid: true }
}

export function validateDivision(numerator: number, denominator: number): ValidationResult {
  const numValidation = validateNumber(numerator)
  if (!numValidation.isValid) {
    return numValidation
  }

  const denomValidation = validateNumber(denominator)
  if (!denomValidation.isValid) {
    return denomValidation
  }

  if (denominator === 0) {
    return {
      isValid: false,
      error: 'Division by zero is not allowed'
    }
  }

  return { isValid: true }
}
