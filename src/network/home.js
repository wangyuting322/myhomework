import {request} from './request.js'
export function getmenulist(){
  return request({
    url:'/menus',
    method:'get'
  })
}