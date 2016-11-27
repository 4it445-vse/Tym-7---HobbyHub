import api from '../../api.js';

export class TagHelper {
  constructor() {
      this.fetchMappedTags = this.fetchMappedTags.bind(this);
  }

  fetchMappedTags() {
    var tags = this.fetchTags();
    return [];
    tags.map(function(tag) {
      console.log(tag);
    })
  }

  fetchTags() {
    api('tags')
      .then((response) => {
        return response.data;
        /*
        this.setState({tag_options: response.data});
        */
      });
  }
}

export default TagHelper;
