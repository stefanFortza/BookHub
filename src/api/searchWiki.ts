import axios from "axios";

export default async function SearchWiki(key: string): Promise<string | null> {
  var url = "https://en.wikipedia.org/w/api.php";

  const params = {
    action: "opensearch",
    search: key,
    limit: "1",
    namespace: "0",
    format: "json",
  };

  url = url + "?origin=*";
  (Object.keys(params) as (keyof typeof params)[]).forEach(function (key) {
    url += "&" + key + "=" + params[key];
  });
  url += "";
  // console.log(url);

  const response = await fetch(url);
  const data = await response.json();

  // console.log(data);
  let url2 = `https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&prop=extracts&exintro&explaintext&titles=${data[1][0]}`;

  const { data: data2 } = await axios.get(url2);

  console.log(data2);

  const description =
    data2.query.pages[Object.keys(data2.query.pages)[0]].extract;
  // console.log(data2.query.pages[Object.keys(data2.query.pages)[0]].extract);

  if (description !== "Undefined may refer to:\n\n") return description;

  return null;
}
