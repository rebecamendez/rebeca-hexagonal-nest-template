export class CreateTaskCommand {
  public constructor(
    public readonly title: string,
    public readonly description: string
  ) {}
}
