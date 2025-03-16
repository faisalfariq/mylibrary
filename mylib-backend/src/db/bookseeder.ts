import { db } from "./db.js";
import { books } from "./schema.js";

async function seed() {
    console.log("Seeding database...");

    await db.insert(books).values([
        {
            title: "Clean Code",
            category: "Programming",
            publisher: "Prentice Hall",
            isbn: "978-0132350884",
            author: "Robert C. Martin",
            year: 2008,
            price: 459900,
            desc: "A Handbook of Agile Software Craftsmanship."
        },
        {
            title: "The Pragmatic Programmer",
            category: "Programming",
            publisher: "Addison-Wesley",
            isbn: "978-0135957059",
            author: "Andrew Hunt, David Thomas",
            year: 1999,
            price: 399900,
            desc: "Your Journey To Mastery."
        },
        {
            title: "Atomic Habits",
            category: "Self-Development",
            publisher: "Avery",
            isbn: "978-0735211292",
            author: "James Clear",
            year: 2018,
            price: 270000,
            desc: "An Easy & Proven Way to Build Good Habits & Break Bad Ones."
        },
        {
            title: "Design Patterns",
            category: "Software Engineering",
            publisher: "Addison-Wesley",
            isbn: "978-0201633610",
            author: "Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides",
            year: 1994,
            price: 549900,
            desc: "Elements of Reusable Object-Oriented Software."
        },
        {
            title: "The Lean Startup",
            category: "Business",
            publisher: "Crown Business",
            isbn: "978-0307887894",
            author: "Eric Ries",
            year: 2011,
            price: 299900,
            desc: "How Today’s Entrepreneurs Use Continuous Innovation to Create Radically Successful Businesses."
        }
    ]);

    console.log("Seeding completed!");
    process.exit(0);
}

seed().catch((err) => {
    console.error("Error seeding database:", err);
    process.exit(1);
});
