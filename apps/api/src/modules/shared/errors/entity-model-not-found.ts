export class EntityModelNotFoundError extends Error {
  public constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, EntityModelNotFoundError.prototype);
  }
}
