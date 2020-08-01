import { mapState } from 'vuex'
import Fuse from 'fuse.js'

const searchOptions = {
  includeScore: false,
  isCaseSensitive: false,
  threshold: 0,
  keys: [
    {
      name: 'country'
    }
  ]
}

export default {
  render () {
    return this.$scopedSlots.default({
      countries: this.filtered ? this.filtered : []
    })
  },
  computed: {
    ...mapState({
      countries: state => state.countries,
      searchText: state => state.searchText
    }),
    filtered () {
      if (!this.countries) return
      if (this.searchText === '') return this.countries
      const fuse = new Fuse(this.countries, searchOptions)
      return fuse.search(this.searchText).map(x => x.item)
    }
  }
}
