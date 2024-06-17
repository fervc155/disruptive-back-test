import Model from '../../src/models/user';
import bcrypt from 'bcryptjs';

afterEach(() => {
  jest.clearAllMocks();
});

jest.mock('../../src/models/user');
describe('User Model',  () => {


  it('crear', async () => {

    const newModel = {
      username: 'admin',
      email: 'admin@admin.com',
      password:  await bcrypt.hash('root1234', 12),
      role:'admin'
    };
    
    (Model.create as jest.Mock).mockResolvedValue(newModel);

    const createdContent = await Model.create(newModel);
    expect(Model.create).toHaveBeenCalledWith(newModel);
    expect(createdContent).toEqual(newModel);
  });

});
