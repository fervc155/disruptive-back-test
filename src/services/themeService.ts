import Theme from '../models/theme';
import * as fs from 'fs';

export class ThemeService {
  
  public async getAll(): Promise<any[]> {
    return await Theme.find();
  }

  public async getById(id: any): Promise<any> {

    return await Theme.findById(id);
   
  }


  public async search({ s = ''}: any): Promise<any> {
    let query: any = { };

    if (s && s.trim() !== '') {
      query.name = new RegExp(s, 'i');
    }

  

    return await Theme.find(query);
  }


   public async create(themesData: any, user: any): Promise<void> {
   

    const existing = await Theme.findOne({ name: themesData.name });

      if (existing) {
        throw new Error('Tematica ya registrada');
      }
    


    let themesDto = {
      name:themesData.name,
      url:themesData.url,
      permissions:{
        text:themesData.text,
        videos:themesData.videos,
        images:themesData.images,

      }
    }
    const newTheme = new Theme(themesDto);
    await newTheme.save();
  }


  public async update(themesId: string, themesData: any,user:any): Promise<void> {

    const { name, permissions } = themesData;
    const themes = await Theme.findById(themesId);
    if (!themes) {
      throw new Error('Categoría no encontrada');
    }

    themes.name = name || themes.name;
    themes.permissions = permissions || themes.permissions;
    await themes.save();
  }

  public async delete(themesId:string): Promise<void> {

    let theme = await Theme.findById(themesId)
    if(theme?.url){
      if(!theme.url.includes('tematica')){
        fs.unlink(theme.url, (err) => {
          if (err) {
            console.error(`Error al eliminar el archivo: ${err.message}`);
          }
        });
      }
    }
    await Theme.findByIdAndDelete(themesId);
  }
}
