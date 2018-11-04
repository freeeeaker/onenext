import React, { PureComponent } from 'react'
import Article from '@component/Article'

export default class SimpleRequest extends PureComponent {
  static displayName = "HTTP CORS"
  render () {
    return (
      <Article title='HTTP CORS'>
        <h3>简单请求</h3>
        <p>某些请求不会触发 CORS 预检求情，我们称这样的请求是简单请求。满足以下条件</p>
        <p>使用下列方法之一</p>
        <ul>
          <li>GET</li>
          <li>HEAD</li>
          <li>POST</li>
        </ul>
        <p>Content-type 的值仅限于下列三者之一</p>
        <ul>
          <li>text/plain</li>
          <li>mulitpart-formdata</li>
          <li>application/x-www-form-urlencoded</li>
        </ul>
        <p>Fetch 规范定义了 对 CORS安全的首部字段集合。不得认为设置该集合之外的其他首部字段，该集合为</p>
        <ul>
          <li>Accept</li>
          <li>Accept-Language</li>
          <li>Content-Language</li>
          <li>DPR</li>
          <li>Downlink</li>
          <li>Save-data</li>
          <li>Viewport-width</li>
          <li>Width</li>
        </ul>
        <p>请求中的任意 XMLHttpRequestUpload 对象均没有注册任何事件监听器； XMLHttpRequestUpload 对象可以使用 XMLHttpRequest.upload 属性访问</p>
        <p>请求中没有使用 ReadableStream</p>
      </Article>
    )
  }
}