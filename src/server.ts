import app from "./app";
import { connectDB } from "./config/db";
import { initBirthdayCron } from "./cron/birthdayCron";
import { User } from "./models/User";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 5000;

// Seed a default admin if none exists
const seedAdminUser = async (): Promise<void> => {
    try {
        const seedEmail = process.env.SEED_ADMIN_EMAIL || 'info@nicegene.com';
        const seedUsername = process.env.SEED_ADMIN_USERNAME || 'admin';
        const seedPassword = process.env.SEED_ADMIN_PASSWORD || 'Nicegene26';
        const seedRole = (process.env.SEED_ADMIN_ROLE || 'admin') as 'admin' | 'superadmin';

        const adminExists = await User.findOne({ email: seedEmail });
        if (!adminExists) {
            await User.create({
                username: seedUsername,
                email: seedEmail,
                password: seedPassword, // Automatically hashed via Mongoose pre-save hook
                role: seedRole,
            });
            console.log(`[Seed] Default admin account seeded: ${seedEmail}`);
        }
    } catch (error) {
        console.error('[Seed] Error seeding default admin:', error);
    }
};

const startServer = async () => {
    // Connect to Database
    await connectDB();
    // Seed Admin Account
    await seedAdminUser();
    // Initialize Birthday Cron Job
    initBirthdayCron();
    // Start Express Server
    app.listen(PORT, () => {
        console.log(`[Server] Running on http://localhost:${PORT}`);
    });
};

startServer();
