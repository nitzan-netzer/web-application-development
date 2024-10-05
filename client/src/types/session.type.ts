export type Session = {
    token: string;
    user: {
      userId: string;
      isAdmin: boolean;
      isSeller: boolean;
    };
  }
  