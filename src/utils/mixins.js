import moment from 'moment'

export const fromNowFilter = {
  filters: {
    fromNow(datetime) {
      return datetime ? moment(datetime).fromNow() : '-'
    }
  },

  // 原版，上方是改良版
  // fromNow(datetime) {
  //   if (!datetime) {
  //     return '-'
  //   }
  //   else {
  //     // 使用 moment 提供的 fromNow 方法
  //     return moment(datetime).fromNow()
  //   }
  // }
}

export const emptyImageFilter = {
  filters: {
    emptyImage(src) {
      return src ? src : 'https://fakeimg.pl/350x220/DFDFDF/?text=No+Image'
    }
  }
}