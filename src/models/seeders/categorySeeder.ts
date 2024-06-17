import User from '../user';
import Category from '../category';
import Theme from '../theme';
import bcrypt from 'bcryptjs';



const CategorySeeder = async () => {
    try {
      
        
        const categories =  await Category.find();
        


        if (!categories.length ) {


                let cats = [
                    'Imagen',
                    'Videos',
                    'Textos',
                ]


                for(let name of cats) {

                
                await (new Category({
                    name
                })).save()

            }
           

            console.log('categorias creados.');
        } else {
            console.log('categorias ya existen.');
        }
    } catch (error) {
        console.error('Error creando categorias:', error);
    }
}

export default CategorySeeder;
