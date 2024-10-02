# Blogs App (Next.js)

![Project Image](https://res.cloudinary.com/dgljsrfmk/image/upload/v1727892746/kk3ljasx18tzqfpkdr9t.png)

**Note:** This project was developed approximately 12 days ago from now but is being pushed to GitHub now.

A comprehensive blogging platform built using Next.js, providing rich text content support, user authentication, and role-based access control.

## Technologies Used

- **Frontend:** Next.js, React, Tailwind CSS
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** NextAuth.js with Two-Factor Authentication (2FA)
- **Image Storage:** Cloudinary
- **Form Validation:** Zod

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **User Authentication with 2FA:** Secure authentication using NextAuth.js with optional two-factor authentication for added security.
- **Role-Based Access Control (RBAC):** Different user roles (Admin, User, Author) with specific permissions, including content creation and management.
- **Blog Management:** Create, edit, and delete blog posts with rich text content, including images and embedded media.
- **Commenting System:** Users can comment on blog posts with likes, and authors can manage comments.
- **Ratings System:** Blog posts can be rated by users, allowing for a rating-based feedback system.
- **Responsive Design:** Fully responsive design optimized for all device sizes.
- **Image Management:** Integration with Cloudinary for seamless image upload, storage, and optimization.
- **Content Filtering and Moderation:** Admins can moderate content, ensuring quality and relevance.
- **Search and Categorization:** Search functionality and category-based filtering for easier navigation of content.

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/abdulrehman-code/Blogs-App-NEXT-JS-.git
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   - Create a `.env` file in the root directory and populate it with the required variables as shown below.

4. **Run the development server:**

   ```bash
   npm run dev
   ```

## Usage

- Visit `http://localhost:3000` to access the application.
- Register or log in to start creating and managing blog posts.
- Use the rich text editor to add images, write content, and interact with other users' posts.

## Environment Variables

Create a `.env` file in the root directory and include the following variables:

```plaintext
BASE_URL="http://localhost:3000"
DATABASE_URL="your_database_url_value"
AUTH_SECRET="your_auth_secret_value"
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"
GITHUB_CLIENT_ID="your_github_client_id"
GITHUB_CLIENT_SECRET="your_github_client_secret"
RESEND_API_KEY="your_resend_api_key"
CLOUDINARY_CLOUD_NAME="your_cloudinary_cloud_name"
CLOUDINARY_API_KEY="your_cloudinary_api_key"
CLOUDINARY_API_SECRET="your_cloudinary_api_secret"
```

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue if you encounter any bugs or have suggestions for improvements.

## License

This project is licensed under the MIT License.

## Contact

For any questions or issues, feel free to contact [Abdul Rehman](mailto:abdulrehman.code1@gmail.com).
