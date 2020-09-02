module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DB_URL: process.env.DB_URL || 'postgresql://lifescribe@localhost/lifescribe',
  JWT_SECRET: process.env.JWT_SECRET || '014420fe-67a4-4c64-baf0-5d49481ab411'
};