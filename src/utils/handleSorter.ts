import { IListPost } from "../domain/interface/IListPost";

// // convert date DD-MM-YYYY to data unix type 587238470281934
// function dateToUnix(data: PostData[]): PostData[] {
//   data.forEach((e) => {
//     let date: string[] = e.createdAt.split("-");
//     let dateUnix = new Date(
//       parseInt(date[2]),
//       parseInt(date[1]),
//       parseInt(date[0])
//     ).getTime();
//     e.createdAt = `${dateUnix}`;
//   });
//   return data;
// }

export function filterByLanguage(
  language: string,
  data: IListPost[]
): IListPost[] {
  const availableLanguages: string[] = ["es", "en"];
  if (!availableLanguages.includes(language)) return data;
  if (language === "es") {
    data = data.filter((e) => e.language === "es");
  }
  if (language === "en") {
    data = data.filter((e) => e.language === "en");
  }
  return data;
}

export function filterByIsPublic(
  isPublic: string,
  data: IListPost[]
): IListPost[] {
  if (isPublic === "true") {
    data = data.filter((e) => e.is_public === true);
  }
  if (isPublic === "false") {
    data = data.filter((e) => e.is_public === false);
  }
  return data;
}

// export function findBySlug(slug: string, data: PostData[]): PostData[]{
//   data = data.filter((e) => e.slug === slug)
//   return data;
// }

export function sortByElement(sort: string, data: IListPost[]): IListPost[] {
  const availableSorts: string[] = [
    "date",
    "date,desc",
    // "id,desc",
    // "id",
    // "id,desc",
    // "title",
    // "title,desc",
    // "category",
    // "category,desc",
    // "author",
    // "author,desc",
  ];

  // default sort by id
  //   data = data.sort((a, b) => {
  //     if (a.id < b.id) return -1;
  //     if (a.id > b.id) return 1;
  //     return 0;
  //   });

  if (!availableSorts.includes(sort)) return data;

  const sortedData = data.sort((a, b) => {
    const dateA = new Date(`${a.date}`.split("-").reverse().join("-"));
    const dateB = new Date(`${b.date}`.split("-").reverse().join("-"));
    return dateB.getTime() - dateA.getTime();
  });

  if (sort === "date,desc") {
    // data = data.sort((a, b) => {
    //   if (a.createdAt > b.createdAt) return -1;
    //   if (a.createdAt < b.createdAt) return 1;
    //   return 0;
    // });
    data = data.sort((a, b) => {
      const dateA = new Date(`${a.date}`.split("-").reverse().join("-"));
      const dateB = new Date(`${b.date}`.split("-").reverse().join("-"));
      return dateB.getTime() - dateA.getTime();
    });
  }
  if (sort === "date") {
    // data = data.sort((a, b) => {
    //   if (a.createdAt < b.createdAt) return -1;
    //   if (a.createdAt > b.createdAt) return 1;
    //   return 0;
    // });
    data = data.sort((a, b) => {
      const dateA = new Date(`${a.date}`.split("-").reverse().join("-"));
      const dateB = new Date(`${b.date}`.split("-").reverse().join("-"));

      return dateA.getTime() - dateB.getTime();
    });
  }
  //   if (sort === "id,desc") {
  //     data = data.sort((a, b) => {
  //       if (a.id > b.id) return -1;
  //       if (a.id < b.id) return 1;
  //       return 0;
  //     });
  //   }
  //   if (sort === "id") {
  //     data = data.sort((a, b) => {
  //       if (a.id < b.id) return -1;
  //       if (a.id > b.id) return 1;
  //       return 0;
  //     });
  //   }
  //   if (sort === "title,desc") {
  //     data = data.sort((a, b) => {
  //       if (a.title > b.title) return -1;
  //       if (a.title < b.title) return 1;
  //       return 0;
  //     });
  //   }
  //   if (sort === "title") {
  //     data = data.sort((a, b) => {
  //       if (a.title < b.title) return -1;
  //       if (a.title > b.title) return 1;
  //       return 0;
  //     });
  //   }
  return data;
}
