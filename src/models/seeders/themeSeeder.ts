import Theme from '../theme';
import bcrypt from 'bcryptjs';

const themesSeeder = async () => {
    try {
      
        const result = await Theme.find();


        if (!result.length) {

           const themes: any[] = [
              { name: "Blog", permissions: { images: true, videos: false, text: true } },
              { name: "Matemáticas", permissions: { images: false, videos: true, text: true } },
              { name: "Casas", permissions: { images: true, videos: true, text: false } },
              { name: "Herramientas", permissions: { images: true, videos: false, text: true } },
              { name: "Arte", permissions: { images: false, videos: true, text: false } },
              { name: "Ciencia", permissions: { images: true, videos: true, text: true } },
              { name: "Música", permissions: { images: true, videos: true, text: false } },
              { name: "Viajes", permissions: { images: false, videos: false, text: true } },
              { name: "Deportes", permissions: { images: true, videos: false, text: false } },
              { name: "Tecnología", permissions: { images: false, videos: true, text: true } },
              { name: "Educación", permissions: { images: true, videos: true, text: false } },
              { name: "Cocina", permissions: { images: true, videos: false, text: true } },
              { name: "Moda", permissions: { images: false, videos: true, text: false } },
              { name: "Animales", permissions: { images: true, videos: true, text: true } },
              { name: "Negocios", permissions: { images: true, videos: true, text: false } },
              { name: "Salud", permissions: { images: false, videos: false, text: true } },
              { name: "Historia", permissions: { images: true, videos: false, text: false } },
              { name: "Literatura", permissions: { images: false, videos: true, text: true } },
              { name: "Política", permissions: { images: true, videos: true, text: false } },
              { name: "Religión", permissions: { images: true, videos: false, text: true } }
            ];


            for(let cat of themes){
                const c = new Theme({
                    ...cat,
                    url:'uploads/tematica.jpeg'
                })
                await c.save()
            }
            console.log('tematicas creadas.');
        } else {
            console.log('tematicas ya existen.');
        }
    } catch (error) {
        console.error('Error creando tematicas:', error);
    }
};

export default themesSeeder;
