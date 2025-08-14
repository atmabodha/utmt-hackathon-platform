# 🏆 Open Source Coding Contest Platform

An **open-source** platform for hosting and participating in coding contests with ease.
We aim to make competitive programming more **accessible**, **affordable**, and **feature-rich** for everyone — from college clubs to independent organizers.

---

## 🚀 Problem We Solve

**Challenges with Existing Platforms**

* ❌ **No free hosting** — Most big platforms (LeetCode, CodeForces, etc.) don’t allow custom contests.
* ❌ **Strict eligibility rules** — Must have participated in many contests before hosting.
* ❌ **High costs** — Many charge heavily for hosting or anti-cheating tools.
* ❌ **Poor cheating prevention** — Free tools rarely include built-in measures.

**Our Solution**

* ✔️ Host contests instantly — No lengthy approval process.
* ✔️ Custom problem libraries.
* ✔️ Affordable (and free for basic use).
* ✔️ Built-in **AI-powered cheating prevention**.

---

## 🎯 Target Audience

* **College students**
* **Programming clubs & organizations**
* **Hackathon and contest organizers**

---

## 🛠️ Features

### ✅ Current

* User account creation & authentication
* Host dashboard for creating contests
* Participant registration & contest joining

### 🔄 In Progress

* Participant dashboard with live/upcoming/past contests
* Host & participant profile pages

### 📅 Planned

* Real-time leaderboards & analytics
* Advanced cheating detection
* Problem repository for reusability
* Hackathon support

---

## 💻 Tech Stack

| Layer               | Tech                  |
| ------------------- | --------------------- |
| **Frontend**        | React.js              |
| **Backend**         | Django REST Framework |
| **Database**        | PostgreSQL            |
| **API Testing**     | Postman               |
| **Version Control** | Git & GitHub          |

---

## 📦 Installation & Setup

Follow these steps to set up the project locally:

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/utmt-hackathon-platform.git
```

### 2️⃣ Backend Setup (Django + DRF)

```bash
cd backend
python -m venv venv
source venv/bin/activate   # On Windows use venv\Scripts\activate
pip install -r requirements.txt
```

* Create a `.env` file inside `backend/` with:

```env
SECRET_KEY=your_django_secret
DEBUG=True
DATABASE_URL=postgres://username:password@localhost:5432/dbname
```

* Run migrations:

```bash
python manage.py migrate
```

* Start backend server:

```bash
python manage.py runserver
```

### 3️⃣ Frontend Setup (React)

```bash
cd frontend/conding_contest_app
npm install
npm run dev
```

The frontend will run on `http://localhost:3000` and backend on `http://localhost:8000`.

---

## 🤝 How to Contribute

We ❤️ contributions! Follow these steps to get started:

### Step 1: Fork the repository

Click the **Fork** button on the top right of the GitHub repo page.

### Step 2: Clone your fork

```bash
git clone https://github.com/<your-username>/<repo-name>.git
```

### Step 3: Create a new branch

```bash
git checkout -b feature/your-feature-name
```

### Step 4: Make your changes

* Add code, fix bugs, or improve docs.

### Step 5: Commit your changes

```bash
git add .
git commit -m "Add: description of changes"
```

### Step 6: Push changes

```bash
git push origin feature/your-feature-name
```

### Step 7: Create a Pull Request (PR)

Go to your forked repo on GitHub and click **New Pull Request**.

---

## 📜 Contribution Guidelines

* Follow **PEP8** for Python code & standard ESLint rules for React.
* Keep commits **atomic and descriptive**.
* Update documentation if you change functionality.
* Write meaningful commit messages.

---

## 🗺️ Project Roadmap

### Phase 1 — MVP

* [x] User authentication
* [x] Contest hosting
* [ ] Participant dashboard
* [ ] Profile pages

### Phase 2 — Enhancements

* [ ] Real-time leaderboard
* [ ] Problem library
* [ ] AI cheating prevention

### Phase 3 — Launch & Growth

* [ ] Public release
* [ ] User feedback integration
* [ ] Premium features

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 👩‍💻 Authors

* **Narayan Jat** — [GitHub](https://github.com/narayan-jat)
* **Shravan Ram** — [GitHub](https://github.com/shravanbishnoi)
* **Pankaj Yadav** — [GitHub](https://github.com/panakajyadav8523)
