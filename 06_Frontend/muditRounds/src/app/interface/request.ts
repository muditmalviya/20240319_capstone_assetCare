interface User {
    username: string;
    email: string;
    password: string;
    phoneno: number;
    role: 'admin' | 'operator' | 'technician';
    isAvailable: boolean;
  }

  interface Issue{
    // user_id: Types.ObjectId; 
    // user_id_tech?: Types.ObjectId | null; 
    asset_name: string; // Name of the asset associated with the issue
    status: 'Opened' | 'Assigned' | 'Closed'; // Status of the issue
    energy_consumption: number; // Energy consumption related to the issue
    hours_of_operation: number; // Hours of operation related to the issue
    noise_level: number; // Noise level related to the issue
    temperature: number; // Temperature related to the issue
    physical_condition: string; // Physical condition related to the issue
    vibration: number; // Vibration level related to the issue
    description: string; // Description of the issue
}

  
  export { User , Issue};

