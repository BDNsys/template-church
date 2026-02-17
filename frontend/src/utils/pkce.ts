/**
 * Generates a random string to be used as a code verifier for PKCE.
 * @param length The length of the verifier (recommended 43-128 characters)
 */
export const generateCodeVerifier = (length: number = 64): string => {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
    let result = '';
    const array = new Uint8Array(length);
    window.crypto.getRandomValues(array);
    for (let i = 0; i < length; i++) {
        result += charset[array[i] % charset.length];
    }
    return result;
};

/**
 * Generates a SHA-256 code challenge from a code verifier.
 * @param verifier The code verifier
 */
export const generateCodeChallenge = async (verifier: string): Promise<string> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(verifier);
    const hash = await window.crypto.subtle.digest('SHA-256', data);

    // Base64URL encode the hash
    const base64 = btoa(String.fromCharCode(...new Uint8Array(hash)))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');

    return base64;
};
