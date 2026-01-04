const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /api/memes:
 *   get:
 *     summary: Get memes from Imgflip API
 *     responses:
 *       200:
 *         description: A list of memes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     memes:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           name:
 *                             type: string
 *                           url:
 *                             type: string
 *                           width:
 *                             type: integer
 *                           height:
 *                             type: integer
 *                           box_count:
 *                             type: integer
 */
router.get('/memes', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const response = await fetch('https://api.imgflip.com/get_memes');
        const data = await response.json();

        if (data.success) {
            const allMemes = data.data.memes;

            const paginatedMemes = allMemes.slice(startIndex, endIndex);

            // Artificial categories and ratings for demo purposes
            const enrichedMemes = paginatedMemes.map(meme => ({
                ...meme,
                price: Math.floor(Math.random() * 50) + 10,
                rating: (Math.random() * 2 + 3).toFixed(1),
                category: ["animals", "celebrities", "gaming", "school", "random"][Math.floor(Math.random() * 5)]
            }));

            res.json({
                success: true,
                data: {
                    memes: enrichedMemes,
                    hasMore: endIndex < allMemes.length,
                    total: allMemes.length
                }
            });
        } else {
            res.status(502).json({ success: false, message: 'Imgflip API error' });
        }
    } catch (error) {
        console.error('Error fetching memes:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch memes' });
    }
});

module.exports = router;
