interface User {
    username: string;
    email: string;
    password: string;
    phoneno: number;
    role: 'admin' | 'operator' | 'technician';
    isAvailable: boolean;
  }
  
  export { User };
  