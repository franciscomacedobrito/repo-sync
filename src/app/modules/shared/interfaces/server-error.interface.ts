export class ServerErrorInterface {
  public message: string | undefined;

  constructor(message: string) {
    this.message = message
  }
}
