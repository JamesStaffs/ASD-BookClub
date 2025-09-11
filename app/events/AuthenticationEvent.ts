// Subclassed custom event for authentication state changes
export class AuthenticationEvent extends Event {
  constructor() {
    super("authentication");
  }
}

export function dispatchAuthenticationEvent() {
  window.dispatchEvent(new AuthenticationEvent());
}
