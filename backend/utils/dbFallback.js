// Fallback user storage when MongoDB is not available (development only)
let fallbackUsers = [];

export const fallbackUserStorage = {
  // Find user by email or username
  findOne: async (query) => {
    const users = fallbackUsers;
    if (query.$or) {
      return users.find(u => 
        query.$or.some(condition => {
          if (condition.email) return u.email === condition.email;
          if (condition.username) return u.username === condition.username;
          return false;
        })
      ) || null;
    }
    if (query.email) {
      return users.find(u => u.email === query.email) || null;
    }
    if (query.username) {
      return users.find(u => u.username === query.username) || null;
    }
    return null;
  },

  // Save user
  save: async (userData) => {
    const existingIndex = fallbackUsers.findIndex(u => 
      u.email === userData.email || u.username === userData.username
    );
    
    if (existingIndex >= 0) {
      fallbackUsers[existingIndex] = { ...fallbackUsers[existingIndex], ...userData };
      return fallbackUsers[existingIndex];
    } else {
      const newUser = { ...userData, _id: Date.now().toString() };
      fallbackUsers.push(newUser);
      return newUser;
    }
  },

  // Clear all users (for testing)
  clear: () => {
    fallbackUsers = [];
  },

  // Get all users (for debugging)
  getAll: () => {
    return fallbackUsers;
  }
};

