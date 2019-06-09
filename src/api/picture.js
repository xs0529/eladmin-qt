import request from '@/utils/request'

export function del(id) {
  return request({
    url: 'api/file/' + id,
    method: 'delete'
  })
}

export function delAll(ids) {
  return request({
    url: 'api/file/',
    method: 'delete',
    data: ids
  })
}
