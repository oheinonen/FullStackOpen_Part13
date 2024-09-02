const { Blog } = require('./models/blog.js');
const { sequelize } = require('./database.js');

async function listBlogs() {
  try {
    const blogs = await Blog.findAll();

    console.log('Blogs in the database:');
    blogs.forEach(blog => {
      console.log(`${blog.id}: ${blog.author} - ${blog.title}, ${blog.likes} likes`);
    });

    await sequelize.close();
  } catch (error) {
    console.error('Error listing blogs:', error);
    process.exit(1);
  }
}

listBlogs();
