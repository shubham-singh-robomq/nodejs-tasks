import inquirer from 'inquirer';
import db from './db.js';
import tumblr from './tumblr.js';

const main = async () => {
    try {
        // Get blog name from user
        const { blogName } = await inquirer.prompt([
            {
                type: 'input',
                name: 'blogName',
                message: 'Enter the Tumblr blog name (e.g., good.tumblr.com):',
                validate: input => input.includes('.tumblr.com') || 'Please enter a valid Tumblr blog URL'
            }
        ]);

        // Clean the blog name
        const cleanBlogName = blogName.replace('.tumblr.com', '');

        console.log('Fetching blog information...');
        const blogInfo = await tumblr.getBlogInfo(cleanBlogName);
        
        // Print basic info
        console.log('\nBlog Information:');
        console.log('-----------------');
        console.log(`Title: ${blogInfo.title}`);
        console.log(`Description: ${blogInfo.description}`);
        console.log(`Total Posts: ${blogInfo.posts}`);

        // Create database schema
        console.log('\nCreating database schema...');
        await db.createBlogSchema(cleanBlogName);
        await db.saveBlogInfo(cleanBlogName, {
            title: blogInfo.title,
            description: blogInfo.description,
            posts: blogInfo.posts,
        });

        // Fetch and save images
        console.log('\nFetching and saving images...');
        const posts = await tumblr.getBlogPosts(cleanBlogName);
        const images = tumblr.extractImageUrls(posts);
        
        console.log(`Found ${images.length} images in 1280px format`);
        for (const image of images) {
            await db.saveImage(cleanBlogName, image);
        }

        console.log('\nProcess completed successfully!');
    } catch (error) {
        console.error('An error occurred:', error.message);
    }
};

main();
