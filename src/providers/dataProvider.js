import { fetchUtils } from "react-admin";
import { stringify } from "query-string";

/*
 * @example
 *
 * getList     => GET http://my.api.url/posts?sort=['title','ASC']&range=[0, 24]
 * getOne      => GET http://my.api.url/posts/123
 * getMany     => GET http://my.api.url/posts?filter={id:[123,456,789]}
 * update      => PUT http://my.api.url/posts/123
 * create      => POST http://my.api.url/posts
 * delete      => DELETE http://my.api.url/posts/123
 */

//let apiUrl = process.env.REACT_APP_API_URL;
let apiUrl = "http://localhost:3001/api";


const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }

  const token = sessionStorage.getItem("auth");
  if (token) {
    options.headers.set("Authorization", `${token}`);
  }

  return fetchUtils.fetchJson(url, options);
};

const dataProvider =  {
  getList: (resource, params) => {
    const { field, order } = params.sort;
    const sort = JSON.stringify([field, order]);
    const paginate = JSON.stringify(params.pagination);
    const filter = JSON.stringify(params.filter);
    let query = `sort=${sort}&paginate=${paginate}`;
    if (filter !== "{}") query = query + `&filter=${filter}`;
    const url = `${apiUrl}/${resource}?${query}`;

    return httpClient(url).then(({ json }) => ({
      data: json,
      total: 100,
    }));
  },

  getOne: (resource, params) => {
    if (resource === "profile") {
      const userInfo = JSON.parse(sessionStorage.getItem("USER_INFO"));
      return httpClient(`${apiUrl}/users/${userInfo.id}`).then(({ json }) => ({
        data: json,
      }));
    }
    return httpClient(`${apiUrl}/${resource}/${params.id}`).then(
      ({ json }) => ({
        data: json,
      })
    );
  },

  getMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({
        id: params.ids,
        code: params.codes,
      }),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    return httpClient(url).then(({ json }) => ({ data: json }));
  },

  getManyByQueryParams: (resource, params) => {
    const query = {
      filter: JSON.stringify(params.filter),
      paginate: JSON.stringify(params.paginate),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    return httpClient(url).then(({ json }) => ({ data: json.records }));
  },

  getManyReference: (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify({
        ...params.filter,
        [params.target]: params.id,
      }),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;

    return httpClient(url).then(({ headers, json }) => ({
      data: json.records,
      total: json.total,
    }));
  },

  update: (resource, params) => {
    let hasImage = false;
    let newImages = [];
    Object.keys(params.data).forEach((key) => {
      if (params.data[key] && params.data[key].rawFile instanceof File) {
        hasImage = true;
        newImages.push([key, params.data[key]]);
      }
    });
    if (hasImage) {
      return Promise.all(newImages.map(convertImageToBase64)).then((images) => {
        images.map((image) => {
          params.data[image[0]] = image[1];
        });

        return httpClient(`${apiUrl}/${resource}/${params.id}`, {
          method: "PUT",
          body: JSON.stringify(params.data),
        }).then(({ json }) => ({
          data: { ...params.data, id: json.id },
        }));
      });
    }
    return httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "PUT",
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: json }));
  },

  updateMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
      method: "PUT",
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: json.records }));
  },

  create: (resource, params) => {
    let hasImage = false;
    let newImages = [];
    Object.keys(params.data).forEach((key) => {
      if (params.data[key] && params.data[key].rawFile instanceof File) {
        hasImage = true;
        newImages.push([key, params.data[key]]);
      }
    });
    if (hasImage) {
      return Promise.all(newImages.map(convertImageToBase64)).then((images) => {
        images.map((image) => {
          params.data[image[0]] = image[1];
        });

        return httpClient(`${apiUrl}/${resource}`, {
          method: "POST",
          body: JSON.stringify(params.data),
        }).then(({ json }) => ({
          data: { ...params.data, id: json.id },
        }));
      });
    }

    return httpClient(`${apiUrl}/${resource}`, {
      method: "POST",
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({
      data: { ...params.data, id: json.id },
    }));
  },

  delete: (resource, params) => {
    return httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "DELETE",
    }).then(({ json }) => ({ data: json }));
  },

  deleteMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
      method: "DELETE",
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: json.records }));
  },

  getDashboard: (resource, params) => {
    const filter = JSON.stringify(params.filter);
    let query = "";
    if (filter !== "{}") query = query + `&filter=${filter}`;
    const url = `${apiUrl}/${resource}?${query}`;

    return httpClient(url).then(({ json }) => ({
      data: json.data,
    }));
  },

  getDataForOptimized:(resource, params) => {
    return httpClient(`${apiUrl}/${resource}?waybills=${JSON.stringify(params.waybills)}`, {
      method: 'GET',
    }).then(({ json }) => ({
      data: json,
    }));
  },

  getOptimized: (resource, params) => {
    return httpClient(`${apiUrl}/${resource}`, {
      method: "POST",
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({
      data: json.routes,
    }));
  },

  saveOptimized: (resource, params) => {
    return httpClient(`${apiUrl}/${resource}`, {
      method: "POST",
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({
      data: { json },
    }));
  },
};

const convertImageToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve([file[0], reader.result]);
    reader.onerror = reject;
    reader.readAsDataURL(file[1].rawFile);
  });

export default dataProvider;