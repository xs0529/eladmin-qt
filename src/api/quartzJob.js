import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/quartzJob',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/quartzJob/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/quartzJob',
    method: 'put',
    data
  })
}
