// Simple authentication utilities (localStorage-based simulation)

// Hash password (simple simulation - in production use proper hashing)
const hashPassword = (password) => {
  // Simple hash simulation - in production, use bcrypt or similar
  return btoa(password).split('').reverse().join('') + '_hash'
}

// Generate verification token
const generateToken = () => {
  return 'VERIFY_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

// Store user account
export const createAccount = (username, email, password) => {
  const users = JSON.parse(localStorage.getItem('cryptora_users') || '[]')
  
  // Check if username or email already exists
  if (users.find(u => u.username === username)) {
    return { success: false, message: 'Username already exists' }
  }
  
  if (users.find(u => u.email === email)) {
    return { success: false, message: 'Email already exists' }
  }
  
  const hashedPassword = hashPassword(password)
  const verificationToken = generateToken()
  
  const newUser = {
    username,
    email,
    password: hashedPassword,
    verified: false,
    verificationToken,
    createdAt: new Date().toISOString()
  }
  
  users.push(newUser)
  localStorage.setItem('cryptora_users', JSON.stringify(users))
  
  // Store verification token for easy access
  localStorage.setItem(`cryptora_verify_${username}`, verificationToken)
  
  return { success: true, message: 'Account created. Verify to continue.', verificationToken }
}

// Verify account
export const verifyAccount = (username, token) => {
  const users = JSON.parse(localStorage.getItem('cryptora_users') || '[]')
  const user = users.find(u => u.username === username)
  
  if (!user) {
    return { success: false, message: 'Account not found' }
  }
  
  if (user.verified) {
    return { success: true, message: 'Account already verified' }
  }
  
  if (user.verificationToken !== token) {
    return { success: false, message: 'Invalid verification token' }
  }
  
  user.verified = true
  localStorage.setItem('cryptora_users', JSON.stringify(users))
  
  return { success: true, message: 'Account verified successfully' }
}

// Login
export const login = (username, password) => {
  const users = JSON.parse(localStorage.getItem('cryptora_users') || '[]')
  const user = users.find(u => u.username === username)
  
  if (!user) {
    return { success: false, message: 'Account not found.' }
  }
  
  const hashedPassword = hashPassword(password)
  if (user.password !== hashedPassword) {
    return { success: false, message: 'Incorrect password.' }
  }
  
  if (!user.verified) {
    return { success: false, message: 'Account not verified.', needsVerification: true, token: user.verificationToken }
  }
  
  // Store current user session
  localStorage.setItem('cryptora_current_user', JSON.stringify({
    username: user.username,
    email: user.email,
    loginTime: new Date().toISOString()
  }))
  
  return { success: true, message: 'Login successful', user: { username: user.username, email: user.email } }
}

// Get current user
export const getCurrentUser = () => {
  const userStr = localStorage.getItem('cryptora_current_user')
  return userStr ? JSON.parse(userStr) : null
}

// Logout
export const logout = () => {
  localStorage.removeItem('cryptora_current_user')
  localStorage.removeItem('tor-unveil-auth')
}

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!localStorage.getItem('cryptora_current_user')
}

