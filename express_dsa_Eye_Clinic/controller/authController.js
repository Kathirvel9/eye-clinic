const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sequelize = require('../config/sequelize');
const UserMaster = require('../models/UserMaster');

// USER LOGIN
exports.userlogin = async (req, res) => {
  try {
    if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET not defined');

    const username = (req.body?.username || req.body?.UserName || '').toLowerCase().trim();
    const password =  req.body?.password || req.body?.UserPassword;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    // Find user
    const user = await UserMaster.findOne({
      where: sequelize.where(
        sequelize.fn('LOWER', sequelize.col('UserName')), username
      ),
      attributes: ['UserId', 'UserName', 'UserPassword']
    });

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.UserPassword);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Password did not match' });
    }

    const tokenPayload = {
      UserId:       user.UserId,
      UserName:     user.UserName,
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '7d' });

    return res.status(200).json({
      message:      'Login successful',
      access_token: token,
      user:         tokenPayload,
    });
  } catch (err) {
    console.error(' Login error:', err.message);
    return res.status(500).json({ message: 'Login failed due to server error', error: err.message });
  }
};

// DASHBOARD
exports.getDashboard = async (req, res) => {
  try {
    const userId = req.user?.UserId;
    if (!userId) return res.status(401).json({ message: 'User not authenticated' });

    const user = await UserMaster.findByPk(userId, {
      attributes: ['UserId', 'UserName'],
    });

    if (!user) return res.status(404).json({ message: 'User not found' });

    return res.status(200).json({ message: 'Dashboard data retrieved', data: user });

  } catch (err) {
    console.error('Dashboard error:', err.message);
    return res.status(500).json({ message: 'Failed to retrieve dashboard data' });
  }
};

// REGISTER
exports.registerNewUser = async (req, res) => {
  try {
    const username = (req.body.UserName || req.body.username || '').trim();
    const password = String(req.body.UserPassword || req.body.password || '');

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const now = new Date();
    //  Check duplicate
    const existingUser = await UserMaster.findOne({ where: { UserName: username } });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    //  Hash and create
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserMaster.create({
      UserName:     username,
      UserPassword: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: {
        UserId: newUser.UserId,
        UserName: newUser.UserName,
      }
    });

  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({
      message: 'Server error during registration',
      error: err.message
    });
  }
};
