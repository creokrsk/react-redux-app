import httpService from './http.service';

const todosEndpoint = 'todos/';

const todosService = {
  fetch: async () => {
    const { data } = await httpService.get(todosEndpoint, {
      params: {
        _page: 1,
        _limit: 15,
      },
    });
    return data;
  },
  addTask: async (payload) => {
    const { data } = await httpService.post(todosEndpoint, payload);
    return data;
  },
};

export default todosService;
