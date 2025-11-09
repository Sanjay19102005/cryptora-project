// Development mode in-memory store (when MongoDB is not available)
export let devUsers = [];
export let devOTPs = {};

export const devStore = {
  // Add user
  addUser: (userData) => {
    const user = {
      id: userData.id || 'dev-' + Date.now(),
      username: userData.username,
      email: userData.email,
      password: userData.password,
      isVerified: false,
      createdAt: new Date()
    };
    devUsers.push(user);
    return user;
  },

  // Find user by username or email
  findUser: (identifier) => {
    return devUsers.find(u => u.username === identifier || u.email === identifier);
  },

  // Store OTP
  storeOTP: (email, otp) => {
    devOTPs[email] = {
      otp,
      expires: new Date(Date.now() + 10 * 60 * 1000) // 10 minutes
    };
  },

  // Verify OTP
  verifyOTP: (email, otp) => {
    const stored = devOTPs[email];
    if (!stored) return false;
    if (stored.otp !== otp) return false;
    if (stored.expires < new Date()) return false;
    return true;
  },

  // Mark user as verified
  verifyUser: (email) => {
    const user = devUsers.find(u => u.email === email);
    if (user) {
      user.isVerified = true;
      delete devOTPs[email];
      return true;
    }
    return false;
  },

  // Clear all (for testing)
  clear: () => {
    devUsers = [];
    devOTPs = {};
  }
};

