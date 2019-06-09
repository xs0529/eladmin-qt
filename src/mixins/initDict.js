import { get } from '@/api/dictDetail'

export default {
  data() {
    return {
      dicts: []
    }
  },
  methods: {
    async getDict(name) {
      return new Promise((resolve, reject) => {
        get(name).then(res => {
          this.dicts = res.content
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getDictS(name, data) {
      get(name).then(res => {
        data = res.content
      })
    }
  }
}
