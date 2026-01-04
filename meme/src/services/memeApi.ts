export interface Meme {
    id: string;
    name: string;
    url: string;
    width: number;
    height: number;
    box_count: number;
    // Extended properties
    rating?: number;
    category?: string;
    price?: number;
}

const API_URL = 'http://localhost:3000/api/memes';

export interface MemesResponse {
    memes: Meme[];
    hasMore: boolean;
    total: number;
}

export const getMemes = async (page = 1, limit = 10): Promise<MemesResponse> => {
    const response = await fetch(`${API_URL}?page=${page}&limit=${limit}`);
    const json = await response.json();

    if (!json.success) {
        throw new Error('Failed to fetch memes');
    }

    return json.data;
};
