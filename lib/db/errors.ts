export class DatabaseError extends Error {
  constructor(
    message: string,
    public code?: string,
    public cause?: unknown
  ) {
    super(message)
    this.name = 'DatabaseError'
  }
}

export class NotFoundError extends Error {
  constructor(resource: string, identifier: string | number) {
    super(`${resource} with identifier '${identifier}' not found`)
    this.name = 'NotFoundError'
  }
}

export function handleDatabaseError(error: unknown): never {
  if (error instanceof DatabaseError) {
    throw error
  }

  if (error instanceof Error) {
    throw new DatabaseError(error.message, undefined, error)
  }

  throw new DatabaseError('An unknown database error occurred', undefined, error)
}

export function isDatabaseError(error: unknown): error is DatabaseError {
  return error instanceof DatabaseError
}

export function isNotFoundError(error: unknown): error is NotFoundError {
  return error instanceof NotFoundError
}
