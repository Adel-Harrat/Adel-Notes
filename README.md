# Adel-Notes: A Note-Taking App

Hello! Welcome to Adel-Notes, a project I developed to deepen my skills in Svelte and SvelteKit through hands-on practice. This app is designed to be a simple, functional, and visually pleasing note-taking experience.

![Home page screenshot](/demo/1.jpg)

---

## Tech Stack

Here's what I used to build Adel-Notes:

- **Frontend**: Svelte 5 (using Runes), Shadcn Svelte, Tailwind CSS
- **Backend**: SvelteKit 2
- **Database**: Prisma ORM + MongoDB Atlas

![View note details page](/demo/2.jpg)

---

## Challenges & Solutions

My main focus was on making the app as fast and efficient as possible while maintaining clean, modular code. I spent a lot of time optimizing the site to improve performance and responsiveness on both desktop and mobile devices.

![Update label dialog](/demo/3.jpg)

---

## Key Takeaways

One of the most valuable lessons from this project was the importance of reusable components. By creating versatile components, I made the app more adaptable to future changes—a practice I plan to carry into future projects.

![Mobile drawer](/demo/4.jpg)

---

## A Few Things to Note

- You can sign in with a temporary email if you don’t want to use a personal one (services like TempMail work great for this).
- For demo purposes, note-taking is limited: you can create a maximum of 10 notes or labels. If you’re interested in expanding this limit, feel free to fork the GitHub repo, deploy it on Vercel, and adjust the limit by modifying the condition in `+page.server.ts` (line 50) and in `labels/+page.server.ts` (line 36).

[Preview Adel-Notes](https://adel-notes.vercel.app/){:target="\_blank"}

If you enjoy using Adel-Notes, please consider leaving a star on the GitHub repo. 🌟👋
