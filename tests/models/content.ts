import Model from '../../src/models/content';

afterEach(() => {
  jest.clearAllMocks();
});

jest.mock('../../src/models/content');
describe('Content Model', () => {
  const newModel = {
    title: 'Sample Title',
    theme: '12f12f',
    category: '2234g234g',
    user: 'Sample User',
    type: 'text',
    createdAt: new Date(),
  };

  it('crear', async () => {
    (Model.create as jest.Mock).mockResolvedValue(newModel);

    const createdContent = await Model.create(newModel);
    expect(Model.create).toHaveBeenCalledWith(newModel);
    expect(createdContent).toEqual(newModel);
  });

});
