import React, { PureComponent } from 'react'
import Article from '@component/Article'

export default class UpdateOnAsyncRendering extends PureComponent {
  static displayName = "HTTP 缓存"
  render () {
    return (
      <Article title='HTTP 缓存'>
        <p>缓存分为强制缓存与协商缓存</p>
        <h3>强制缓存</h3>
        <p>第一次访问时 浏览器时 服务器设置 过期时间，不超出过期时间不会发起请求， 直接读缓存</p>
        <p>http 1.0 通过设置 Expires 来控制</p>
        <p>http 1.1 通过响应投 <code>Cache-control</code> 来控制。可能的值有：</p>
        <ul>
          <li>private: 客户端可以缓存</li>
          <li>public: 客户端和代理服务器均可缓存</li>
          <li>max-age=xxx: 缓存的资源将在 xxx 秒后过期</li>
          <li>no-cache: 需要使用协商缓存来验证是否过期</li>
          <li>no-store: 不可缓存</li>
        </ul>
        <p>http 1.1 的优先级 大于 http 1.0</p>
        <h3>协商缓存</h3>
        <p>协商缓存每次都会和服务器通信，并且会增加缓存标识。通过比对标识，来确定是否读取缓存</p>
        <p>在 http 1.0 中， 第一次资源时 服务器通过 <code>Last-Modified</code> 来设置响应头的缓存标识，并把资源最后修改时间作为值填入。而客户端会 设置 <code>If-Modified-Since</code>， 携带上次返回的资源修改时间。服务器与服务器的资源修改时间进行并对，不一致则更新，否则读取缓存，返回状态码 304</p>
        <p>缺点在于 假如文件改动多次，但实际上内容并未真正更改，也会导致缓存读取失败</p>
        <p>http 1.1 第一次方位 ，服务器通过 Etag 来设置来标识资源， 客户端第二次访问 会设置 <code>If-None-Match</code>带上上次的 Etag。服务器进行比对，不一致则更新泽园。</p>
      </Article>
    )
  }
}