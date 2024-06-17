import Content from '../models/content';
import * as fs from 'fs';

export class ContentService {

  public async getAll(): Promise<any[]> {
    return await Content.find()
      .sort({ createdAt: -1 }) 
      .populate('theme')
      .populate('category')
      .populate({ path: 'user', select: '-password' });
  }

  public async getById(contentId: string): Promise<any> {
    return await Content.findById(contentId)
      .populate('theme')
      .populate('category')
      .populate({ path: 'user', select: '-password' })
      .exec();
  }

  public async mine({ userId }: any): Promise<any> {
    return await Content.find({ user: userId })
      .sort({ createdAt: -1 }) 
      .populate('theme')
      .populate('category')
      .populate({ path: 'user', select: '-password' })
      .exec();
  }

  public async search({ s = '', theme = null }: any): Promise<any> {
    let query: any = { };

    if (s && s.trim() !== '') {
      query.title = new RegExp(s, 'i'); 
    }

    if (theme !== null) {
      query.theme = theme;
    }

    return await Content.find(query)
      .sort({ createdAt: -1 }) 
      .populate('theme')
      .populate('category')
      .populate({ path: 'user', select: '-password' })
      .exec();
  }

  public async create(contentData: any, user: any): Promise<any> {
    const newContent = new Content({
      ...contentData,
      user: user.userId
    });
    await newContent.save();
    return newContent;
  }

  public async update(contentId: string, contentData: any, user: any): Promise<any> {
    const content = await Content.findById(contentId);
    if (!content) {
      throw new Error('Contenido no encontrado');
    }

    const { title, theme, type, url, text } = contentData;
    content.title = title || content.title;
    content.theme = theme || content.theme;
    content.type = type || content.type;
    content.url = url || content.url;
    content.text = text || content.text;
    await content.save();
    return content;
  }

  public async delete(contentId: string): Promise<void> {
    let content = await Content.findById(contentId);
    if (content?.url) {
      if (!content.url.includes('videos') && !content.url.includes('images')) {
        fs.unlink(content.url, (err) => {
          if (err) {
            console.error(`Error al eliminar el archivo: ${err.message}`);
          }
        });
      }
    }

    await Content.findByIdAndDelete(contentId);
  }
}
