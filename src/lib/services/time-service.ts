class TimeService {
  constructor(private readonly timeout: number) {}

  getProgressSpeed() {
    return 1 / this.timeout;
  }

  wait() {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, this.timeout);
    });
  }
}