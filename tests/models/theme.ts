import Model from '../../src/models/theme';

afterEach(() => {
  jest.clearAllMocks();
});

jest.mock('../../src/models/theme');
describe('Theme Model', () => {
  const newModel = { 
    name: "Blog", 
    permissions: { images: true, videos: false, text: true } 
  };

  it('crear', async () => {
    (Model.create as jest.Mock).mockResolvedValue(newModel);

    const createdContent = await Model.create(newModel);
    expect(Model.create).toHaveBeenCalledWith(newModel);
    expect(createdContent).toEqual(newModel);
  });

});
