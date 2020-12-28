export function checkLocalStorage(): string | null | undefined {
    if (localStorage.getItem('username') && localStorage.getItem('username') !== '') {
        return localStorage.getItem('username');
    }
}
