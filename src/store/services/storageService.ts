class storageService {
    set(key: any, value: any) {
        localStorage.setItem(key, JSON.stringify(value));
        // Notificar a la app que hubo un cambio en storage
        if (typeof window !== 'undefined') {
            window.dispatchEvent(
                new CustomEvent('app:storage-changed', { detail: { key, value } })
            );
        }
    }

    get(key: any) {
        try {
            const raw = localStorage.getItem(key);
            if (raw === null || raw === undefined) return null;
            return JSON.parse(raw);
        } catch (e) {
            // Si no es JSON válido, retorna como texto
            return localStorage.getItem(key);
        }
    }

    remove(key: any) {
        localStorage.removeItem(key);
        if (typeof window !== 'undefined') {
            window.dispatchEvent(
                new CustomEvent('app:storage-changed', { detail: { key, removed: true } })
            );
        }
    }
}

export default new storageService();