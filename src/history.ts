/**
 * Gestionnaire d'historique des calculs
 */

export interface HistoryEntry {
  operation: string
  inputs: number[]
  result: number
  timestamp: Date
}

export class History {
  private entries: HistoryEntry[] = []
  private maxEntries: number

  constructor(maxEntries: number = 100) {
    this.maxEntries = maxEntries
  }

  save(operation: string, inputs: number[], result: number): void {
    const entry: HistoryEntry = {
      operation,
      inputs,
      result,
      timestamp: new Date()
    }

    this.entries.push(entry)

    // Limiter la taille de l'historique
    if (this.entries.length > this.maxEntries) {
      this.entries.shift() // Supprimer la plus ancienne entrée
    }
  }

  getAll(): HistoryEntry[] {
    return [...this.entries] // Retourner une copie
  }

  getLast(): HistoryEntry | null {
    return this.entries.length > 0 ? this.entries[this.entries.length - 1] : null
  }

  getByOperation(operation: string): HistoryEntry[] {
    return this.entries.filter(entry => entry.operation === operation)
  }

  clear(): void {
    this.entries = []
  }

  getSize(): number {
    return this.entries.length
  }

  export(): string {
    return JSON.stringify(this.entries, null, 2)
  }

  import(jsonData: string): void {
    try {
      const data = JSON.parse(jsonData)
      if (!Array.isArray(data)) {
        throw new Error('Invalid data format')
      }

      // Valider et convertir les dates
      this.entries = data.map(entry => ({
        ...entry,
        timestamp: new Date(entry.timestamp)
      }))
    } catch (error) {
      throw new Error('Failed to import history: ' + (error as Error).message)
    }
  }
}
