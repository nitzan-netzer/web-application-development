export type SessionPayload = {
    userId: number | string;
    expiresAt: Date;
    isAdmin: boolean;
};