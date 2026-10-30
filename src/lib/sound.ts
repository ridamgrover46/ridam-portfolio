/**
 * Sound Manager (Disabled per user request)
 */

class SoundEffectsManager {
  public toggleMute(): boolean {
    return false;
  }

  public getStatus(): boolean {
    return false;
  }

  public playClick() {}
  public playSuccess() {}
  public playHover() {}
  public playWhoosh() {}
}

export const soundManager = new SoundEffectsManager();
