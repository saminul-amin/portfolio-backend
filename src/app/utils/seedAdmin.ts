import User from "../modules/user/user.model";

export const seedAdmin = async () => {
  try {
    // Check if admin already exists
    const adminExists = await User.findOne({ email: "saminul.amin@gmail.com" });

    if (adminExists) {
      console.log("Admin user already exists");
      process.exit(0);
    }

    // Create admin user
    const admin = await User.create({
      name: "Admin User",
      email: "saminul.amin@gmail.com",
      password: "admin123",
      role: "admin",
    });

    console.log("Admin user created successfully");
    console.log("Email: saminul.amin@gmail.com");
    console.log("Password: admin123");
    console.log("Please change the password after first login!");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding admin:", error);
    process.exit(1);
  }
};

