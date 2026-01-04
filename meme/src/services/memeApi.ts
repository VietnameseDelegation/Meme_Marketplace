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

export const getMemes = async (): Promise<Meme[]> => {
    const response = await fetch(API_URL);
    const json = await response.json();

    if (!json.success) {
        throw new Error('Failed to fetch memes');
    }

    const memes: Meme[] = json.data.memes;

    // Augment data
    const categories = ["animals", "celebrities", "gaming", "school", "random"];

    return memes.map(meme => ({
        ...meme,
        rating: parseFloat((Math.random() * 4 + 1).toFixed(1)), // 1.0 - 5.0
        category: categories[Math.floor(Math.random() * categories.length)],
        price: 0 // Will be calculated dynamically based on rating
    })).map(meme => ({
        ...meme,
        price: Math.round((meme.rating || 0) * 25)
    }));
};
