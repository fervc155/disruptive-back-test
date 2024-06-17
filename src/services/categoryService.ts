import Category from '../models/category';

export class CategoryService {
  
  public async getAll(): Promise<any[]> {
    return await Category.find();
  }

  public async getById(categoryData: any): Promise<any> {

    const { name, permissions } = categoryData;
    return await Category.findOne({ name });
   
  }

   public async create(categoryData: any, user: any): Promise<void> {
   

    const existing = await Category.findOne({ name: categoryData.name });

    if (existing) {
      throw new Error('Tematica ya registrada');
    }
  
    let categoryDto = {
      name:categoryData.name,
    }
    const newCategory = new Category(categoryDto);
    await newCategory.save();
  }

  public async delete(categoryId:string): Promise<void> {

    await Category.findByIdAndDelete(categoryId);
  }
}
