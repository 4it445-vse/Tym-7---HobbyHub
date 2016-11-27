import api from '../../api.js';

export function fetchMappedTags() {
  console.log('log1');
  api('tags')
    .then((response) => {
      console.log('log2', response.data);
      var mappedTags = mapTags(response.data);
      console.log('mappedTags', mappedTags);
      return mappedTags;

    });
}

function mapTags(tags) {
  return tags.map(function(tag) {
    return {value:1, label:"one"};
    console.log(tag);
  })
}

/*

api('tags')
  .then((response) => {
    return response.data.map(function(tag) {
      return {value:1, label:"one"};
    })
  })
*/
