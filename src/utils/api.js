/**
 * Authenticated fetch wrapper.
 *
 * Options (in addition to standard fetch options):
 *   suppressAuthRedirect – if true, a 401/403 will throw a regular
 *     error instead of force-redirecting to the Google SSO page.
 *     Use this for background data fetches that should degrade
 *     gracefully when no backend session exists (e.g. mock-only mode).
 */
export const fetchWithAuth = async (url, options = {}) => {
    const { suppressAuthRedirect, ...fetchOptions } = options;

    const mergedOptions = {
        ...fetchOptions,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            ...(fetchOptions.headers || {}),
        }
    };

    const response = await fetch(url, mergedOptions);

    // Global interceptor for Session Expiry / Auth failures
    if (response.status === 401 || response.status === 403) {
        if (suppressAuthRedirect) {
            // Let the caller handle the error gracefully
            throw new Error('Потрібна авторизація через бекенд.');
        }
        console.warn(`[Auth Error] Token expired or unauthorized access to ${url}. Redirecting to login.`);
        // Force the browser to redirect to the Django SSO login page
        window.location.href = '/accounts/google/login/';
        throw new Error('Устаріла сесія. Перенаправлення на сторінку входу...');
    }

    if (!response.ok) {
        // Try to parse error body for detailed messages
        let errorMessage = `API error: ${response.status}`;
        try {
            const errorData = await response.json();
            errorMessage = errorData.detail || errorData.message || JSON.stringify(errorData);
        } catch { /* body wasn't JSON */ }
        throw new Error(errorMessage);
    }

    // Some endpoints might return 204 No Content
    if (response.status === 204) return null;

    return response.json();
};
