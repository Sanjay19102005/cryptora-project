// Simple startup script to check for errors
import('./server.js').catch((error) => {
  console.error('❌ Failed to start server:', error);
  console.error('Error details:', error.message);
  console.error('Stack:', error.stack);
  process.exit(1);
});

