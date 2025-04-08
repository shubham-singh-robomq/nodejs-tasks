import mysql from 'mysql2/promise';
import 'dotenv/config';

class Database {
    constructor() {
        this.pool = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });
    }

    createBlogSchema = async (blogName) => {
        const connection = await this.pool.getConnection();
        try {
            // Create blog info table
            await connection.execute(`
                CREATE TABLE IF NOT EXISTS \`${blogName}_info\` (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    title VARCHAR(255),
                    description TEXT,
                    posts INT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `);

            // Create images table
            await connection.execute(`
                CREATE TABLE IF NOT EXISTS \`${blogName}_images\` (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    post_id VARCHAR(255),
                    image_url TEXT,
                    width INT,
                    height INT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `);
        } finally {
            connection.release();
        }
    }

    saveBlogInfo = async (blogName, info) => {
        const connection = await this.pool.getConnection();
        try {
            await connection.execute(
                `INSERT INTO \`${blogName}_info\` (title, description, posts) VALUES (?, ?, ?)`,
                [info.title, info.description, info.posts]
            );
        } finally {
            connection.release();
        }
    }

    saveImage = async (blogName, imageData) => {
        const connection = await this.pool.getConnection();
        try {
            await connection.execute(
                `INSERT INTO \`${blogName}_images\` (post_id, image_url, width, height) VALUES (?, ?, ?, ?)`,
                [imageData.postId, imageData.url, imageData.width, imageData.height]
            );
        } finally {
            connection.release();
        }
    }
}

const database = new Database();
export default database; 