/*
 * External variables are injected into `window.env`.
 */
interface Window {
    readonly env: { [variable: string]: any }
}