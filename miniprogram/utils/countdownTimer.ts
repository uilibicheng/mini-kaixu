export class CountdownTimer {
  private remainingSeconds: number
  private intervalId: any
  private onTickCallback: (hours: number, minutes: number, seconds: number) => void
  private onCompleteCallback: () => void

  constructor(
    totalSeconds: number,
    onTickCallback: (hours: number, minutes: number, seconds: number) => void,
    onCompleteCallback?: () => void,
  ) {
    this.remainingSeconds = totalSeconds
    this.intervalId = null
    this.onTickCallback = onTickCallback
    this.onCompleteCallback = onCompleteCallback || (() => {})
  }

  start(): void {
    this.intervalId = setInterval(() => {
      if (this.remainingSeconds <= 0) {
        this.stop()
        return
      }

      const [hours, minutes, seconds] = this.countdownFormatter(this.remainingSeconds)
      this.onTickCallback(hours, minutes, seconds)
      this.remainingSeconds--
    }, 1000)
  }

  stop(): void {
    clearInterval(this.intervalId)
    this.onCompleteCallback()
  }

  private countdownFormatter(hourglass: number): [number, number, number] {
    const hours = Math.floor(hourglass / 3600)
    const minutes = Math.floor((hourglass % 3600) / 60)
    const seconds = hourglass % 60
    return [hours, minutes, seconds]
  }
}
