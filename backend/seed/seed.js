import mongoose from "mongoose";
import { connectDb } from "../config/db.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import Project from "../models/Project.js";
import Artifact from "../models/Artifact.js";

async function seedDB() {
    await connectDb();

    //Seeding users
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("asdewq12", 10);

    await User.insertMany([
        {
            username: "john",
            email: "john@gmail.com",
            passwordHash: passwordHash
        },
        {
            username: "jane",
            email: "jane@gmail.com",
            passwordHash: passwordHash
        }
    ]);

    console.log("Users seeded.");

        const user1 = await User.findOne({ username: "john"});
    const user2 = await User.findOne({ username: "jane"});
    if (!user1 || !user2) {
    throw new Error("Required users not found. Seed users first.");
  }
    
    await Project.deleteMany({});

    await Project.insertMany([
        {
           title: "Test Project John",
           description: "A Test Project for assignment 3-4",
           researchField: "Computer Programming",
           ownerId: user1._id
        },
        {
           title: "Test Project Jane",
           description: "A second Test Project for assignment 3-4",
           researchField: "Application Security",
           ownerId: user2._id
        }
    ]);

    console.log("Projects seeded.");

        const projectJohn = await Project.findOne({ownerId: user1._id});
    const projectJane = await Project.findOne({ownerId: user2._id});

    if (!projectJane || !projectJohn){
        throw new Error("Required projects not found. Seed projects first.")
    }

    await Artifact.deleteMany({});
    await Artifact.insertMany([
        {
            title: "Jane's Artifact 1",
            description: "An artifact by Jane on John's project",
            projectId: projectJohn._id,
            ownerId: user2._id
        },
        {
            title: "John's Artifact 1",
            description: "An artifact by John on Jane's project",
            projectId: projectJane._id,
            ownerId: user1._id
        }
    ]);

    console.log("Artifacts seeded")
    await mongoose.disconnect();

}

seedDB().catch((error) => {
  console.error(error);
  process.exit(1);
});