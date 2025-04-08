import axios from 'axios';

class TumblrClient {
    constructor() {
        this.baseUrl = 'https://api.tumblr.com/v2/blog';
    }

    getBlogInfo = async (blogName) => {
        try {
            const url = `${this.baseUrl}/${blogName}/info`;
            const response = await axios.get(url,{
                
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${process.env.TUMBLR_CONSUMER_KEY}`
                }
            });
            return response.data.response.blog;
        } catch (error) {
            throw new Error(`Failed to fetch blog info: ${error.message}`);
        }
    }

    getBlogPosts = async (blogName) => {
        try {
            const response = await axios.get(`${this.baseUrl}/${blogName}/posts/photo`,{
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${process.env.TUMBLR_CONSUMER_KEY}`
                }
            });
            return response.data.response.posts;
        } catch (error) {
            throw new Error(`Failed to fetch blog posts: ${error.message}`);
        }
    }

    extractImageUrls = (posts) => {
        return posts.flatMap(post => 
            post.photos?.map(photo => {
                const image1280 = photo.alt_sizes.find(size => size.width === 1280);
                return image1280 ? {
                    postId: post.id,
                    url: image1280.url,
                    width: image1280.width,
                    height: image1280.height
                } : null;
            }).filter(Boolean) || []
        );
    }
}

const tumblrClient = new TumblrClient();
export default tumblrClient; 