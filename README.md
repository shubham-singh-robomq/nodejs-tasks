# Tumblr Blog Scraper

This program fetches information and images from Tumblr blogs and stores them in a MySQL database.

## Prerequisites

- Node.js (v14 or higher)
- MySQL Server
- Tumblr API credentials

## Setup

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and fill in your credentials:
   ```bash
   cp .env.example .env
   ```
4. Edit `.env` with your:
   - Tumblr API credentials
   - MySQL database credentials

## Getting Tumblr API Credentials

1. Go to https://www.tumblr.com/oauth/apps
2. Create a new application
3. Copy the OAuth Consumer Key and Secret
4. Generate an access token and secret

## Usage

Run the program:
```bash
npm start
```

The program will:
1. Ask for a Tumblr blog name
2. Fetch basic information about the blog
3. Create a MySQL schema for the blog
4. Save all 1280px format images from the blog

## Database Structure

For each blog, two tables are created:
- `{blogname}_info`: Stores basic blog information
- `{blogname}_images`: Stores image URLs and metadata

