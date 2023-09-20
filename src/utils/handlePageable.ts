import { IListPost } from "../domain/interface/IListPost";

export interface Page {
  page: object;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: object;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
  image: object;
}

const BACKEND_URL = "https://image.png";

export function pageUtil(
  data: IListPost[],
  page: number,
  size: string,
  sort: string
) {
  const limit: number = size ? +size : 10;
  const offset: number = page ? page * limit : 0;

  let content: IListPost[] = data.slice(offset, offset + limit);

  const pageDefinition: Page = {
    page: {
      sort: {
        empty: sort ? false : true,
        sorted: sort ? true : false,
        unsorted: sort ? false : true,
      },
      offset: offset,
      pageSize: page ? +page : 0,
      pageNumber: page ? +page : 0,
      paged: true,
      unpaged: false,
    },
    last: true,
    totalElements: data.length,
    totalPages: Math.ceil(data.length / limit),
    size: limit,
    number: page ? +page : 0,
    sort: {
      empty: true,
      sorted: false,
      unsorted: true,
    },
    numberOfElements: data.length,
    first: true,
    empty: false,
    image: {
      url: `${BACKEND_URL}/images`,
      options: ["webp/", "gift/"],
    },
  };
  return { content, pageDefinition };
}
