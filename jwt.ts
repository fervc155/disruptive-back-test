import jwt from 'jsonwebtoken';



export const Reader = ()=>{
	return jwt.sign(
      {
        userId: '1234',
        username: 'reader',
        email: 'reader@reader.com',
        role: 'reader',
      },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '24h' }
    );
}

 


export const Creator = ()=>{
	return jwt.sign(
      {
        userId: '1234',
        username: 'reader',
        email: 'reader@reader.com',
        role: 'creator',
      },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '24h' }
    );
}

 


export const Admin = ()=>{
	return jwt.sign(
      {
        userId: '1234',
        username: 'reader',
        email: 'reader@reader.com',
        role: 'admin',
      },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '24h' }
    );
}

 