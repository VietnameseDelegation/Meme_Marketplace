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
        const response = await fetch('https://api.imgflip.com/get_memes');
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching memes:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch memes' });
    }
});

module.exports = router;
