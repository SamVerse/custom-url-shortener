import { nanoid } from 'nanoid';
import { URL } from '../models/url.js';


// Function to generate a new short URL
async function handleGenerateNewShortURL(req, res) {
    const { url } = req.body;
    if(!url) {
        return res.status(400).json({message: 'URL is required'});
    }
    const shortId = nanoid(8);
    await URL.create({
        shortId,
        redirectedUrl: url,
        visitHistory: [],
        createdBy: req.user._id
    });
    return res.render('home', {
        id: shortId
    });
}


// Function to get analytics of a short URL
async function handleGetAnalytics(req, res) {
    try {
        const { shortId } = req.params;
        const result = await URL.findOne({ shortId });
        return res.json({
            totalClicks: result.visitHistory.length,
            analytics: result.visitHistory 
        });
    } catch (error) {
        console.log('Error getting analytics: ', error);
    }
}

export { handleGenerateNewShortURL , handleGetAnalytics };