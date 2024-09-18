export const API_BASE_URL =
    process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_API_URL
        : "http://localhost:8000/api/v1";

export const OAUTH_BASE_URL =
    process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_OAUTH_URL
        : "http://localhost:3000/oauth2";