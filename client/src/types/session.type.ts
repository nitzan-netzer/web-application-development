export type Session = {
    token: string;
    user: {
      userId: string;
      username: string;
      name: string;
      isAdmin: boolean;
      isSeller: boolean;
    };
  }
  