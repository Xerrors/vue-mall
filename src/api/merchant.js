import request from '@/utils/request'

// 200001 注册商户
export function settleIn (form) {
  var urlencoded = new URLSearchParams()
  urlencoded.append('serviceId', '200001')
  urlencoded.append('shop_name', form.shop_name)
  urlencoded.append('passwd', form.passwd)
  urlencoded.append('contact_person', form.contact_person)
  urlencoded.append('tel', form.tel)
  urlencoded.append('juri_person', form.juri_person)
  urlencoded.append('juri_person_id', form.juri_person_id)
  urlencoded.append('pay_way', form.pay_way)
  return request({
    url: '/api',
    method: 'post',
    data: urlencoded
  })
}

// 200010 修改电话，联系人，支付方式
export function changeMerchantInfo (form) {
  var urlencoded = new URLSearchParams()
  urlencoded.append('serviceId', '200010')
  urlencoded.append('tel', form.tel)
  urlencoded.append('pay_way', form.pay_way)
  urlencoded.append('contact_person', form.contact_person)
  return request({
    url: '/api',
    method: 'post',
    data: urlencoded
  })
}
