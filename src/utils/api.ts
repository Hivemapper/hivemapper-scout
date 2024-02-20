export const handleResponse = async (response: Response, url: string): Promise<any> => {
    let json: any;

    if (!response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType.includes('application/json')) {
            json = await response.json();
        }

        throw new Error(json?.error || `${response.status} while fetching ${url}`);
    }

    return await response.json()
}