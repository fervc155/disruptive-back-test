import request from 'supertest';
import app from '../../src'; 
import mongoose from 'mongoose';
import {Reader, Admin, Creator} from '../../jwt';
import Content from '../../src/models/content'; 
import Theme from '../../src/models/theme'; 
import User from '../../src/models/user'; 
import Category from '../../src/models/category'; 
const fs = require('fs');
const path = require('path');



describe('ContentController', () => {
  beforeAll(async () => {
    await mongoose.connection.collection('contents').deleteMany({});

    const uploadsDir = path.join(__dirname, '..', 'uploads');

    fs.readdir(uploadsDir, (err:any, files:any) => {
      if (err) {
        console.error('Error al leer el directorio de subidas:', err);
        return;
      }

      files.forEach((file:any) => {
        const filePath = path.join(uploadsDir, file);
        fs.unlink(filePath, (err:any) => {
          if (err) {
            console.error('Error al eliminar el archivo:', err);
            return;
          }
          console.log('Archivo eliminado:', filePath);
        });
      });
    });
  });


  let url = '/api/contents'
 

  it('obtener todas  sin login', async () => {
      const response = await request(app).get(url).send();
      expect(response.status).toBe(200);
    })
 
  it('guardar   sin login', async () => {
      const response = await request(app).post(url).send();
      expect(response.status).toBe(401);
  })
 
   it('borrar  inexistente', async () => {
      const response = await request(app).post(url+'/1').send();
      expect(response.status).toBe(404);
  })


  it('crear contenido con usuario invalido', async () => {
    const response = await request(app).post(url)
     .set('Authorization', `Bearer ${Reader()}`)
     .send({name:'nueva'});
      expect(response.status).toBe(403);
  
  })
 

   it('crear contenido con creator attributos faltantes', async () => {

    const response = await request(app).post(url)
     .set('Authorization', `Bearer ${Creator()}`)
     .send({});
      expect(response.status).toBe(400);
        
   })

   it('crear sin id verdaderos con creator', async () => {

    let filePath = path.join(__dirname, '/../../uploads/videos.mp4');


    const response = await request(app)
      .post(url)
      .set('Authorization', `Bearer ${Creator()}`)
      .field('title','titulo')
      .field('theme', '1')
      .field('category', '1')
      .field('user','1')
      .field('type','videos')
      .attach('file', filePath)

      expect(response.status).toBe(400);
        
   })



 

   it('crear con creator', async () => {

 
    let filePath = path.join(__dirname, '/../../uploads/videos.mp4');


    const response = await request(app)
      .post(url)
      .set('Authorization', `Bearer ${Creator()}`)
      .field('title','titulo')
      .field('theme', '666fe26d2f97755de7e41fc0')
      .field('category', '666fe26d2f97755de7e41fc0')
      .field('user','666fe26d2f97755de7e41fc0')
      .field('type','videos')
      .attach('file', filePath)

       expect(response.status).toBe(201);
        
   })
 


   it('crear imagen con tipo video', async () => {

 
    let filePath = path.join(__dirname, '/../../uploads/images.webp');


    const response = await request(app)
      .post(url)
      .set('Authorization', `Bearer ${Creator()}`)
      .field('title','titulo')
      .field('theme', '666fe26d2f97755de7e41fc0')
      .field('category', '666fe26d2f97755de7e41fc0')
      .field('user','666fe26d2f97755de7e41fc0')
      .field('type','videos')
      .attach('file', filePath)

       expect(response.status).toBe(400);
        
   })
 


   it('crear video con tipo images', async () => {

 
    let filePath = path.join(__dirname, '/../../uploads/videos.mp4');


    const response = await request(app)
      .post(url)
      .set('Authorization', `Bearer ${Creator()}`)
      .field('title','titulo')
      .field('theme', '666fe26d2f97755de7e41fc0')
      .field('category', '666fe26d2f97755de7e41fc0')
      .field('user','666fe26d2f97755de7e41fc0')
      .field('type','images')
      .attach('file', filePath)

       expect(response.status).toBe(400);
        
   })
 


  it('requerir texto cuando sea tipo texto', async () => {

 
    let filePath = path.join(__dirname, '/../../uploads/videos.mp4');


    const response = await request(app)
      .post(url)
      .set('Authorization', `Bearer ${Creator()}`)
      .field('title','titulo')
      .field('theme', '666fe26d2f97755de7e41fc0')
      .field('category', '666fe26d2f97755de7e41fc0')
      .field('user','666fe26d2f97755de7e41fc0')
      .field('type','text')
      .attach('file', filePath)

       expect(response.status).toBe(400);
        
   })
 


  it('borrar con usuario invalido', async () => {

    const cont = await Content.findOne();

    const response = await request(app).delete(url+'/'+cont!._id)
     .set('Authorization', `Bearer ${Reader()}`)
     .send();
      expect(response.status).toBe(403); 
  })

  it('borrar con usuario valido', async () => {

    const cont = await Content.findOne();

    const response = await request(app).delete(url+'/'+cont!._id)
     .set('Authorization', `Bearer ${Admin()}`)
     .send();
      expect(response.status).toBe(200); 
  })


});
