const handleSuccess = require('../service/handleSuccess');
const handleError = require('../service/handleError');
const Post = require('../model/post');

const posts = {
  async getPosts(req, res) {
    const allPosts = await Post.find();
    handleSuccess(res, allPosts);
  },
  async createdPosts(req, res) {
    try {
      const { body } = req;

      if (body.content !== undefined) {
        const newPost = await Post.create(
          {
            name: body.name,
            content: body.content,
            tags: body.tags,
            type: body.type
          }
        );
        handleSuccess(res, newPost);
      } else {
        handleError(res);
      }
    } catch(error) {
      handleError(res, error);
    }
  },
  async deletePost(req, res ) {
    const posts = await Post.deleteMany({});
    handleSuccess(res, posts);
  },
  async deleteOnePost(req, res) {
    try {
      const id = req.params.id;
      await Post.findByIdAndDelete(id);
      const posts = await Post.find();
      handleSuccess(res, posts);
    } catch(error) {
      handleError(res, error);
    }
  },
  async updatePost(req, res) {
    try {
      const id = req.params.id;
      const { body } = req;
      if (body.content !== '') {
        await Post.findByIdAndUpdate(id, body);
        const posts = await Post.find();
        handleSuccess(res, posts);
      } else {
        handleError(res);
      }
    } catch(error) {
      handleError(res, error);
    }
  }
}

module.exports = posts;