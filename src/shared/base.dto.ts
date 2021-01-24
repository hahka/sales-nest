export abstract class BaseDTO {
  public abstract toEntity(): any;
  static columnsSortBlacklist(): string[] {
    return [];
  }
}
