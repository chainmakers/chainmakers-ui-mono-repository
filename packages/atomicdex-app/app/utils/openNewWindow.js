// @flow
export default function openNewWindow(url: string) {
  return window.open(url, '_blank');
}
