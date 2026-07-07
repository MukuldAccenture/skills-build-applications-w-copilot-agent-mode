import mongoose from 'mongoose';
import ActivityModel from '../models/Activity';
import LeaderboardModel from '../models/Leaderboard';
import TeamModel from '../models/Team';
import UserModel from '../models/User';
import WorkoutModel from '../models/Workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      ActivityModel.deleteMany({}),
      LeaderboardModel.deleteMany({}),
      TeamModel.deleteMany({}),
      UserModel.deleteMany({}),
      WorkoutModel.deleteMany({}),
    ]);

    const users = await UserModel.insertMany([
      {
        name: 'Maya Thompson',
        email: 'maya.thompson@octofit.dev',
        fitnessLevel: 'advanced',
        weeklyGoalMinutes: 320,
      },
      {
        name: 'Aarav Patel',
        email: 'aarav.patel@octofit.dev',
        fitnessLevel: 'intermediate',
        weeklyGoalMinutes: 240,
      },
      {
        name: 'Sofia Kim',
        email: 'sofia.kim@octofit.dev',
        fitnessLevel: 'beginner',
        weeklyGoalMinutes: 180,
      },
    ]);

    const [maya, aarav, sofia] = users;

    await TeamModel.insertMany([
      {
        name: 'City Sprinters',
        city: 'Seattle',
        memberIds: [maya._id, aarav._id],
        captainId: maya._id,
      },
      {
        name: 'Core Collective',
        city: 'Portland',
        memberIds: [aarav._id, sofia._id],
        captainId: aarav._id,
      },
    ]);

    await ActivityModel.insertMany([
      {
        userId: maya._id,
        activityType: 'run',
        durationMinutes: 42,
        caloriesBurned: 460,
        performedAt: new Date('2026-07-01T07:30:00Z'),
      },
      {
        userId: aarav._id,
        activityType: 'strength',
        durationMinutes: 50,
        caloriesBurned: 390,
        performedAt: new Date('2026-07-02T18:10:00Z'),
      },
      {
        userId: sofia._id,
        activityType: 'yoga',
        durationMinutes: 35,
        caloriesBurned: 170,
        performedAt: new Date('2026-07-03T06:45:00Z'),
      },
      {
        userId: maya._id,
        activityType: 'ride',
        durationMinutes: 60,
        caloriesBurned: 540,
        performedAt: new Date('2026-07-04T09:00:00Z'),
      },
    ]);

    await LeaderboardModel.create({
      weekStart: new Date('2026-06-29T00:00:00Z'),
      entries: [
        { userId: maya._id, points: 980, rank: 1 },
        { userId: aarav._id, points: 810, rank: 2 },
        { userId: sofia._id, points: 640, rank: 3 },
      ],
    });

    await WorkoutModel.insertMany([
      {
        title: 'Sunrise Tempo Run',
        level: 'intermediate',
        durationMinutes: 35,
        focusArea: 'Endurance',
        equipment: ['Running Shoes', 'Smartwatch'],
      },
      {
        title: 'Upper Body Builder',
        level: 'advanced',
        durationMinutes: 50,
        focusArea: 'Strength',
        equipment: ['Dumbbells', 'Resistance Bands'],
      },
      {
        title: 'Mobility Reset Flow',
        level: 'beginner',
        durationMinutes: 25,
        focusArea: 'Mobility',
        equipment: ['Yoga Mat'],
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
