const {withNextVideo} = require('next-video/process');

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "img.clerk.com",

            },
            {
                hostname: 'firebasestorage.googleapis.com',
            },
        ]
    }
}

module.exports = withNextVideo(nextConfig)
