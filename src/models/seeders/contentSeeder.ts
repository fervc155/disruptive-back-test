import User from '../user';
import Content from '../content';
import Theme from '../theme';
import bcrypt from 'bcryptjs';
import Category from '../category';

function getRandomItem(items:any) {
  const randomIndex = Math.floor(Math.random() * items.length);
  return items[randomIndex];
}
function getRandomType(theme:any) {
  const { text, images, videos } = theme.permissions;
  const availableTypes = [];

  if (text) availableTypes.push('text');
  if (images) availableTypes.push('images');
  if (videos) availableTypes.push('videos');

  if (availableTypes.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * availableTypes.length);
  return availableTypes[randomIndex];
}

function getRandomTitle() {
  const titles = [
    "El secreto del éxito",
    "Aventuras en la selva",
    "El arte de la persuasión",
    "Viaje al centro de la Tierra",
    "El misterio del faro",
    "La sonrisa de Mona Lisa",
    "Código oculto",
    "Destino desconocido",
    "El enigma del tiempo",
    "La última frontera"
  ];

  const randomIndex = Math.floor(Math.random() * titles.length);
  return titles[randomIndex];
}


function generateLoremIpsum() {
  return "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
}


const contentSeeder = async () => {
    try {
      
        
        const contents =  await Content.find();
        const creators = await User.find({ $or: [{ role: 'admin' }, { role: 'creator' }] });
        const categories = await Category.find();
        const themes = await Theme.find();



        if (!contents.length && creators.length && themes.length && categories.length) {



            for(let i =0 ; i<50; i++) {
                let theme = getRandomItem(themes);
                let user = getRandomItem(creators);
                let type = getRandomType(theme);
                let category = getRandomItem(categories);
                let url=null;
                let text=null;
                if(type == 'text'){
                    text = generateLoremIpsum()
                }else if(type=='videos') {
                    url ='uploads/videos.mp4';
                }else if (type=='images') {
                    url ='uploads/images.webp';
                } else {
                    throw new Error('type invalido')
                }


                await (new Content({
                    title:getRandomTitle(),
                    user:user._id,
                    type,
                    text,
                    url,
                    category:category._id,
                    theme:theme._id,
                })).save()


            }

           


            console.log('contenidos creados.');
        } else {
            console.log('contenidos ya existen.');
        }
    } catch (error) {
        console.error('Error creando contenidos:', error);
    }
};

export default contentSeeder;
