import { Request, Response } from "express";
import { Blog } from "../models/Blog";
export const getBlogs = async (req: Request, res: Response): Promise<void> => {
  try {
    const blogs = await Blog.find().sort({ date: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching blogs",
      error: (error as Error).message,
    });
  }
};
export const getBlogById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      res.status(404).json({ message: "Blog/Event not found" });
      return;
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching blog",
      error: (error as Error).message,
    });
  }
};
export const createBlog = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { title, content, author, tags, date } = req.body;
    let image = "";
    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    } else {
      res.status(400).json({ message: "Blog image is required" });
      return;
    }
    const parsedTags: string[] | undefined =
      typeof tags === "string"
        ? (() => {
            try {
              const parsed = JSON.parse(tags);
              return Array.isArray(parsed)
                ? parsed.map((t: string) => t.trim())
                : [tags.trim()];
            } catch {
              return tags.split(",").map((t: string) => t.trim());
            }
          })()
        : tags;
    const blog = await Blog.create({
      title,
      content,
      image,
      author,
      tags: parsedTags,
      date: date ? new Date(date) : new Date(),
    });
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({
      message: "Error creating blog",
      error: (error as Error).message,
    });
  }
};
export const updateBlog = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { title, content, author, tags, date } = req.body;
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      res.status(404).json({ message: "Blog/Event not found" });
      return;
    }
    let image = blog.image;
    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    }
    const parsedTags: string[] | undefined =
      typeof tags === "string"
        ? (() => {
            try {
              const parsed = JSON.parse(tags);
              return Array.isArray(parsed)
                ? parsed.map((t: string) => t.trim())
                : [tags.trim()];
            } catch {
              return tags.split(",").map((t: string) => t.trim());
            }
          })()
        : tags;
    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.author = author || blog.author;
    blog.tags = parsedTags !== undefined ? parsedTags : blog.tags;
    blog.date = date ? new Date(date) : blog.date;
    blog.image = image;
    await blog.save();
    res.json(blog);
  } catch (error) {
    res.status(500).json({
      message: "Error updating blog",
      error: (error as Error).message,
    });
  }
};
export const deleteBlog = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      res.status(404).json({ message: "Blog/Event not found" });
      return;
    }
    res.json({ message: "Blog/Event deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting blog",
      error: (error as Error).message,
    });
  }
};
