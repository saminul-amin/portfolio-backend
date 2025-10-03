import { Request, Response } from "express";
import Blog from "./blog.model";
import { AuthRequest } from "../../middlewares/auth";

export const getAllBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await Blog.find({ published: true })
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: blogs.length,
      data: blogs,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

export const getBlogById = async (req: Request, res: Response) => {
  try {
    const blog = await Blog.findById(req.params.id).populate(
      "author",
      "name email"
    );

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.json({
      success: true,
      data: blog,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

export const getBlogBySlug = async (req: Request, res: Response) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug }).populate(
      "author",
      "name email"
    );

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.json({
      success: true,
      data: blog,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

export const createBlog = async (req: AuthRequest, res: Response) => {
  try {
    const { title, content, excerpt, coverImage, tags } = req.body;

    console.log(title, content);

    // Validation
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Please provide title and content",
      });
    }

    const blog = await Blog.create({
      title,
      content,
      excerpt,
      coverImage,
      tags,
      author: req.user._id,
      // slug: "", // Will be   auto-generated in pre-save hook
    });

    res.status(201).json({
      success: true,
      data: blog,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

export const updateBlog = async (req: AuthRequest, res: Response) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    // Check ownership
    if (
      blog.author.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this blog",
      });
    }

    const { title, content, excerpt, coverImage, tags, published } = req.body;

    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.excerpt = excerpt || blog.excerpt;
    blog.coverImage = coverImage || blog.coverImage;
    blog.tags = tags || blog.tags;
    blog.published = published !== undefined ? published : blog.published;

    await blog.save();

    res.json({
      success: true,
      data: blog,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

export const deleteBlog = async (req: AuthRequest, res: Response) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    // Check ownership
    if (
      blog.author.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this blog",
      });
    }

    await blog.deleteOne();

    res.json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};
