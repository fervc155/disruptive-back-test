import Model from '../../src/models/category';

afterEach(() => {
  jest.clearAllMocks();
});

jest.mock('../../src/models/category');
describe('Category Model', () => {
  const newModel = {
    name:'nueva'
  };

  it('crear', async () => {
    (Model.create as jest.Mock).mockResolvedValue(newModel);

    const createdContent = await Model.create(newModel);
    expect(Model.create).toHaveBeenCalledWith(newModel);
    expect(createdContent).toEqual(newModel);
  });

});
